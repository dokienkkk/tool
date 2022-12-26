import {View, useWindowDimensions, StyleSheet, Button} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import shareStyles from '../../styles';
import {numberOfLines} from '../../helpers/string-helper';
import {useTranslation} from 'react-i18next';
import BluetoothIconThin from '../../icons/BluetoothIconThin';
import Colors from '../../styles/Colors';
import {SceneMap, TabView} from 'react-native-tab-view';
import TabInfoIcon from '../../icons/TabInfoIcon';
import TabSetAddressIcon from '../../icons/TabSetAddressIcon';
import {TABBAR} from '../../config/tab-bar';
import TabBarIcon from '../../components/TabBarIcon/TabBarIcon';
import {globalState} from '../../app/global-state';
import {STATUS} from '../../types/status';

interface UniverseSetAddressScreenProps extends NativeStackScreenProps<any> {}

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

  const test = async () => {
    await globalState.setBluetoothStatus(STATUS.CONNECTED);
  };

  const FirstRoute = React.useCallback(
    () => <Button title={'set bluetooth connected'} onPress={test} />,
    [],
  );

  const SecondRoute = React.useCallback(() => null, []);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

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
        <BluetoothIconThin
          color={bluetoothStatus === STATUS.CONNECTED ? Colors.green : 'red'}
        />
      }>
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