import {BleManager} from 'react-native-ble-plx';
import React from 'reactn';
import type {GlobalState} from 'src/app/global-state';
import {STATUS} from 'src/types/status';
import {appStorage} from '../app-storage';

export async function initialize() {
  await React.setGlobal<GlobalState>({
    bluetoothStatus: STATUS.DISCONNECTED,
    bleManager: new BleManager(),
    isFirstTime: await appStorage.isFirstTime,
  });
}
