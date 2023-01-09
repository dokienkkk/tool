import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import Modal from 'react-native-modal';
import Colors from 'src/styles/Colors';
import shareStyles from 'src/styles';
import CustomButton from '../CustomButton/CustomButton';

interface InfoModalProps {
  isVisible: boolean;

  onBackdropPress?: () => void;

  icon?: ReactElement;

  body?: string;

  button?: string;

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
}

const InfoModal: FC<PropsWithChildren<InfoModalProps>> = (
  props: InfoModalProps,
) => {
  const {isVisible, onBackdropPress, icon, body, button, onPress, style} =
    props;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="pulse"
      animationOut="bounceOut">
      <View style={styles.container}>
        <View style={[styles.modal, StyleSheet.flatten(style)]}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <View style={styles.body}>
            <Text style={[shareStyles.textRegular, styles.text]}>{body}</Text>
          </View>
          {button && (
            <CustomButton
              onPress={onPress}
              label={button}
              style={styles.button}
              styleLabel={styles.label}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    height: 200,
    paddingVertical: 20,
  },
  icon: {},
  body: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: Colors.blue,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    width: '40%',
    height: 42,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 16,
  },
});

export default InfoModal;
