import {View, Text, StyleSheet} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import {globalState} from 'src/app/global-state';
import type {BleError, Device} from 'react-native-ble-plx';
import {STATUS} from 'src/types/status';
import shareStyles from 'src/styles';
import Colors from 'src/styles/Colors';
import LineBlock from 'src/components/LineBlock/LineBlock';

interface DeviceInfoProps {}

const DeviceInfo: FC<DeviceInfoProps> = () => {
  const [connectedDevice] = globalState.useConnectedDevice();

  const [status] = globalState.useBluetoothStatus();

  React.useEffect(() => {
    const subscribe = connectedDevice?.onDisconnected(
      async (error: BleError, device: Device) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log('Error when subscrible onDisconnected: ', error);
        }
        if (device && device.id === connectedDevice?.id) {
          await globalState.setBluetoothStatus(STATUS.DISCONNECTED);
        }
      },
    );
    return function cleanup() {
      subscribe?.remove();
    };
  }, [connectedDevice]);

  return (
    <View style={styles.container}>
      {connectedDevice ? (
        <View style={[styles.center, styles.flexStart]}>
          <Text style={[shareStyles.textBold, styles.header]}>
            Thông tin thiết bị
          </Text>
          <LineBlock
            left="Tên"
            right={
              connectedDevice?.localName ??
              connectedDevice?.name ??
              'Chưa đặt tên'
            }
          />
          <LineBlock left="MAC" right={connectedDevice?.id} />
          <LineBlock
            left="Trạng thái"
            right={
              status === STATUS.CONNECTED ? (
                <Text style={[shareStyles.textRegular, styles.connect]}>
                  Đã kết nối
                </Text>
              ) : (
                <Text style={[shareStyles.textRegular, styles.disconnect]}>
                  Mất kết nối
                </Text>
              )
            }
          />
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={[shareStyles.textRegular]}>
            Chưa kết nối với thiết bị
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexStart: {
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  header: {
    color: Colors.blue,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  connect: {
    color: Colors.green,
    fontSize: 16,
  },
  disconnect: {
    color: Colors.danger,
    fontSize: 16,
  },
});

export default DeviceInfo;
