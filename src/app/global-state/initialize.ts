import React from 'reactn';
import type {GlobalState} from '.';
import {STATUS} from '../../types/status';

export async function initialize() {
  await React.setGlobal<GlobalState>({
    bluetoothStatus: STATUS.DISCONNECTED,
    projects: [],
  });
}
