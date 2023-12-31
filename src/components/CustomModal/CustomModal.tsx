import {StyleSheet, View, Text} from 'react-native';
import type {FC, PropsWithChildren} from 'react';
import React from 'react';
import Modal from 'react-native-modal';
import Colors from '../../styles/Colors';
import CustomButton from '../CustomButton/CustomButton';
import shareStyles from '../../styles';

interface CustomModalProps {
  isVisible: boolean;

  onBackdropPress?: () => void;

  title: string;

  labelPrimary?: string;

  labelSecondary?: string;

  onPressPrimary?: () => void;

  onPressSecondary?: () => void;

  isConfirmDelete?: boolean;
}

const CustomModal: FC<PropsWithChildren<CustomModalProps>> = (
  props: PropsWithChildren<CustomModalProps>,
) => {
  const {
    children,
    isVisible,
    onBackdropPress,
    title,
    labelPrimary,
    labelSecondary,
    onPressPrimary,
    onPressSecondary,
    isConfirmDelete,
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationIn="pulse"
      animationOut="bounceOut">
      <View style={styles.container}>
        <View style={styles.modal}>
          <View
            style={[
              styles.header,
              shareStyles.w100,
              {backgroundColor: isConfirmDelete ? Colors.danger : Colors.blue},
            ]}>
            <Text style={[shareStyles.textBold, styles.title]}>{title}</Text>
          </View>
          <View style={[shareStyles.w100, styles.body]}>{children}</View>
          <View style={styles.footer}>
            <View style={shareStyles.w50}>
              {isConfirmDelete ? (
                <CustomButton
                  label={labelSecondary}
                  onPress={onPressSecondary}
                  styleLabel={[{color: Colors.blue}, styles.fontSize16]}
                />
              ) : (
                <CustomButton
                  label={labelSecondary}
                  onPress={onPressSecondary}
                  isDangerColor={true}
                />
              )}
            </View>
            <View style={shareStyles.w50}>
              {isConfirmDelete ? (
                <CustomButton
                  label={labelPrimary}
                  onPress={onPressPrimary}
                  styleLabel={[{color: Colors.danger}, styles.fontSize16]}
                />
              ) : (
                <CustomButton
                  label={labelPrimary}
                  onPress={onPressPrimary}
                  style={[{backgroundColor: Colors.blue}]}
                  styleLabel={[{color: Colors.white}]}
                />
              )}
            </View>
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
  },
  header: {
    backgroundColor: Colors.blue,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 20,
  },
  body: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  cancel: {
    borderColor: Colors.danger,
    borderWidth: 0.5,
  },
  fontSize16: {
    fontSize: 16,
  },
});

export default CustomModal;
