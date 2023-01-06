import {
  Text,
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useBackHandler} from 'src/hooks/use-back-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeepAwake from '@sayem314/react-native-keep-awake';
import shareStyles from 'src/styles';
import CustomButton from 'src/components/CustomButton/CustomButton';
import Colors from 'src/styles/Colors';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import Spinner from 'react-native-spinkit';
import InfoModal from 'src/components/InfoModal/InfoModal';
import BluetoothSearchIcon from 'src/icons/BluetoothSearch';
import {blueToothService} from 'src/services/bluetooth-service';
import type {Device} from 'react-native-ble-plx';
import {RD_SET_ADDRESS_DISPLAYNAME} from 'src/config/name';

interface ScanDeviceScreenProps extends NativeStackScreenProps<any> {}

const ScanDeviceScreen: FC<ScanDeviceScreenProps> = (
  props: ScanDeviceScreenProps,
) => {
  useBackHandler();

  const {navigation} = props;

  const [translate] = useTranslation();

  const [
    devices,
    loading,
    handleScanDevice,
    handleStopScan,
    handleConnectToDevice,
    title,
    isVisible,
  ] = blueToothService.useBluetoothScan();

  const handleGoToSettingScreen = React.useCallback(async () => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeepAwake />
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={[shareStyles.textBold, styles.title]}>
              {translate('scan')}
            </Text>
            {loading && (
              <View style={[styles.flexRow]}>
                <Text style={[shareStyles.textRegular, styles.textSearch]}>
                  {'Đang tìm kiếm Bộ set địa chỉ '}
                </Text>
                <Spinner type="Wave" color={Colors.white} />
              </View>
            )}
          </View>
          <ScrollView
            style={[styles.flexGrow, styles.body]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            {devices.map((device: Device) => (
              <Pressable
                key={device.id}
                style={styles.blockDevice}
                onPress={() => {
                  handleConnectToDevice(device);
                }}>
                <Text style={(shareStyles.textBold, styles.deviceName)}>
                  {RD_SET_ADDRESS_DISPLAYNAME}
                </Text>
                <Text style={[shareStyles.textRegular, styles.deviceMac]}>
                  {device.id}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={[styles.flexRow, styles.footer]}>
            {loading ? (
              <CustomButton
                style={styles.button}
                label={translate('stop')}
                styleLabel={styles.label}
                onPress={handleStopScan}
              />
            ) : (
              <>
                <CustomButton
                  style={styles.button}
                  label={translate('search')}
                  styleLabel={styles.label}
                  onPress={handleScanDevice}
                />
                <CustomButton
                  style={styles.button}
                  label={translate('goBack')}
                  styleLabel={styles.label}
                  onPress={handleGoToSettingScreen}
                />
              </>
            )}
          </View>
        </SafeAreaView>
        <InfoModal
          isVisible={isVisible}
          body={title}
          icon={<BluetoothSearchIcon color={Colors.blue} />}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 16,
    color: Colors.blue,
  },
  blockDevice: {
    height: 54,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    justifyContent: 'center',
  },
  flexGrow: {
    marginTop: 20,
  },
  deviceName: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '700',
    marginLeft: 16,
  },
  deviceMac: {
    fontSize: 16,
    color: Colors.black,
    letterSpacing: 2,
    marginLeft: 16,
  },
  textSearch: {
    color: Colors.white,
    lineHeight: 28,
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    height: '10%',
  },
  body: {
    height: '80%',
  },
  header: {
    height: '10%',
  },
});

export default ScanDeviceScreen;
