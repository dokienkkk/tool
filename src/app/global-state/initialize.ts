import React from 'reactn';
import type {GlobalState} from 'src/app/global-state';
import {STATUS} from 'src/types/status';

export async function initialize() {
  await React.setGlobal<GlobalState>({
    bluetoothStatus: STATUS.DISCONNECTED,
  });
}
