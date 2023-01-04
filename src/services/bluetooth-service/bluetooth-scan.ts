import {useNavigation} from '@react-navigation/native';
import type {Reducer} from 'react';
import React from 'react';
import type {BleError, Device} from 'react-native-ble-plx';
import {globalState} from 'src/app/global-state';
import {RD_NAME_BLUETOOTH} from 'src/config/name';
import {showError, showSuccess} from 'src/helpers/toast-helper';
import {useBoolean} from 'src/hooks/use-boolean';
import type {ScanDeviceListReducerAction} from 'src/reducer/scan-device-reducer';
import {ScanDeviceListReducerActionType} from 'src/reducer/scan-device-reducer';
import {scanDeviceReducer} from 'src/reducer/scan-device-reducer';

export function useBluetoothScan(): [
  Device[],
  boolean,
  () => void,
  () => void,
  (device: Device) => void,
  string,
  boolean,
] {
  const [scanDeviceList, dispatch] = React.useReducer<
    Reducer<Device[], ScanDeviceListReducerAction>
  >(scanDeviceReducer, []);

  const navigation = useNavigation();

  const [bleManager] = globalState.useBleManager();

  const [loading, setLoading] = React.useState(false);

  const [title, setTitle] = React.useState<string>();

  const [isVisible, , openModal, closeModal] = useBoolean(false);

  const handleScanDevice = React.useCallback(async () => {
    setLoading(true);
    bleManager.startDeviceScan(
      null,
      null,
      async (error: BleError, newDevice: Device) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('Error when scan new device');
          // eslint-disable-next-line no-console
          console.log(error);
        }
        if (
          newDevice &&
          (newDevice.localName?.includes(RD_NAME_BLUETOOTH) ||
            newDevice.name?.includes(RD_NAME_BLUETOOTH))
        ) {
          dispatch({
            type: ScanDeviceListReducerActionType.NEW_DEVICE,
            device: newDevice,
          });
        }
      },
    );
  }, [bleManager]);

  const handleStopScan = React.useCallback(() => {
    bleManager.stopDeviceScan();
    setLoading(false);
  }, [bleManager]);

  const handleConnectToDevice = React.useCallback(
    async (device: Device) => {
      const deviceName = device.name === null ? device.id : device.name;
      const titleModal = `Đang kết nối với thiết bị ${deviceName}`;
      setTitle(titleModal);
      openModal();
      try {
        const deviceConnected = await bleManager.connectToDevice(device.id);
        if (deviceConnected) {
          await globalState.setConnectedDevice(device);
          showSuccess(`Đã kết nối với thiết bị ${deviceName}`);
          navigation.goBack();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error when connect to device');
        // eslint-disable-next-line no-console
        console.log(error);
        showError(`Không thể kết nối với thiết bị ${deviceName}`);
      }
      closeModal();
    },
    [bleManager, closeModal, navigation, openModal],
  );

  return [
    scanDeviceList,
    loading,
    handleScanDevice,
    handleStopScan,
    handleConnectToDevice,
    title,
    isVisible,
  ];
}
