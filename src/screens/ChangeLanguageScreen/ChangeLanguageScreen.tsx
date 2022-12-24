import {View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import shareStyles from '../../styles';
import TouchableBlock from '../../components/TouchableBlock/TouchableBlock';
import i18next from 'i18next';
import Vietnamese from '../../icons/Vietnamese';
import English from '../../icons/English';
import {showSuccess} from '../../helpers/toast-helper';

interface ChangeLanguageScreenProps extends NativeStackScreenProps<any> {}

const ChangeLanguageScreen: FC<ChangeLanguageScreenProps> = (
  props: ChangeLanguageScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToSettingScreen = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeLanguage = React.useCallback(
    (lang: 'en' | 'vi') => async () => {
      await i18next.changeLanguage(lang);
      showSuccess(translate('setting.language.success'));
    },
    [translate],
  );

  return (
    <DefaultLayout
      left={true}
      goBack={handleGoToSettingScreen}
      title={translate('setting.language')}>
      <View style={shareStyles.defaultBackground}>
        <TouchableBlock
          label={translate('setting.language.vietnamese')}
          left={<Vietnamese />}
          onPress={handleChangeLanguage('vi')}
        />
        <TouchableBlock
          label={translate('setting.language.english')}
          left={<English />}
          onPress={handleChangeLanguage('en')}
        />
      </View>
    </DefaultLayout>
  );
};

export default ChangeLanguageScreen;
