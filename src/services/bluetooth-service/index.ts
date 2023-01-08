// import type {BleError, Device} from 'react-native-ble-plx';
// import {BleManager} from 'react-native-ble-plx';
// import {Subject} from 'rxjs';
import {useBluetoothControl} from 'src/services/bluetooth-service/bluetooth-control';
import {useBluetoothScan} from 'src/services/bluetooth-service/bluetooth-scan';
import {handleBleError} from 'src/services/bluetooth-service/handle-ble-error';

export class BluetoothSevice {
  public readonly useBluetoothScan = useBluetoothScan;

  public readonly handleBleError = handleBleError;

  public readonly useBluetoothControl = useBluetoothControl;
}

export const blueToothService = new BluetoothSevice();
