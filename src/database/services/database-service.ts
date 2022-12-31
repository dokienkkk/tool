import type {AppStateStatus} from 'react-native';
import {DataSource} from 'typeorm/browser';
import {DB_LOCATION, DB_NAME} from 'src/database/config';
import * as Models from 'src/database/model';

export class DatabaseService {
  private dataSource: DataSource = null;

  public readonly connectDatabase = async () => {
    if (this.dataSource) {
      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();
      }
      this.dataSource = null;
    }

    const myDataSource = new DataSource({
      type: 'react-native',
      database: DB_NAME,
      location: DB_LOCATION,
      logging: ['error'],
      // synchronize: true,
      entities: Object.values(Models),
    });

    return myDataSource
      .initialize()
      .then(newDataSource => {
        this.dataSource = newDataSource;
        // eslint-disable-next-line no-console
        console.log('Connected Database!');
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Error during Data Source initialization: ', err);
      });
  };

  public readonly getDataSource = async () => {
    if (!this.dataSource) {
      await this.connectDatabase();
    }
    return this.dataSource;
  };

  public readonly destroy = async () => {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();
      // eslint-disable-next-line no-console
      console.log('TypeORM closed');
    }
  };

  public readonly handleAppState = async (state: AppStateStatus) => {
    if (this.dataSource) {
      switch (state) {
        case 'active':
          if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize().then(() => {
              // eslint-disable-next-line no-console
              console.log('Reconnect Database');
            });
          }
          break;
        case 'background':
          this.destroy();
          break;
      }
    } else {
      await this.connectDatabase();
    }
  };
}

export const databaseService = new DatabaseService();
