import {DataSource} from 'typeorm/browser';
import * as Models from 'src/database/model';
import {globalState} from 'src/app/global-state';

export class DatabaseService {
  private AppDataSource: DataSource = null;

  public readonly connectDatabase = async () => {
    try {
      this.AppDataSource = new DataSource({
        type: 'react-native',
        database: 'default',
        location: 'default',
        entities: Object.values(Models),
        logging: ['error'],
        synchronize: globalState.isFirstTime,
      });
      await this.AppDataSource.initialize().then(() => {
        // eslint-disable-next-line no-console
        console.log('Init Database');
      });
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
