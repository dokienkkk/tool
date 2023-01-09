declare const Buffer;
import type {MutableRefObject} from 'react';
import React from 'react';
import type {BleError, Device} from 'react-native-ble-plx';
import {globalState} from 'src/app/global-state';
import {TIME_OUT, UNIVERSE_ADDRESS} from 'src/config/set-address';
import {
  convertAddressToArray,
  convertResponse,
} from 'src/helpers/string-helper';
import {showError, showSuccess, showWarning} from 'src/helpers/toast-helper';
import type {DeviceType} from 'src/types/device';
import {STATUS} from 'src/types/status';
import {addressService} from '../address-service';
import base64 from 'react-native-base64';
import type {BluetoothSevice} from '.';
import type {SubscriptionLike} from 'rxjs';
import {elementOfDevice} from 'src/config/device';

export function useBluetoothControl(
  this: BluetoothSevice,
): [
  boolean,
  () => Promise<boolean>,
  string,
  (order: string) => void,
  string,
  (type: 'increase' | 'decrease') => void,
  (address: string) => void,
  DeviceType,
  (type: DeviceType) => void,
] {
  const [connectedDevice] = globalState.useConnectedDevice();

  const [universe] = globalState.useUniverse();

  const [writeable] = globalState.useWriteable();

  const [listAddress] = globalState.useAddress();

  const [, createNewAddress] = addressService.useAddress(universe);

  const [loading, setLoading] = React.useState(false);

  const [order, setOrder] = React.useState('01');

  const [address, setAddress] = React.useState('01');

  const [typeDevice, setTypeDevice] = React.useState(0);

  const subscriptionRef: MutableRefObject<SubscriptionLike> =
    React.useRef<SubscriptionLike>();

  React.useEffect(() => {
    const subscribe = connectedDevice?.onDisconnected(
      async (error: BleError, device: Device) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('Error when subscrible onDisconnected: ', error);
        }
        if (device && device.id === connectedDevice?.id) {
          await globalState.setBluetoothStatus(STATUS.DISCONNECTED);
        }
      },
    );
    return function cleanup() {
      subscribe?.remove();
    };
  }, [connectedDevice]);

  const handleChangeOrder = React.useCallback((newOrder: string) => {
    setOrder(newOrder);
  }, []);

  const handleChangeInputAddress = React.useCallback((newAddress: string) => {
    setAddress(newAddress);
  }, []);

  const handleChangeDevice = React.useCallback((type: DeviceType) => {
    setTypeDevice(type);
  }, []);

  const changeAddress = React.useCallback(
    (type: 'increase' | 'decrease') => {
      let numAddress = Number(address);

      if (isNaN(numAddress)) {
        return;
      }

      if (type === 'increase') {
        numAddress++;

        if (numAddress > UNIVERSE_ADDRESS.MAX) {
          showWarning(`Có tối đa ${UNIVERSE_ADDRESS.MAX} địa chỉ`);
          return;
        }

        setAddress(numAddress.toString());
      } else if (type === 'decrease') {
        numAddress--;

        if (numAddress === UNIVERSE_ADDRESS.MIN) {
          return;
        }

        setAddress(numAddress.toString());
      }
    },
    [address, setAddress],
  );

  const increaseOrder = React.useCallback(() => {
    if (Number(order) < 512) {
      setOrder((Number(order) + 1).toString());
    }
  }, [order]);

  const increaseAddress = React.useCallback(() => {
    setAddress((Number(address) + elementOfDevice(typeDevice)).toString());
  }, [address, typeDevice]);

  const checkConditionInput = React.useCallback((): boolean => {
    if (!connectedDevice) {
      showWarning('Bạn chưa kết nối với thiết bị');
      return false;
    }

    if (isNaN(Number(address)) || isNaN(Number(order))) {
      showWarning('Giá trị nhập vào phải là số');
      return false;
    }

    if (Number(address) > UNIVERSE_ADDRESS.MAX) {
      showWarning(`Có tối đa ${UNIVERSE_ADDRESS.MAX} địa chỉ`);
      return false;
    }

    if (Number(address) === UNIVERSE_ADDRESS.MIN) {
      showWarning(`Địa chỉ cần lớn hơn ${UNIVERSE_ADDRESS.MIN}`);
      return false;
    }

    const index = listAddress.findIndex(addr => addr.order === Number(order));

    if (index > -1) {
      showWarning('Số thứ tự đèn đã tồn tại');
      return false;
    }

    return true;
  }, [address, connectedDevice, listAddress, order]);

  const validateAddress = React.useCallback((): boolean => {
    //Address existed
    const index = listAddress.findIndex(
      addr => addr.addressId === Number(address),
    );

    if (index > -1) {
      showWarning('Địa chỉ này đã được set');
      return false;
    }

    //Invalid address

    return true;
  }, [address, listAddress]);

  const handleSetAddress = React.useCallback(async (): Promise<boolean> => {
    if (!checkConditionInput()) {
      return;
    }

    if (!validateAddress()) {
      return;
    }

    setLoading(true);

    const timeOut = setTimeout(() => {
      setLoading(false);
    }, TIME_OUT);

    const params = convertAddressToArray(Number(address));

    const hexString = params.reduce(
      (result, hexValue) => result + String.fromCharCode(hexValue),
      '',
    );

    subscriptionRef.current?.unsubscribe();

    subscriptionRef.current = this.message.subscribe(async response => {
      const dataInBase64 = response;

      const dataInRawBytes = Buffer.from(dataInBase64, 'base64');

      if (
        convertResponse([dataInRawBytes[0], dataInRawBytes[1]]) ===
        Number(address)
      ) {
        await createNewAddress({
          order: Number(order),
          deviceType: typeDevice,
          addressId: Number(address),
          universeId: universe.id,
        })
          .then(() => {
            increaseOrder();
            increaseAddress();
            showSuccess('Set địa chỉ thành công');
            subscriptionRef.current?.unsubscribe();
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log('Error when create address into DB: ', err);
          });
      } else {
        showError('Set địa chỉ thất bại');
        subscriptionRef.current?.unsubscribe();
      }

      clearTimeout(timeOut);

      setLoading(false);
    });

    const message = base64.encode(hexString);

    writeable?.writeWithoutResponse(message);
  }, [
    address,
    checkConditionInput,
    createNewAddress,
    increaseAddress,
    increaseOrder,
    order,
    typeDevice,
    universe,
    validateAddress,
    writeable,
  ]);

  return [
    loading,
    handleSetAddress,
    order,
    handleChangeOrder,
    address,
    changeAddress,
    handleChangeInputAddress,
    typeDevice,
    handleChangeDevice,
  ];
}
