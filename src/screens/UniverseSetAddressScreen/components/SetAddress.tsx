import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import LineBlock from 'src/components/LineBlock/LineBlock';
import shareStyles from 'src/styles';
import Colors from 'src/styles/Colors';
import CustomButton from 'src/components/CustomButton/CustomButton';
import {showWarning} from 'src/helpers/toast-helper';
import {UNIVERSE_ADDRESS} from 'src/config/set-address';

interface SetAddressProps {}

const SetAddress: FC<SetAddressProps> = () => {
  const [address, setAddress] = React.useState('1');

  const changeAddress = React.useCallback(
    (type: 'increase' | 'decrease') => {
      let numAddress = Number(address);

      if (isNaN(numAddress)) {
        return;
      }

      if (type === 'increase') {
        numAddress++;
        if (numAddress > UNIVERSE_ADDRESS.MAX) {
          showWarning(`Có tối đa ${UNIVERSE_ADDRESS.MAX} địa chỉ`);
          return;
        }
        setAddress(numAddress.toString());
      } else if (type === 'decrease') {
        numAddress--;
        if (numAddress === UNIVERSE_ADDRESS.MIN) {
          return;
        }
        setAddress(numAddress.toString());
      }
    },
    [address],
  );

  return (
    <View style={styles.container}>
      <View style={styles.flexGrow}>
        <LineBlock left="Loại đèn" right="Đèn RGB" />

        <LineBlock
          left="STT đèn"
          right={
            <View style={styles.widthInput}>
              <TextInput
                keyboardType="numeric"
                placeholder="Nhập STT"
                value="01"
                maxLength={4}
                multiline={false}
                style={[
                  shareStyles.textRegular,
                  styles.labelAddress,
                  shareStyles.w100,
                  styles.textRight,
                ]}
              />
            </View>
          }
        />
        <View>
          <Text style={[shareStyles.textBold, styles.sectionLabel]}>
            Địa chỉ
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => changeAddress('decrease')}>
              <Text style={styles.touchableIcon}>-</Text>
            </TouchableOpacity>
            <View style={styles.containerAddress}>
              <View style={shareStyles.w100}>
                <TextInput
                  keyboardType="numeric"
                  style={[
                    shareStyles.textRegular,
                    styles.labelAddress,
                    shareStyles.w100,
                    styles.textCenter,
                  ]}
                  onChangeText={setAddress}
                  value={address}
                  maxLength={3}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => changeAddress('increase')}>
              <Text style={styles.touchableIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          label="Set"
          style={styles.button}
          styleLabel={[shareStyles.textBold, styles.label]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  flexGrow: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: Colors.blue,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 16,
  },
  sectionLabel: {
    fontSize: 16,
    color: Colors.blue,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchable: {
    height: 40,
    width: '30%',
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  touchableIcon: {
    fontSize: 20,
    color: Colors.white,
    lineHeight: 20,
  },
  containerAddress: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 40,
    marginHorizontal: 10,
  },
  labelAddress: {
    fontSize: 16,
    color: Colors.black,
  },
  widthInput: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default SetAddress;
