export enum DeviceType {
  RGB_LIGHT,
  CCT_Light,
  RGB_CCT_LIGHT,
}

export interface Device {
  type: number;
  name: string;
  elements: number;
}
