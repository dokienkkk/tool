import type {StyleProp, ViewProps} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import shareStyles from 'src/styles';
import Colors from 'src/styles/Colors';

interface LineBlockProps {
  left?: string;

  right?: string;

  style?: StyleProp<ViewProps>;
}
const LineBlock: FC<LineBlockProps> = (props: LineBlockProps) => {
  const {left, right, style} = props;

  return (
    <View style={[shareStyles.w100, styles.block, StyleSheet.flatten(style)]}>
      <Text style={[shareStyles.textBold, styles.textLeft]}>{left}</Text>
      <Text style={[shareStyles.textRegular, styles.textRight]}>{right}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.white,
    height: 52,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  textLeft: {
    fontSize: 16,
    color: Colors.blue,
  },
  textRight: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default LineBlock;
