import React from 'react';
import {globalState} from 'src/app/global-state';
import type {Address, Universe} from 'src/database/model';
import {showSuccess} from 'src/helpers/toast-helper';
import {addressRepository} from 'src/repositories/address-repository';

export function useAddress(
  universe: Universe,
): [
  Partial<Address>[],
  (newAddress: Partial<Address>) => Promise<void>,
  (address: Partial<Address>) => Promise<void>,
] {
  const [listAddress, setListAddress] = globalState.useAddress();

  const getListAddress = React.useCallback(async () => {
    const list = await addressRepository.list(universe);
    await globalState.setAddress(list);
  }, [universe]);

  const createNewAddress = React.useCallback(
    async (newAddress: Partial<Address>) => {
      const address = await addressRepository.create({
        order: newAddress.order,
        deviceType: newAddress.deviceType,
        addressId: newAddress.addressId,
        universeId: newAddress.universeId,
      });
      const newList = [...listAddress, address];
      await setListAddress(newList);
    },
    [listAddress, setListAddress],
  );

  const deleteAddress = React.useCallback(
    async (address: Partial<Address>) => {
      await addressRepository.delete(address);
      await getListAddress();
      showSuccess('Xóa thành công');
    },
    [getListAddress],
  );

  React.useEffect(() => {
    getListAddress();
  }, [getListAddress]);

  return [listAddress, createNewAddress, deleteAddress];
}
