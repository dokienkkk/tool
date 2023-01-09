declare const Buffer;
import type {MutableRefObject} from 'react';
import React from 'react';
import type {
  BleError,
  Characteristic,
  Device,
  Subscription,
} from 'react-native-ble-plx';
import {globalState} from 'src/app/global-state';
import {
  SERVICES_UUID_READ_WRITE,
  TIME_OUT,
  UNIVERSE_ADDRESS,
} from 'src/config/set-address';
import {
  convertAddressToArray,
  convertResponse,
} from 'src/helpers/string-helper';
import {showError, showSuccess, showWarning} from 'src/helpers/toast-helper';
import type {DeviceType} from 'src/types/device';
import {STATUS} from 'src/types/status';
import {addressService} from '../address-service';
import base64 from 'react-native-base64';

export function useBluetoothControl(): [
  boolean,
  (address: string, order: string, deviceType: DeviceType) => Promise<void>,
] {
  const [connectedDevice] = globalState.useConnectedDevice();

  const [universe] = globalState.useUniverse();

  const [writable, setWritable] = React.useState<Characteristic>();

  const [readable, setReadable] = React.useState<Characteristic>();

  const [loading, setLoading] = React.useState(false);

  const [, createNewAddress] = addressService.useAddress(universe);

  const subscriptionRef: MutableRefObject<Subscription> =
    React.useRef<Subscription>();

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

  const getCharacteristic = React.useCallback(async () => {
    if (!connectedDevice) {
      return;
    }
    const discoverDevice =
      await connectedDevice.discoverAllServicesAndCharacteristics();

    const services = await discoverDevice.services();

    const readAndWriteService = services.find(
      service => service.uuid === SERVICES_UUID_READ_WRITE,
    );

    const characteristics = await readAndWriteService.characteristics();

    const writeCharacteristic = characteristics.find(
      characteristic => characteristic.isWritableWithoutResponse === true,
    );

    const readCharacteristic = characteristics.find(
      characteristic => characteristic.isReadable === true,
    );

    if (writeCharacteristic && readCharacteristic) {
      setReadable(readCharacteristic);
      setWritable(writeCharacteristic);
    }
  }, [connectedDevice]);

  React.useEffect(() => {
    getCharacteristic();
  }, [getCharacteristic]);

  const checkConditionInput = React.useCallback(
    (address: string, order: string): boolean => {
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

      if (!connectedDevice) {
        showWarning('Bạn chưa kết nối với thiết bị');
        return false;
      }

      return true;
    },
    [connectedDevice],
  );

  const validateAddress = React.useCallback((address: number): boolean => {
    return true;
  }, []);

  const handleSetAddress = React.useCallback(
    async (address: string, order: string, deviceType: DeviceType) => {
      if (!checkConditionInput(address, order)) {
        return;
      }

      if (!validateAddress(Number(address))) {
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

      subscriptionRef.current?.remove();

      readable?.monitor(async (error: BleError, response) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('Error when subscrible response', error);
        }

        if (!response) {
          return;
        }

        const dataInBase64 = response.value;

        const dataInRawBytes = Buffer.from(dataInBase64, 'base64');

        clearTimeout(timeOut);

        setLoading(false);

        if (
          convertResponse([dataInRawBytes[0], dataInRawBytes[1]]) ===
          Number(address)
        ) {
          await createNewAddress({
            order: Number(order),
            deviceType: deviceType,
            addressId: Number(address),
            universeId: universe.id,
          })
            .then(() => {
              showSuccess('Set địa chỉ thành công');
              subscriptionRef.current?.remove();
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.log('Error when create address into DB: ', err);
            });
        } else {
          showError('Set địa chỉ thất bại');
          subscriptionRef.current?.remove();
        }
      });

      const message = base64.encode(hexString);

      writable?.writeWithoutResponse(message);
    },
    [
      checkConditionInput,
      createNewAddress,
      readable,
      universe,
      validateAddress,
      writable,
    ],
  );

  return [loading, handleSetAddress];
}
