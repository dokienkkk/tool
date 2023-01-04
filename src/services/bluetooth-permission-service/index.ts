import {Platform} from 'react-native';
import type {Permission} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';
import {AbstractPermissionService} from '../abstract-permission-service';

export class BlueToothPermissionService extends AbstractPermissionService {
  handlePermissionUnavailable(): void | Promise<void> {}
  handlePermissionBlocked(): void | Promise<void> {}
  handlePermissionDenied(): void | Promise<void> {}
  handlePermissionLimited(): void | Promise<void> {}
  handlePermissionGranted(): void | Promise<void> {}
  public get permission(): Permission {
    return Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
  }
}

export const bluetoothPermissionSevice = new BlueToothPermissionService();
