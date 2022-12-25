import type {Device} from '../types/device';
import {DeviceType} from '../types/device';

export const Devices: Device[] = [
  {
    type: DeviceType.RGB_LIGHT,
    name: 'Đèn RGB',
    address: 3,
  },
  {
    type: DeviceType.CCT_Light,
    name: 'Đèn CCT',
    address: 2,
  },
  {
    type: DeviceType.RGB_CCT_LIGHT,
    name: 'Đèn RGB CCT',
    address: 5,
  },
];
