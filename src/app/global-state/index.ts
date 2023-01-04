import React from 'reactn';
import type {StateTuple} from 'reactn/types/use-global';
import type {Project} from '../../types/project';
import type {STATUS} from '../../types/status';
import {initialize} from './initialize';
import type {BleManager, Device} from 'react-native-ble-plx';

export class GlobalState {
  public readonly initialize = initialize;

  /**
   * Connection Status
   *
   * @type {STATUS}
   */

  public get bluetoothStatus(): STATUS {
    return React.getGlobal<GlobalState>().bluetoothStatus;
  }

  public useBluetoothStatus(): StateTuple<GlobalState, 'bluetoothStatus'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'bluetoothStatus'>('bluetoothStatus');
  }

  public async setBluetoothStatus(status: STATUS) {
    await React.setGlobal<GlobalState>({
      bluetoothStatus: status,
    });
  }

  /**
   * Connected Device
   *
   * @type {Device}
   */
  public get connectedDevice(): Device {
    return React.getGlobal<GlobalState>().connectedDevice;
  }

  public useConnectedDevice(): StateTuple<GlobalState, 'connectedDevice'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'connectedDevice'>('connectedDevice');
  }

  public async setConnectedDevice(device: Device) {
    await React.setGlobal<GlobalState>({
      connectedDevice: device,
    });
  }

  /**
   * Projects
   *
   * @type {Project}
   */

  public get project(): Project {
    return React.getGlobal<GlobalState>().project;
  }

  public async setProjects(project: Project) {
    await React.setGlobal<GlobalState>({
      project,
    });
  }

  public useProjects(): StateTuple<GlobalState, 'project'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'project'>('project');
  }

  /**
   * BLE Manager
   *
   * @type {BleManager}
   */

  public get bleManager(): BleManager {
    return React.getGlobal<GlobalState>().bleManager;
  }

  public useBleManager(): StateTuple<GlobalState, 'bleManager'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'bleManager'>('bleManager');
  }

  public async setBleManager(status: STATUS) {
    await React.setGlobal<GlobalState>({
      bluetoothStatus: status,
    });
  }
}

export const globalState: GlobalState = new GlobalState();
