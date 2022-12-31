import type {Device} from 'src/types/device';
import {DeviceType} from 'src/types/device';

export const Devices: Device[] = [
  {
    type: DeviceType.RGB_LIGHT,
    name: 'Đèn RGB',
    elements: 3,
  },
  {
    type: DeviceType.CCT_Light,
    name: 'Đèn CCT',
    elements: 2,
  },
  {
    type: DeviceType.RGB_CCT_LIGHT,
    name: 'Đèn RGB CCT',
    elements: 5,
  },
];
