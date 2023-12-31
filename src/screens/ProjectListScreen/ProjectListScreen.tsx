import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ProjectDetailScreen from 'src/screens/ProjectDetailScreen/ProjectDetailScreen';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import AddButton from 'src/icons/AddButton';
import Colors from 'src/styles/Colors';
import CustomModal from 'src/components/CustomModal/CustomModal';
import shareStyles from 'src/styles';
import TouchableBlock from 'src/components/TouchableBlock/TouchableBlock';
import ProjectItemIcon from 'src/icons/ProjectItemIcon';
import {numberOfLines} from 'src/helpers/string-helper';
import {projectService} from 'src/services/project-service';
import DMXIcon from 'src/icons/DMXIcon';
import {bluetoothPermissionSevice} from 'src/services/bluetooth-permission-service';
import type {ProjectWithQuantity} from 'src/services/project-service/use-project-list';

interface ProjectListScreenProps extends NativeStackScreenProps<any> {}

const ProjectListScreen: FC<ProjectListScreenProps> = (
  props: ProjectListScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  bluetoothPermissionSevice.usePermission();

  const [listProject, getListProject] = projectService.useProjectList();

  const [
    isVisible,
    openModal,
    closeModal,
    name,
    handleChangeName,
    handleCreateNewProject,
  ] = projectService.useNewProject();

  const handleGoToProjectDetailScreen = React.useCallback(
    (project: ProjectWithQuantity) => {
      navigation.navigate(ProjectDetailScreen.name, {
        project,
      });
    },
    [navigation],
  );

  const handleCreateProject = React.useCallback(async () => {
    await handleCreateNewProject();
    await getListProject();
  }, [getListProject, handleCreateNewProject]);

  const renderItem = React.useCallback(
    ({item}: {item: ProjectWithQuantity}) => (
      <TouchableBlock
        left={<ProjectItemIcon color={Colors.blue} />}
        label={numberOfLines(item?.name, 30)}
        onPress={() => handleGoToProjectDetailScreen(item)}
        style={styles.item}
      />
    ),
    [handleGoToProjectDetailScreen],
  );

  return (
    <DefaultLayout
      title={translate('projects')}
      right={<AddButton color={Colors.white} />}
      onPressIconRight={openModal}>
      <View style={styles.container}>
        {listProject?.length > 0 ? (
          <FlatList
            data={listProject}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.footer}
          />
        ) : (
          <View style={[styles.center]}>
            <DMXIcon />
            <Text style={[shareStyles.textRegular, styles.none]}>
              {translate('project.none')}
            </Text>
          </View>
        )}
      </View>

      <CustomModal
        isVisible={isVisible}
        title={translate('project.name')}
        onBackdropPress={closeModal}
        labelPrimary={translate('action.confirm')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModal}
        onPressPrimary={handleCreateProject}>
        <TextInput
          style={[styles.input, shareStyles.w100, shareStyles.textRegular]}
          placeholder={translate('project.enterName')}
          value={name}
          onChangeText={handleChangeName}
        />
      </CustomModal>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50%',
  },
  input: {
    borderColor: Colors.gray,
    borderBottomWidth: 0.5,
    height: 60,
    color: Colors.black,
  },
  item: {
    height: 66,
    borderColor: Colors.blue,
    borderWidth: 1,
    marginTop: 12,
  },
  none: {
    fontSize: 20,
    color: Colors.gray,
    lineHeight: 20,
  },
  footer: {
    paddingBottom: 16,
  },
});

export default ProjectListScreen;
