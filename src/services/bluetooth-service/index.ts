import {Subject} from 'rxjs';
import {useBluetoothControl} from 'src/services/bluetooth-service/bluetooth-control';
import {useBluetoothScan} from 'src/services/bluetooth-service/bluetooth-scan';
import {handleBleError} from 'src/services/bluetooth-service/handle-ble-error';
import {useBluetoothResponse} from './use-bluetooth-response';

export class BluetoothSevice {
  public readonly message: Subject<any> = new Subject();

  public readonly useBluetoothScan = useBluetoothScan;

  public readonly handleBleError = handleBleError;

  public readonly useBluetoothControl = useBluetoothControl;

  public readonly useBluetoothResponse = useBluetoothResponse;
}

export const blueToothService = new BluetoothSevice();
