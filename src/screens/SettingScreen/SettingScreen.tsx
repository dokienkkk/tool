import {View, Text} from 'react-native';
import React, {FC} from 'react';
import shareStyles from '../../styles';
import {useTranslation} from 'react-i18next';
interface SettingScreenProps {}
const SettingScreen: FC<SettingScreenProps> = () => {
  const [translate] = useTranslation();
  return (
    <View style={shareStyles.container}>
      <Text>{translate('setting')}</Text>
    </View>
  );
};

export default SettingScreen;
