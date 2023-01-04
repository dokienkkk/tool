import {View, useWindowDimensions, StyleSheet} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import shareStyles from 'src/styles';
import {numberOfLines} from 'src/helpers/string-helper';
import {useTranslation} from 'react-i18next';
import BluetoothIconThin from 'src/icons/BluetoothIconThin';
import Colors from 'src/styles/Colors';
import {SceneMap, TabView} from 'react-native-tab-view';
import TabInfoIcon from 'src/icons/TabInfoIcon';
import TabSetAddressIcon from 'src/icons/TabSetAddressIcon';
import {TABBAR} from 'src/config/tab-bar';
import TabBarIcon from 'src/components/TabBarIcon/TabBarIcon';
import {globalState} from 'src/app/global-state';
import {STATUS} from 'src/types/status';
import KeepAwake from '@sayem314/react-native-keep-awake';
import SetAddress from 'src/screens/UniverseSetAddressScreen/components/SetAddress';
import TableAddress from './components/TableAddress';
import BluetoothOff from 'src/icons/BluetoothOff';

interface UniverseSetAddressScreenProps extends NativeStackScreenProps<any> {}

const renderScene = SceneMap({
  first: TableAddress,
  second: SetAddress,
});

const UniverseSetAddressScreen: FC<UniverseSetAddressScreenProps> = (
  props: UniverseSetAddressScreenProps,
) => {
  const {navigation, route} = props;

  const {universe} = route.params ?? {};

  const layout = useWindowDimensions();

  const [translate] = useTranslation();

  const [bluetoothStatus] = globalState.useBluetoothStatus();

  const [index, setIndex] = React.useState(TABBAR.ROUTE_FIRST.INDEX);

  const [routes] = React.useState([
    {key: TABBAR.ROUTE_FIRST.KEY, title: TABBAR.ROUTE_FIRST.TITLE},
    {key: TABBAR.ROUTE_SECOND.KEY, title: TABBAR.ROUTE_SECOND.TITLE},
  ]);

  const renderTabBar = React.useCallback(() => {
    return (
      <View style={styles.tabBar}>
        {Object.entries(TABBAR).map((_, tabIndex) => {
          const focus = tabIndex === index;
          return (
            <TabBarIcon
              key={tabIndex}
              onPress={() => {
                setIndex(tabIndex);
              }}
              icon={
                tabIndex === TABBAR.ROUTE_FIRST.INDEX ? (
                  <TabInfoIcon focus={focus} />
                ) : (
                  <TabSetAddressIcon focus={focus} />
                )
              }
              focus={focus}
            />
          );
        })}
      </View>
    );
  }, [index]);

  return (
    <DefaultLayout
      left={true}
      goBack={navigation.goBack}
      title={numberOfLines(universe?.name ?? translate('universe.name'), 30)}
      right={
        bluetoothStatus === STATUS.CONNECTED ? (
          <BluetoothIconThin color={Colors.green} />
        ) : (
          <BluetoothOff color={'red'} />
        )
      }>
      <KeepAwake />
      <View style={shareStyles.defaultBackground}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
});

export default UniverseSetAddressScreen;
