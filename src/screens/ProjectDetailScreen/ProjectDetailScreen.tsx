import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
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
import UniverseSetAddressScreen from '../UniverseSetAddressScreen/UniverseSetAddressScreen';
import {projectService} from '../../services/project-service';
import {universeService} from '../../services/universe-service';
import type {Universe} from '../../database/model';

interface ProjectDetailScreenProps extends NativeStackScreenProps<any> {}

const ProjectDetailScreen: FC<ProjectDetailScreenProps> = (
  props: ProjectDetailScreenProps,
) => {
  const {navigation, route} = props;

  const {project} = route.params ?? {};

  const [translate] = useTranslation();

  const [
    isVisible,
    openModal,
    closeModal,
    currentProject,
    handleChangeName,
    handleSaveProject,
  ] = projectService.useUpdateProject(project);

  const [listUniverse, , isVisibleAdd, openModalAdd, closeModalAdd] =
    universeService.useUniverseList(project);

  const handleGoToUniverseSetAddressScreen = React.useCallback(() => {
    navigation.navigate(UniverseSetAddressScreen.name, {
      universe: {
        name: 'Universe 1',
      },
    });
  }, [navigation]);

  const renderItem = React.useCallback(
    ({item}: {item: Universe}) => (
      <TouchableBlock
        key={item.id}
        left={<UniverseIcon color={Colors.blue} />}
        label={item.name}
        style={shareStyles.boxShadow}
        onPress={handleGoToUniverseSetAddressScreen}
      />
    ),
    [handleGoToUniverseSetAddressScreen],
  );

  return (
    <DefaultLayout
      left={true}
      title={numberOfLines(
        currentProject?.name ?? translate('project.info'),
        20,
      )}
      edit={true}
      onEdit={openModal}
      goBack={navigation.goBack}
      right={<AddButton />}
      onPressIconRight={openModalAdd}>
      <View style={shareStyles.defaultBackground}>
        <FlatList
          data={listUniverse}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <CustomModal
        isVisible={isVisibleAdd}
        title={translate('universe.add')}
        onBackdropPress={closeModalAdd}
        labelPrimary={translate('action.add')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModalAdd}
        onPressPrimary={() => {}}>
        <View style={styles.flexRow}>
          <Text style={shareStyles.textBold}>{translate('quantity')}</Text>
          <TextInput
            style={[styles.input, shareStyles.w100, shareStyles.textRegular]}
            placeholder={translate('universe.enterQuantity')}
            value={'1'}
            onChangeText={handleChangeName}
          />
        </View>
      </CustomModal>

      <CustomModal
        isVisible={isVisible}
        title={translate('project.update.name')}
        onBackdropPress={closeModal}
        labelPrimary={translate('action.confirm')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModal}
        onPressPrimary={handleSaveProject}>
        <TextInput
          style={[styles.input, shareStyles.w100, shareStyles.textRegular]}
          placeholder={translate('project.enterName')}
          value={currentProject?.name}
          onChangeText={handleChangeName}
        />
      </CustomModal>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.gray,
    borderBottomWidth: 0.5,
    height: 60,
    color: Colors.black,
  },
});

export default ProjectDetailScreen;
