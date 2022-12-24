import type {StyleProp, ViewProps} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import type {FC, ReactElement} from 'react';
import React from 'react';
import Colors from '../../styles/Colors';

interface TabBarIconProps {
  style?: StyleProp<ViewProps>;

  icon?: ReactElement;

  focus?: boolean;

  onPress?: () => void;
}

const TabBarIcon: FC<TabBarIconProps> = (props: TabBarIconProps) => {
  const {style, icon, onPress, focus} = props;
  return (
    <TouchableOpacity
      style={[
        styles.tabIcon,
        StyleSheet.flatten(style),
        focus ? styles.bgBlue : styles.bgWhite,
      ]}
      onPress={onPress}>
      {icon && icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginLeft: 8,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  bgBlue: {
    backgroundColor: Colors.blue,
  },
});

export default TabBarIcon;
