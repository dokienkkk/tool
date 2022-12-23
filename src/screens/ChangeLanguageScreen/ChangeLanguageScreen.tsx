import {View, Text} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

interface ChangeLanguageScreenProps extends NativeStackScreenProps<any> {}

const ChangeLanguageScreen: FC<ChangeLanguageScreenProps> = (
  props: ChangeLanguageScreenProps,
) => {
  const {navigation} = props;

  return (
    <View>
      <Text>ChangeLanguageScreen</Text>
    </View>
  );
};

export default ChangeLanguageScreen;
