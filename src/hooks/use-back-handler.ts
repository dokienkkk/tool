import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {BackHandler} from 'react-native';

export function useBackHandler() {
  const navigation = useNavigation();

  const handler = React.useCallback(() => {
    return true;
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handler);
    });
  }, [handler, navigation]);

  React.useEffect(() => {
    return navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    });
  }, [handler, navigation]);
}
