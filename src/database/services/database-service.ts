import {DataSource} from 'typeorm/browser';
import * as Models from 'src/database/model';
import {appStorage} from 'src/app/app-storage';

export class DatabaseService {
  private AppDataSource: DataSource = null;

  public readonly connectDatabase = async () => {
    try {
      const isFirstTime = await appStorage.isFirstTime;

      this.AppDataSource = new DataSource({
        type: 'react-native',
        database: 'default',
        location: 'default',
        entities: Object.values(Models),
        logging: ['error'],
        synchronize: isFirstTime,
      });
      await this.AppDataSource.initialize().then(() => {
        // eslint-disable-next-line no-console
        console.log('Init Database');
      });
      await appStorage.setIsFirstTime(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error Init: ', error);
    }
  };

  public readonly getDataSource = () => {
    return this.AppDataSource;
  };
}

export const databaseService = new DatabaseService();
