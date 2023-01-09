import React from 'react';
import type {BleError, Device} from 'react-native-ble-plx';
import {globalState} from 'src/app/global-state';
import {showWarning} from 'src/helpers/toast-helper';
import {STATUS} from 'src/types/status';
import type {BluetoothSevice} from '.';

export function useBluetoothResponse(this: BluetoothSevice) {
  const [connectedDevice] = globalState.useConnectedDevice();

  const [readable] = globalState.useReadable();

  React.useEffect(() => {
    const subscribe = connectedDevice?.onDisconnected(
      async (error: BleError, device: Device) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('Error when subscrible onDisconnected: ', error);
        }
        if (device && device.id === connectedDevice?.id) {
          await globalState.setBluetoothStatus(STATUS.DISCONNECTED);
          showWarning('Thiết bị đã mất kết nối');
        }
      },
    );
    return function cleanup() {
      subscribe?.remove();
    };
  }, [connectedDevice]);

  React.useEffect(() => {
    const subscrible = readable?.monitor((error, response) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error when listen on global: ', error);
      }
      if (!response) {
        return;
      }

      this.message.next(response.value);
    });
    return function cleanup() {
      subscrible?.remove();
    };
  }, [readable]);
}
