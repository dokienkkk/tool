import React from 'react';
import {globalState} from 'src/app/global-state';
import type {BluetoothSevice} from '.';

export function useBluetoothResponse(this: BluetoothSevice) {
  const [readable] = globalState.useReadable();

  React.useEffect(() => {
    const subscrible = readable?.monitor((error, response) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error when listen on global: ', error);
      }
      if (!response) {
        return;
      }

      this.message.next(response.value);
    });
    return function cleanup() {
      subscrible?.remove();
    };
  }, [readable]);
}
