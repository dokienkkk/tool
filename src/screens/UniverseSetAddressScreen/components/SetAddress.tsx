declare const Buffer;
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {FC, MutableRefObject} from 'react';
import React from 'react';
import LineBlock from 'src/components/LineBlock/LineBlock';
import shareStyles from 'src/styles';
import Colors from 'src/styles/Colors';
import CustomButton from 'src/components/CustomButton/CustomButton';
import {showError, showSuccess, showWarning} from 'src/helpers/toast-helper';
import {
  SERVICES_UUID_READ_WRITE,
  TIME_OUT,
  UNIVERSE_ADDRESS,
} from 'src/config/set-address';
import {Dropdown} from 'react-native-element-dropdown';
import {Devices} from 'src/config/device';
import type {Device} from 'src/types/device';
import {globalState} from 'src/app/global-state';
import base64 from 'react-native-base64';
import {useBoolean} from 'src/hooks/use-boolean';
import InfoModal from 'src/components/InfoModal/InfoModal';
import BluetoothSearchIcon from 'src/icons/BluetoothSearch';
import type {BleError, Subscription} from 'react-native-ble-plx';
import {STATUS} from 'src/types/status';
import {blueToothService} from 'src/services/bluetooth-service';
import {convertAddress, convertResponse} from 'src/helpers/string-helper';
import {addressService} from 'src/services/address-service';

interface SetAddressProps {}

