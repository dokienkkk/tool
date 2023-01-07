import {Devices} from 'src/config/device';
import type {Universe} from 'src/database/model';
import {Address} from 'src/database/model';
import {databaseService} from 'src/database/services/database-service';
import {v4} from 'uuid';

export class AddressRepository {
  public create = async (data: Partial<Address>): Promise<Address> => {
    const dataSource = await databaseService.getDataSource();

    const addressRepository = dataSource.getRepository(Address);

    const newAddress = new Address();
    newAddress.id = v4();
    newAddress.order = data.order;
    newAddress.universeId = data.universeId;
    newAddress.addressId = data.addressId;
    newAddress.deviceType = data.deviceType;
    newAddress.deviceName =
      Devices.find(device => device.type === data.deviceType)?.name ?? 'Đèn';
    newAddress.createAt = new Date();

    await addressRepository.save(newAddress);

    return newAddress;
  };

  public list = async (universe: Universe): Promise<Address[]> => {
    const dataSource = await databaseService.getDataSource();

    const addressRepository = dataSource.getRepository(Address);

    const listAddress = await addressRepository.findBy({
      universeId: universe.id,
    });

    return listAddress;
  };
}

export const addressRepository = new AddressRepository();
