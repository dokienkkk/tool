import {StyleSheet, Text, View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {numberOfLines} from '../../helpers/string-helper';
import AddButton from '../../icons/AddButton';
import TouchableBlock from '../../components/TouchableBlock/TouchableBlock';
import UniverseIcon from '../../icons/UniverseIcon';
import Colors from '../../styles/Colors';
import shareStyles from '../../styles';
import CustomModal from '../../components/CustomModal/CustomModal';
import {useBoolean} from '../../hooks/use-boolean';
import UniverseSetAddressScreen from '../UniverseSetAddressScreen/UniverseSetAddressScreen';

interface ProjectDetailScreenProps extends NativeStackScreenProps<any> {}

const ProjectDetailScreen: FC<ProjectDetailScreenProps> = (
  props: ProjectDetailScreenProps,
) => {
  const {navigation, route} = props;

  const {project} = route.params ?? {};

  const [translate] = useTranslation();

  const [isVisile, , openModal, closeModal] = useBoolean(false);

  const handleGoToUniverseSetAddressScreen = React.useCallback(() => {
    navigation.navigate(UniverseSetAddressScreen.name, {
      universe: {
        name: 'Universe 1',
      },
    });
  }, [navigation]);

  return (
    <DefaultLayout
      left={true}
      title={numberOfLines(project?.name ?? translate('project.info'), 20)}
      goBack={navigation.goBack}
      right={<AddButton />}
      onPressIconRight={openModal}>
      <View style={shareStyles.defaultBackground}>
        <TouchableBlock
          left={<UniverseIcon color={Colors.blue} />}
          label={'Universe 1'}
          style={shareStyles.boxShadow}
          onPress={handleGoToUniverseSetAddressScreen}
        />
      </View>

      <CustomModal
        isVisible={isVisile}
        title={translate('universe.add')}
        onBackdropPress={closeModal}
        labelPrimary={translate('action.add')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModal}
        onPressPrimary={() => {}}>
        <View style={styles.flexRow}>
          <Text>{translate('quantity')}</Text>
        </View>
      </CustomModal>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProjectDetailScreen;
