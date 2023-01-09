import {UNIVERSE_ADDRESS} from 'src/config/set-address';

export const findLessAndGreater = (input: number, list: number[]): number[] => {
  //list: [1,4,7,12,16]
  //TH1: middle: input: 13 => output: [12,16]

  //1. SORT LIST ADDRESS
  list.sort((numA, numB) => numA - numB);

  //2. FIND LESS AND GREATER
  let less = UNIVERSE_ADDRESS.MIN;
  let greater = UNIVERSE_ADDRESS.MAX;

  const length = list.length;
  let indexGreater = length - 1;

  for (let i = length - 1; i > 0; i--) {
    if (input < list[i]) {
      greater = list[i];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      indexGreater = i;
      if (i > 1) {
        less = list[i - 1];
      } else {
        less = UNIVERSE_ADDRESS.MIN;
      }
      break;
    }
  }

  return [less, greater];
};
