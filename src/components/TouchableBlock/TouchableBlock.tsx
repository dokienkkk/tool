import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import type {FC, ReactElement} from 'react';
import React from 'react';
import Colors from '../../styles/Colors';
import shareStyles from '../../styles';
interface TouchableBlockProps {
  onPress?: () => void;

  left?: ReactElement;

  right?: ReactElement;

  label?: string;
}

const TouchableBlock: FC<TouchableBlockProps> = (
  props: TouchableBlockProps,
) => {
  const {onPress, label, left, right} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[shareStyles.w100, styles.block]}>
      {left && <View style={styles.left}>{left}</View>}
      <Text style={[shareStyles.textRegular, styles.label]}>{label}</Text>
      {right && <View style={styles.right}>{right}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.white,
    height: 52,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.blue,
  },
  left: {
    marginHorizontal: 12,
  },
  right: {
    marginLeft: 'auto',
  },
});

export default TouchableBlock;
