import type {Options} from 'react-native-toasty';
import {RNToasty} from 'react-native-toasty';

const defaultOption: Partial<Options> = {
  fontFamily: 'Quicksand-Regular',
  position: 'center',
  duration: 1,
};

export const showSuccess = (title: string, option?: Options) => {
  RNToasty.Success({
    title,
    ...defaultOption,
    ...option,
  });
};

export const showError = (title: string, option?: Options) => {
  RNToasty.Success({
    title,
    ...defaultOption,
    ...option,
  });
};
