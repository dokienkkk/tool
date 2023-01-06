import {useAddress} from './use-address';

export class AddressService {
  public readonly useAddress = useAddress;
}

export const addressService = new AddressService();
