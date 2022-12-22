import {View, Text} from 'react-native';
import React, {FC, PropsWithChildren} from 'react';

interface CustomModalProps {}

const CustomModal: FC<PropsWithChildren<CustomModalProps>> = () => {
  return (
    <View>
      <Text>CustomModal</Text>
    </View>
  );
};

export default CustomModal;
