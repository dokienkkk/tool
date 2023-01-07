import {StyleSheet, View, Text} from 'react-native';
import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import Modal from 'react-native-modal';
import Colors from 'src/styles/Colors';
import shareStyles from 'src/styles';

interface InfoModalProps {
  isVisible: boolean;

  onBackdropPress?: () => void;

  icon?: ReactElement;

  body?: string;

  button?: string;

  onPress?: () => void;
}

const InfoModal: FC<PropsWithChildren<InfoModalProps>> = (
  props: InfoModalProps,
) => {
  const {isVisible, onBackdropPress, icon, body} = props;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="pulse"
      animationOut="bounceOut">
      <View style={styles.container}>
        <View style={styles.modal}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <View style={styles.body}>
            <Text style={[shareStyles.textRegular, styles.text]}>{body}</Text>
          </View>
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
    paddingVertical: 40,
  },
  icon: {},
  body: {},
  text: {
    fontSize: 16,
    color: Colors.blue,
    textAlign: 'center',
  },
});

export default InfoModal;
