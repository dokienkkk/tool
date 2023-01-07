import {UNIVERSE_ADDRESS} from 'src/config/set-address';

const DEFAULT_LENGTH = 20;

export const numberOfLines = (
  title: string,
  lengthTitle: number = DEFAULT_LENGTH,
): string =>
  title.substring(0, lengthTitle ?? DEFAULT_LENGTH) +
  (title.length > (lengthTitle ?? DEFAULT_LENGTH) ? '...' : '');

export const formatNumber = (num: string): string => {
  return Number(num) < 10 ? '0' + num : num;
};

export const convertAddressToArray = (
  num: number,
): [number, number, number] => {
  if (num > UNIVERSE_ADDRESS.MAX) {
    throw new Error('Invalid number: Có tối đa 512 địa chỉ');
  }
  let hexString = num.toString(16).padStart(4, '0');
  let val1 = parseInt(hexString.slice(0, 2), 16);
  let val2 = parseInt(hexString.slice(2, 4), 16);

  return [0, val1, val2];
};

export const convertResponse = (num: Array<number>): number => {
  return num[0] * 256 + num[1];
};
