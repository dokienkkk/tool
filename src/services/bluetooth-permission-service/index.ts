import {Platform} from 'react-native';
import type {Permission, PermissionStatus} from 'react-native-permissions';
import {checkMultiple} from 'react-native-permissions';
import {check, request, requestMultiple} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import React from 'react';

const oldDeviceApi = 31;

export function usePermission(this: BlueToothPermissionService) {
  React.useEffect(() => {
    this.checkPermission();
  }, []);
}

export class BlueToothPermissionService {
  handlePermissionUnavailable(): void | Promise<void> {}
  handlePermissionBlocked(): void | Promise<void> {}
  handlePermissionDenied(): void | Promise<void> {}
  handlePermissionLimited(): void | Promise<void> {}
  handlePermissionGranted(): void | Promise<void> {}

  public readonly usePermission = usePermission;

  public permission(apiLevel: number): Permission[] {
    if (apiLevel < oldDeviceApi) {
      return Platform.select({
        android: [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
      });
    }
    return Platform.select({
      android: [
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
    });
  }

  async requestPermission(): Promise<PermissionStatus> {
    const apiLevel = await DeviceInfo.getApiLevel();
    if (apiLevel < oldDeviceApi) {
      const status = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }),
      );
      return this.handlePermissionStatus(status);
    }
    const result = await requestMultiple(
      Platform.select({
        android: [
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ],
      }),
    );

    const allGranted: PermissionStatus =
      result['android.permission.BLUETOOTH_SCAN'] === 'granted' &&
      result['android.permission.BLUETOOTH_CONNECT'] === 'granted' &&
      result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
        ? 'granted'
        : 'denied';
    return this.handlePermissionStatus(allGranted);
  }

  async checkPermission(): Promise<PermissionStatus> {
    const apiLevel = await DeviceInfo.getApiLevel();
    let status: PermissionStatus;
    if (apiLevel < oldDeviceApi) {
      status = await check(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }),
      );
    } else {
      let result = await checkMultiple(
        Platform.select({
          android: [
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ],
        }),
      );
      status =
        result['android.permission.BLUETOOTH_SCAN'] === 'granted' &&
        result['android.permission.BLUETOOTH_CONNECT'] === 'granted' &&
        result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
          ? 'granted'
          : 'denied';
    }
    await this.handlePermissionStatus(status);
    return status;
  }

  private async handlePermissionStatus(status: PermissionStatus) {
    switch (status) {
      case 'unavailable':
        await this.handlePermissionUnavailable();
        break;
      case 'blocked':
        await this.handlePermissionBlocked();
        break;
      case 'denied':
        await this.handlePermissionDenied();
        return this.requestPermission();
      case 'limited':
        await this.handlePermissionLimited();
        break;
      case 'granted':
      default:
        await this.handlePermissionGranted();
        break;
    }
    return status;
  }
}

export const bluetoothPermissionSevice = new BlueToothPermissionService();
