import * as React from 'react';

export declare type BooleanState = [
  boolean,
  () => void,
  () => void,
  () => void,
];

export function useBoolean(initialValue: boolean): BooleanState {
  const [boolValue, setBoolValue] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setBoolValue(!boolValue);
  }, [boolValue]);

  const setTrue = React.useCallback(() => {
    setBoolValue(true);
  }, []);

  const setFalse = React.useCallback(() => {
    setBoolValue(false);
  }, []);

  return [boolValue, toggle, setTrue, setFalse];
}
