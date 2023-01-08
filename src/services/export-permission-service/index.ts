import {Platform} from 'react-native';
import type {Permission} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';
import {AbstractPermissionService} from '../abstract-permission-service';

export class ExportPermissionService extends AbstractPermissionService {
  handlePermissionUnavailable(): void | Promise<void> {}
  handlePermissionBlocked(): void | Promise<void> {}
  handlePermissionDenied(): void | Promise<void> {}
  handlePermissionLimited(): void | Promise<void> {}
  handlePermissionGranted(): void | Promise<void> {}
  public get permission(): Permission {
    return Platform.select({
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    });
  }
}

export const exportPermissionSevice = new ExportPermissionService();
