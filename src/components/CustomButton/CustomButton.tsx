import type {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import shareStyles from '../../styles';
import Colors from '../../styles/Colors';

interface CustomButtonProps {
  label?: string;

  onPress?: () => void;

  isDangerColor?: boolean;

  style?: StyleProp<ViewStyle>;

  styleLabel?: StyleProp<TextStyle>;
}

const CustomButton: FC<CustomButtonProps> = (props: CustomButtonProps) => {
  const {label, onPress, style, styleLabel, isDangerColor} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isDangerColor ? styles.dangerBorder : {}, style]}>
      <Text
        style={[
          shareStyles.textRegular,
          isDangerColor ? styles.textDanger : {},
          styleLabel,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 30,
    marginHorizontal: 8,
    // flex: 1,
  },
  dangerBorder: {
    borderWidth: 0.5,
    borderColor: Colors.danger,
  },
  textDanger: {
    color: Colors.danger,
  },
});

export default CustomButton;
