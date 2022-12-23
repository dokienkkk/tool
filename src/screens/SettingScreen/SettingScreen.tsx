import {View, Text} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import shareStyles from '../../styles';
import {useTranslation} from 'react-i18next';
interface SettingScreenProps {}
const SettingScreen: FC<SettingScreenProps> = () => {
  const [translate] = useTranslation();
  return (
    <View style={shareStyles.container}>
      <Text>{translate('tab.setting')}</Text>
    </View>
  );
};

export default SettingScreen;
