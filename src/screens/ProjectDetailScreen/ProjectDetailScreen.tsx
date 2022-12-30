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
import {WheelPicker} from 'react-native-wheel-picker-android';
import {quantityUniverse} from '../../config/universe';

const dataQuantity = [
  ...Array.from({length: quantityUniverse}, (_, i) => (i + 1).toString()),
];

interface ProjectDetailScreenProps extends NativeStackScreenProps<any> {}

const ProjectDetailScreen: FC<ProjectDetailScreenProps> = (
  props: ProjectDetailScreenProps,
) => {
  const {navigation, route} = props;

  const {project} = route.params ?? {};

  const [translate] = useTranslation();

  const [index, setIndex] = React.useState<number>(0);

  const [
    isVisible,
    openModal,
    closeModal,
    currentProject,
    handleChangeName,
    handleSaveProject,
  ] = projectService.useUpdateProject(project);

  const [
    listUniverse,
    ,
    isVisibleAdd,
    openModalAdd,
    closeModalAdd,
    handleCreateUniverses,
  ] = universeService.useUniverseList(project);

  const handleGoToUniverseSetAddressScreen = React.useCallback(() => {
    navigation.navigate(UniverseSetAddressScreen.name, {
      universe: {
        name: 'Universe 1',
      },
    });
  }, [navigation]);

  const handleCreateNewUniverses = React.useCallback(async () => {
    await handleCreateUniverses(Number(dataQuantity[index]));
    setIndex(0);
  }, [handleCreateUniverses, index]);

  const handleCloseModalAdd = React.useCallback(() => {
    setIndex(0);
    closeModalAdd();
  }, [closeModalAdd]);

  const renderItem = React.useCallback(
    ({item}: {item: Universe}) => (
      <View style={styles.block}>
        <TouchableBlock
          key={item.id}
          left={<UniverseIcon color={Colors.blue} />}
          label={item.name}
          style={shareStyles.boxShadow}
          onPress={handleGoToUniverseSetAddressScreen}
        />
      </View>
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
      <View style={[styles.container]}>
        <FlatList
          data={listUniverse.sort((universeA, universeB) => {
            return universeA.index - universeB.index;
          })}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <CustomModal
        isVisible={isVisibleAdd}
        title={translate('universe.add')}
        onBackdropPress={handleCloseModalAdd}
        labelPrimary={translate('action.add')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={handleCloseModalAdd}
        onPressPrimary={handleCreateNewUniverses}>
        <View style={styles.flexRow}>
          <View style={shareStyles.w50}>
            <Text style={[shareStyles.textBold, styles.text]}>
              {translate('universe.name')}
            </Text>
          </View>
          <View style={[shareStyles.w50, styles.wheelPicker]}>
            <WheelPicker
              data={dataQuantity}
              onItemSelected={setIndex}
              selectedItemTextFontFamily={'Quicksand-Bold'}
              itemTextFontFamily={'Quicksand-Regular'}
              isCyclic={true}
              selectedItemTextColor={Colors.blue}
              selectedItemTextSize={20}
              itemTextSize={14}
              hideIndicator={true}
            />
          </View>
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
    maxHeight: 180,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    borderColor: Colors.gray,
    borderBottomWidth: 0.5,
    height: 60,
    color: Colors.black,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.blue,
  },
  wheelPicker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    marginTop: 4,
    padding: 4,
  },
});

export default ProjectDetailScreen;
