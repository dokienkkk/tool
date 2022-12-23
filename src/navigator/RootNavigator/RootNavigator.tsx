import type {FC} from 'react';
import React from 'react';
import * as Screens from '../../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../TabNavigator/TabNavigator';

interface RootNavigatorProps {}

const {Navigator, Screen} = createNativeStackNavigator();

const RootNavigator: FC<RootNavigatorProps> = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={TabNavigator.name} component={TabNavigator} />
      {Object.values(Screens).map(screen => (
        <Screen key={screen.name} name={screen.name} component={screen} />
      ))}
    </Navigator>
  );
};

export default RootNavigator;
