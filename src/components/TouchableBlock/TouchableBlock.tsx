import type {StyleProp} from 'react-native';
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

  style?: StyleProp<any>;

  subLabel?: string;
}

const TouchableBlock: FC<TouchableBlockProps> = (
  props: TouchableBlockProps,
) => {
  const {onPress, label, left, right, style, subLabel} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[shareStyles.w100, styles.block, StyleSheet.flatten(style)]}>
      {left && <View style={styles.left}>{left}</View>}
      <View>
        <Text style={[shareStyles.textRegular, styles.label]}>{label}</Text>
        {subLabel && (
          <Text style={[shareStyles.textRegular, styles.subLabel]}>
            {subLabel}
          </Text>
        )}
      </View>
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
  subLabel: {
    fontSize: 14,
    lineHeight: 14,
    color: Colors.green,
    marginTop: 8,
  },
});

export default TouchableBlock;
