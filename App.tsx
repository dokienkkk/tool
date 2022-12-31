/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import type {FC, LazyExoticComponent} from 'react';
import React, {Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/RootNavigator/RootNavigator';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import {globalState} from './src/app/global-state';
import {databaseService} from './src/database/services/database-service';
import {AppState} from 'react-native';

setJSExceptionHandler((error, isFatal) => {
  // eslint-disable-next-line no-console
  console.log(error, isFatal);
});

const RootComponent: FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App: LazyExoticComponent<any> = React.lazy(async () => {
  await globalState.initialize();

  await databaseService.connectDatabase();

  const unsubscribe = AppState.addEventListener(
    'change',
    databaseService.handleAppState,
  );

  unsubscribe.remove();

  AppState.addEventListener('change', databaseService.handleAppState);

  return {
    default: RootComponent,
  };
});

const AppEntry: FC = () => {
  React.useEffect(() => {
    //SplashScreen.hide();
  }, []);
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
};

export default AppEntry;
