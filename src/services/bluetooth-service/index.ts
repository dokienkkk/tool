import type {BleError, Device} from 'react-native-ble-plx';
import {BleManager} from 'react-native-ble-plx';
import {Subject} from 'rxjs';
import {useBluetoothScan} from './bluetooth-scan';

export class BluetoothSevice {
  private bleManager: BleManager;

  constructor() {
    this.bleManager = new BleManager();
  }

  public readonly message = new Subject();

  public readonly create = () => {
    if (this.bleManager) {
      try {
        this.bleManager.destroy();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error when destroy: ', error);
      }
    }
    this.bleManager = new BleManager();
  };

  public readonly startScan = () => {
    this.bleManager.startDeviceScan(
      null,
      null,
      (error: BleError, device: Device) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('Error when scan device: ', error);
        }
        // eslint-disable-next-line no-console
        console.log(device);
        this.message.next(device);
      },
    );
  };

  public readonly stopScan = () => {
    this.bleManager.stopDeviceScan();
  };

  public readonly useBluetoothScan = useBluetoothScan;
}

export const blueToothService = new BluetoothSevice();
