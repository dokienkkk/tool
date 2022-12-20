import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProjectListScreen, SettingScreen} from '../../screens';

const {Navigator, Screen} = createBottomTabNavigator();

interface TabNavigatorProp {}

const TabNavigator: FC<TabNavigatorProp> = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={ProjectListScreen.name} component={ProjectListScreen} />
      <Screen name={SettingScreen.name} component={SettingScreen} />
    </Navigator>
  );
};

export default TabNavigator;
