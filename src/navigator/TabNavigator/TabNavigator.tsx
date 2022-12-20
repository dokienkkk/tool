import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProjectListScreen, SettingScreen} from '../../screens';
import Colors from '../../styles/Colors';
import {StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import Lang from '../../config/lang';
import ProjectIcon from '../../icons/ProjectIcon';
import SettingIcon from '../../icons/SettingIcon';

const {Navigator, Screen} = createBottomTabNavigator();

interface TabNavigatorProp {}

const TabNavigator: FC<TabNavigatorProp> = () => {
  const [translate] = useTranslation();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
        tabBarStyle: styles.tabBar,
      }}>
      <Screen
        name={ProjectListScreen.name}
        component={ProjectListScreen}
        options={{
          tabBarLabel({focused}) {
            return focused ? (
              <Text style={[styles.focused, styles.label]}>
                {translate(Lang.Tab.Project)}
              </Text>
            ) : (
              <Text style={styles.label}>{translate(Lang.Tab.Project)}</Text>
            );
          },
          tabBarIcon: ({focused}) => <ProjectIcon focus={focused} />,
        }}
      />
      <Screen
        name={SettingScreen.name}
        component={SettingScreen}
        options={{
          tabBarLabel({focused}) {
            return focused ? (
              <Text style={[styles.focused, styles.label]}>
                {translate(Lang.Tab.Setting)}
              </Text>
            ) : (
              <Text style={styles.label}>{translate(Lang.Tab.Setting)}</Text>
            );
          },
          tabBarIcon: ({focused}) => <SettingIcon focus={focused} />,
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    flexDirection: 'row',
  },
  focused: {
    color: Colors.primary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
    marginBottom: 12,
  },
});

export default TabNavigator;
