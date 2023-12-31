import {Devices, elementOfDevice} from 'src/config/device';
import type {Project} from 'src/database/model';
import {Universe} from 'src/database/model';
import {Address} from 'src/database/model';
import {databaseService} from 'src/database/services/database-service';
import type {DataExport, Fixture} from 'src/types/data';
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

  public get = async (project: Project): Promise<DataExport> => {
    const dataSource = await databaseService.getDataSource();

    const universeRepository = dataSource.getRepository(Universe);

    const listUniverses = await universeRepository.findBy({
      projectId: project.id,
    });

    if (listUniverses.length === 0) {
      return null;
    }

    const addressRepository = dataSource.getRepository(Address);

    const result = [];

    await Promise.all(
      listUniverses.map(async (universe: Universe): Promise<any> => {
        const listAddress = await addressRepository.findBy({
          universeId: universe.id,
        });

        listAddress.forEach(address => {
          const data: Fixture = {
            ID: address.order,
            Universe: universe.index,
            Address: address.addressId,
            Channels: elementOfDevice(address.deviceType),
          };

          result.push(data);
        });
      }),
    );

    const exportData = {
      projectName: project.name,
      data: result,
    };

    return exportData;
  };

  public delete = async (address: Partial<Address>): Promise<void> => {
    const dataSource = await databaseService.getDataSource();

    const addressRepository = dataSource.getRepository(Address);

    const findAddress = await addressRepository.findOneBy({
      id: address.id,
    });

    await addressRepository.remove(findAddress);
  };
}

export const addressRepository = new AddressRepository();
