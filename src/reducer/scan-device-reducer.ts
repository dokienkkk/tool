import type {Device} from 'react-native-ble-plx';

export interface ScanDeviceListReducerAction {
  type: ScanDeviceListReducerActionType;

  device?: Device;
}

export enum ScanDeviceListReducerActionType {
  NEW_DEVICE,
  RESET,
}

export function scanDeviceReducer(
  state: Device[],
  action: ScanDeviceListReducerAction,
): Device[] {
  switch (action.type) {
    case ScanDeviceListReducerActionType.NEW_DEVICE:
      const index = state.findIndex(device => device.id === action.device.id);
      if (index < 0) {
        let newState = [...state, action.device];
        return newState;
      }
      return state;
    case ScanDeviceListReducerActionType.RESET:
      return state;
    default:
      return state;
  }
}
