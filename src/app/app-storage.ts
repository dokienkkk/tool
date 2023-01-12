import AsyncStorage from '@react-native-async-storage/async-storage';
import {IS_FIRST_TIME} from 'src/config/name';

export class AppStorage {
  public get isFirstTime(): Promise<boolean> {
    return AsyncStorage.getItem(IS_FIRST_TIME).then((value: string) => {
      // eslint-disable-next-line no-eq-null
      if (value == null) {
        return true;
      }
      return false;
    });
  }

  public async setIsFirstTime(state: boolean): Promise<void> {
    await AsyncStorage.setItem(IS_FIRST_TIME, JSON.stringify(state));
  }
}

export const appStorage = new AppStorage();
