import {Text, StyleSheet, StatusBar, View} from 'react-native';
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

interface ScanDeviceScreenProps extends NativeStackScreenProps<any> {}

const ScanDeviceScreen: FC<ScanDeviceScreenProps> = (
  props: ScanDeviceScreenProps,
) => {
  useBackHandler();

  const {navigation} = props;

  const handleGoToSettingScreen = React.useCallback(() => {
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
          <Text style={[shareStyles.textBold, styles.title]}>
            Quét thiết bị
          </Text>
          <View style={styles.footer}>
            <CustomButton
              style={styles.button}
              label="Tìm kiếm"
              styleLabel={styles.label}
            />
            <CustomButton
              style={styles.button}
              label="Quay lại"
              styleLabel={styles.label}
              onPress={handleGoToSettingScreen}
            />
          </View>
        </SafeAreaView>
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
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 20,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 16,
    color: Colors.blue,
  },
});

export default ScanDeviceScreen;
