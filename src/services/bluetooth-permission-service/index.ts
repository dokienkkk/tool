import {Platform} from 'react-native';
import type {Permission} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';
import {AbstractPermissionService} from '../abstract-permission-service';

export class BlueToothPermissionService extends AbstractPermissionService {
  handlePermissionUnavailable(): void | Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Permission Unavailable');
  }
  handlePermissionBlocked(): void | Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Permission Blocked');
  }
  handlePermissionDenied(): void | Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Permission Denied');
  }
  handlePermissionLimited(): void | Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Permission Limited');
  }
  handlePermissionGranted(): void | Promise<void> {
    // eslint-disable-next-line no-console
    console.log('Permission Granted');
  }
  public get permission(): Permission {
    return Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
  }
}

export const bluetoothSevice = new BlueToothPermissionService();