const SetAddress: FC<SetAddressProps> = () => {
  const [connectedDevice] = globalState.useConnectedDevice();

  const [universe] = globalState.useUniverse();

  const [, createNewAddress] = addressService.useAddress(universe);

  const [address, setAddress] = React.useState('01');

  const [order, setOrder] = React.useState('01');

  const [typeDevice, setTypeDevice] = React.useState(0);

  const [isVisible, , openModal, closeModal] = useBoolean(false);

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
    [address],
  );

  const subscriptionRef: MutableRefObject<Subscription> =
    React.useRef<Subscription>();

  const handleSetAddress = React.useCallback(async () => {
    subscriptionRef.current?.remove();

    if (isNaN(Number(address)) || isNaN(Number(order))) {
      showWarning('Giá trị nhập vào phải là số');
      return;
    }
    if (Number(address) > UNIVERSE_ADDRESS.MAX) {
      showWarning(`Có tối đa ${UNIVERSE_ADDRESS.MAX} địa chỉ`);
      return;
    }
    if (Number(address) === UNIVERSE_ADDRESS.MIN) {
      showWarning(`Địa chỉ cần lớn hơn ${UNIVERSE_ADDRESS.MIN}`);
    }

    if (!connectedDevice) {
      showWarning('Bạn chưa kết nối với thiết bị');
      return;
    }
    openModal();
    const timeOut = setTimeout(() => {
      closeModal();
    }, TIME_OUT);
    const params = convertAddress(Number(address));

    const hexString = params.reduce(
      (result, hexValue) => result + String.fromCharCode(hexValue),
      '',
    );

    const connect =
      await connectedDevice.discoverAllServicesAndCharacteristics();
    const services = await connect.services();
    const mainServices = services.find(
      service => service.uuid === SERVICES_UUID_READ_WRITE,
    );
    const characteristics = await mainServices.characteristics();
    const writeable = characteristics.find(
      characteristic => characteristic.isWritableWithoutResponse === true,
    );
    const readable = characteristics.find(
      characteristic => characteristic.isReadable === true,
    );

    subscriptionRef.current = readable?.monitor(
      async (error: BleError, response) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
        if (response) {
          const dataInBase64 = response.value;
          const dataInRawBytes = Buffer.from(dataInBase64, 'base64');
          clearTimeout(timeOut);
          closeModal();
          if (
            convertResponse([dataInRawBytes[0], dataInRawBytes[1]]) ===
            Number(address)
          ) {
            await createNewAddress({
              order: Number(order),
              deviceType: typeDevice,
              addressId: Number(address),
              universeId: universe.id,
            }).then(() => {
              setOrder((Number(order) + 1).toString());
              showSuccess('Set địa chỉ thành công');
            });
          } else {
            showError('Set địa chỉ thất bại');
          }
        }
      },
    );

    const message = base64.encode(hexString);
    try {
      await writeable.writeWithoutResponse(message).then(() => {});
    } catch (error) {
      closeModal();
      blueToothService.handleBleError(error);
    }
  }, [
    address,
    closeModal,
    connectedDevice,
    createNewAddress,
    openModal,
    order,
    typeDevice,
    universe,
  ]);

  React.useEffect(() => {
    const subscribe = connectedDevice?.onDisconnected(
      async (error: BleError, device) => {
        if (device && device.id === connectedDevice?.id) {
          await globalState.setBluetoothStatus(STATUS.DISCONNECTED);
        }
      },
    );
    return function cleanup() {
      subscribe?.remove();
    };
  }, [connectedDevice]);

  return (
    <View style={styles.container}>
      <View style={styles.flexGrow}>
        <View style={styles.block}>
          <Dropdown
            selectedTextStyle={[
              shareStyles.textRegular,
              styles.labelAddress,
              styles.textRight,
            ]}
            itemTextStyle={[shareStyles.textRegular, styles.labelAddress]}
            data={Devices}
            labelField="name"
            valueField="type"
            value={typeDevice}
            onChange={(item: Device) => {
              setTypeDevice(item.type);
            }}
            maxHeight={300}
            renderLeftIcon={() => (
              <Text
                style={[
                  shareStyles.w50,
                  shareStyles.textBold,
                  styles.labelDropdown,
                ]}>
                Loại đèn
              </Text>
            )}
          />
        </View>

        <LineBlock
          left="STT đèn"
          right={
            <View style={styles.widthInput}>
              <TextInput
                keyboardType="numeric"
                placeholder="Nhập STT"
                value={order}
                onChangeText={setOrder}
                maxLength={4}
                multiline={false}
                style={[
                  shareStyles.textRegular,
                  styles.labelAddress,
                  shareStyles.w100,
                  styles.textRight,
                ]}
              />
            </View>
          }
        />
        <View>
          <Text style={[shareStyles.textBold, styles.sectionLabel]}>
            Địa chỉ
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => changeAddress('decrease')}>
              <Text style={styles.touchableIcon}>-</Text>
            </TouchableOpacity>
            <View style={styles.containerAddress}>
              <View style={shareStyles.w100}>
                <TextInput
                  keyboardType="numeric"
                  style={[
                    shareStyles.textRegular,
                    styles.labelAddress,
                    shareStyles.w100,
                    styles.textCenter,
                  ]}
                  onChangeText={setAddress}
                  value={address}
                  maxLength={3}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => changeAddress('increase')}>
              <Text style={styles.touchableIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          label="Set"
          style={styles.button}
          styleLabel={[shareStyles.textBold, styles.label]}
          onPress={handleSetAddress}
        />
      </View>

      <InfoModal
        isVisible={isVisible}
        body={'Đang set địa chỉ...'}
        icon={<BluetoothSearchIcon />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  flexGrow: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: Colors.blue,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 16,
  },
  sectionLabel: {
    fontSize: 16,
    color: Colors.blue,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchable: {
    height: 40,
    width: '30%',
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  touchableIcon: {
    fontSize: 20,
    color: Colors.white,
    lineHeight: 20,
  },
  containerAddress: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    height: 40,
    marginHorizontal: 10,
  },
  labelAddress: {
    fontSize: 16,
    color: Colors.black,
  },
  widthInput: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  block: {
    backgroundColor: Colors.white,
    height: 52,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  labelDropdown: {
    fontSize: 16,
    color: Colors.blue,
  },
});

export default SetAddress;
