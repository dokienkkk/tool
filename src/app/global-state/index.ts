import React from 'reactn';
import type {StateTuple} from 'reactn/types/use-global';
import type {Project} from '../../types/project';
import type {STATUS} from '../../types/status';
import {initialize} from './initialize';
import type {BleManager, Device, Characteristic} from 'react-native-ble-plx';
import type {Address, Universe} from 'src/database/model';

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

  /**
   * Charactiric
   *
   *@type {Characteristic[]}
   */

  public get characteristics(): Characteristic[] {
    return React.getGlobal<GlobalState>().characteristics;
  }

  public useCharacteristics(): StateTuple<GlobalState, 'characteristics'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'characteristics'>('characteristics');
  }

  public async setCharacteristics(characteristics: Characteristic[]) {
    await React.setGlobal<GlobalState>({
      characteristics,
    });
  }

  /**
   * Universe
   *
   *@type {Universe}
   */
  public get universe(): Universe {
    return React.getGlobal<GlobalState>().universe;
  }

  public async setUniverse(universe: Universe) {
    await React.setGlobal<GlobalState>({
      universe,
    });
  }

  public useUniverse(): StateTuple<GlobalState, 'universe'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'universe'>('universe');
  }

  /**
   * Universe
   *
   *@type {Universe}
   */
  public get address(): Address[] {
    return React.getGlobal<GlobalState>().address;
  }

  public async setAddress(address: Address[]) {
    await React.setGlobal<GlobalState>({
      address,
    });
  }

  public useAddress(): StateTuple<GlobalState, 'address'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'address'>('address');
  }

  /**
   * Charactiric Readable
   *
   *@type {Characteristic}
   */

  public get readable(): Characteristic {
    return React.getGlobal<GlobalState>().readable;
  }

  public useReadable(): StateTuple<GlobalState, 'readable'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'readable'>('readable');
  }

  public async setReadable(readable: Characteristic) {
    await React.setGlobal<GlobalState>({
      readable,
    });
  }

  /**
   * Charactiric Writeable
   *
   *@type {Characteristic}
   */

  public get writeable(): Characteristic {
    return React.getGlobal<GlobalState>().writeable;
  }

  public useWriteable(): StateTuple<GlobalState, 'writeable'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'writeable'>('writeable');
  }

  public async setWriteable(writeable: Characteristic) {
    await React.setGlobal<GlobalState>({
      writeable,
    });
  }

  /**
   * Is First Time Open
   */
  public get isFirstTime(): boolean {
    return React.getGlobal<GlobalState>().isFirstTime;
  }

  public useIsFirstTime(): StateTuple<GlobalState, 'isFirstTime'> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useGlobal<GlobalState, 'isFirstTime'>('isFirstTime');
  }

  public async setIsFirstTime(isFirstTime: boolean) {
    await React.setGlobal<GlobalState>({
      isFirstTime,
    });
  }
}

export const globalState: GlobalState = new GlobalState();
