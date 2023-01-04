import {View, Text} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import shareStyles from 'src/styles';

interface ImportFileScreenProps extends NativeStackScreenProps<any> {}

const ImportFileScreen: FC<ImportFileScreenProps> = (
  props: ImportFileScreenProps,
) => {
  const {navigation} = props;

  return (
    <DefaultLayout
      left={true}
      goBack={navigation.goBack}
      title={'Import file dự án'}>
      <View style={shareStyles.defaultBackground}>
        <Text>Import file</Text>
      </View>
    </DefaultLayout>
  );
};

export default ImportFileScreen;
