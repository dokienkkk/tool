import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ProjectDetailScreen from '../ProjectDetailScreen/ProjectDetailScreen';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import AddButton from '../../icons/AddButton';
import Colors from '../../styles/Colors';
import CustomModal from '../../components/CustomModal/CustomModal';
import shareStyles from '../../styles';
import TouchableBlock from '../../components/TouchableBlock/TouchableBlock';
import ProjectItemIcon from '../../icons/ProjectItemIcon';
import {numberOfLines} from '../../helpers/string-helper';
import {projectService} from '../../services/project-service';
import DMXIcon from '../../icons/DMXIcon';
import type {Project} from '../../database/model';
import {TABBAR_HEIGHT} from '../../config/tab-bar';

interface ProjectListScreenProps extends NativeStackScreenProps<any> {}

const ProjectListScreen: FC<ProjectListScreenProps> = (
  props: ProjectListScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

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
    (project: Project) => {
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
    ({item}: {item: Project}) => (
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
            contentContainerStyle={{paddingBottom: TABBAR_HEIGHT}}
          />
        ) : (
          <View style={[styles.center]}>
            <DMXIcon />
            <Text style={[shareStyles.textRegular, styles.none]}>
              {translate('project.none')}
            </Text>
          </View>
        )}
        <View style={styles.footer} />
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
    marginVertical: 12,
  },
  none: {
    fontSize: 20,
    color: Colors.gray,
    lineHeight: 20,
  },
  footer: {
    height: TABBAR_HEIGHT,
  },
});

export default ProjectListScreen;
