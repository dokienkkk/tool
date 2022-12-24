import {View, Text} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import shareStyles from '../../styles';
import {numberOfLines} from '../../helpers/string-helper';
import {useTranslation} from 'react-i18next';
import BluetoothIconThin from '../../icons/BluetoothIconThin';
import Colors from '../../styles/Colors';

interface UniverseSetAddressScreenProps extends NativeStackScreenProps<any> {}

const UniverseSetAddressScreen: FC<UniverseSetAddressScreenProps> = (
  props: UniverseSetAddressScreenProps,
) => {
  const {navigation, route} = props;

  const {universe} = route.params ?? {};

  const [translate] = useTranslation();
  return (
    <DefaultLayout
      left={true}
      goBack={navigation.goBack}
      title={numberOfLines(universe?.name ?? translate('universe.name'), 30)}
      right={<BluetoothIconThin color={Colors.green} />}>
      <View style={shareStyles.defaultBackground}>
        <Text>UniverseSetAddressScreen</Text>
      </View>
    </DefaultLayout>
  );
};

export default UniverseSetAddressScreen;
