import type {BleError} from 'react-native-ble-plx';
import {BleErrorCode} from 'react-native-ble-plx';
import {showError, showWarning} from 'src/helpers/toast-helper';

export function handleBleError(error: BleError) {
  switch (error.errorCode) {
    case BleErrorCode.BluetoothPoweredOff:
      showWarning('Bạn cần bật Bluetooth để sử dụng chức năng này');
      return;
    case BleErrorCode.LocationServicesDisabled:
      showWarning('Bạn cần bật Vị trí để sử dụng tính năng này');
      return;
    case BleErrorCode.DeviceDisconnected:
      showError('Mất kết nối với thiết bị');
      return;
    default:
      showError('Lỗi');
  }
}
