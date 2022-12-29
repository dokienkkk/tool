import type {AppStateStatus} from 'react-native';
import {DataSource} from 'typeorm/browser';
import {DB_LOCATION, DB_NAME} from '../config';
import * as Model from '../model';

export class DatabaseService {
  private dataSource: DataSource = null;

  public readonly connectDatabase = async () => {
    if (this.dataSource) {
      try {
        await this.dataSource.destroy();
        this.dataSource = null;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error when destroy connection Database');
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }

    const AppDataSource = new DataSource({
      type: 'react-native',
      database: DB_NAME,
      location: DB_LOCATION,
      logging: ['error'],
      // synchronize: true,
      entities: Object.values(Model),
    });

    return AppDataSource.initialize()
      .then((dataSource: DataSource) => {
        this.dataSource = dataSource;
        // eslint-disable-next-line no-console
        console.log('Connected Database!');
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Error during Data Source initialization: ', err);
      });
  };

  public readonly getDataSource = async () => {
    if (this.dataSource === null) {
      await this.connectDatabase();
    }
    return this.dataSource;
  };

  public readonly destroy = async () => {
    if (this.dataSource.initialize) {
      await this.dataSource.destroy();
      this.dataSource = null;
      // eslint-disable-next-line no-console
      console.log('TypeORM closed');
    }
  };

  public readonly handleAppState = async (state: AppStateStatus) => {
    if (this.dataSource) {
      switch (state) {
        case 'active':
          if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
          }
          break;
        case 'background':
          await this.destroy();
          break;
      }
    } else {
      await this.connectDatabase();
    }
  };
}

export const databaseService = new DatabaseService();
