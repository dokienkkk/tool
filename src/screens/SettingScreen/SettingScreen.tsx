import {View, Text, StyleSheet} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import Colors from '../../styles/Colors';
import shareStyles from '../../styles';
import TouchableBlock from '../../components/TouchableBlock/TouchableBlock';
import LanguageIcon from '../../icons/LanguageIcon';
import ArrowRight from '../../icons/ArrowRight';
import ProjectSettingIcon from '../../icons/ProjectSettingIcon';
import BluetoothIcon from '../../icons/BlueToothIcon';
import ImportIcon from '../../icons/ImportIcon';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ChangeLanguageScreen from '../ChangeLanguageScreen/ChangeLanguageScreen';
import UpdateIcon from '../../icons/UpdateIcon';

interface SettingScreenProps extends NativeStackScreenProps<any> {}

const SettingScreen: FC<SettingScreenProps> = (props: SettingScreenProps) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToChangeLanguageScreen = React.useCallback(() => {
    navigation.navigate(ChangeLanguageScreen.name);
  }, [navigation]);

  return (
    <DefaultLayout title={translate('tab.setting')}>
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, shareStyles.textRegular]}>
          {translate('project.management')}
        </Text>
        <View style={styles.sectionBlock}>
          <TouchableBlock
            label={translate('project.setting')}
            left={<ProjectSettingIcon color={Colors.blue} />}
            right={<ArrowRight color={Colors.blue} />}
          />
        </View>
        <Text style={[styles.sectionTitle, shareStyles.textRegular]}>
          {translate('setting.general')}
        </Text>
        <View style={styles.sectionBlock}>
          <TouchableBlock
            label={translate('bluetooth.connection')}
            left={<BluetoothIcon color={Colors.blue} />}
            right={<ArrowRight color={Colors.blue} />}
          />
          <TouchableBlock
            label={translate('setting.language')}
            left={<LanguageIcon color={Colors.blue} />}
            right={<ArrowRight color={Colors.blue} />}
            onPress={handleGoToChangeLanguageScreen}
          />
          <TouchableBlock
            label={translate('file.import')}
            left={<ImportIcon color={Colors.blue} />}
            right={<ArrowRight color={Colors.blue} />}
          />

          <TouchableBlock
            label={translate('update')}
            left={<UpdateIcon color={Colors.blue} />}
            right={<ArrowRight color={Colors.blue} />}
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    color: Colors.gray,
    fontSize: 18,
  },
  sectionBlock: {
    // backgroundColor: Colors.white,
    width: '100%',
    // height: 200,
    marginVertical: 12,
    // paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    // backgroundColor: 'pink',
  },
});

export default SettingScreen;
