import {Address} from 'src/database/model';
import {databaseService} from 'src/database/services/database-service';
import {v4} from 'uuid';

export class AddressRepository {
  public create = async (data: Partial<Address>): Promise<void> => {
    const dataSource = await databaseService.getDataSource();

    const addressRepository = dataSource.getRepository(Address);

    const newAddress = new Address();
    newAddress.id = v4();
    newAddress.order = data.order;
    newAddress.deviceType = data.deviceType;
    newAddress.deviceName = data.deviceName;
    newAddress.createAt = new Date();

    await addressRepository.save(newAddress);
  };
}

export const addressRepository = new AddressRepository();
