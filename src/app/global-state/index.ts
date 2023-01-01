import React from 'reactn';
import type {StateTuple} from 'reactn/types/use-global';
import type {Project} from '../../types/project';
import type {STATUS} from '../../types/status';
import {initialize} from './initialize';

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
}

export const globalState: GlobalState = new GlobalState();
