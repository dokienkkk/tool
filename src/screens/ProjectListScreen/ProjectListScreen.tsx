import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ProjectDetailScreen from '../ProjectDetailScreen/ProjectDetailScreen';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import AddButton from '../../icons/AddButton';
import Colors from '../../styles/Colors';
import CustomModal from '../../components/CustomModal/CustomModal';
import {useBoolean} from '../../hooks/use-boolean';
import shareStyles from '../../styles';

interface ProjectListScreenProps extends NativeStackScreenProps<any> {}

const ProjectList: FC<ProjectListScreenProps> = (
  props: ProjectListScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [isVisile, , openModal, closeModal] = useBoolean(false);

  const handleGoToProjectDetailScreen = React.useCallback(() => {
    navigation.navigate(ProjectDetailScreen.name);
  }, [navigation]);

  const handleAddProject = React.useCallback(() => {}, []);

  return (
    <DefaultLayout
      title={translate('projects')}
      right={<AddButton color={Colors.white} />}
      onPressIconRight={openModal}>
      <View style={styles.container}>
        <Text style={styles.text}>{translate('projects')}</Text>
        <Pressable onPress={handleGoToProjectDetailScreen}>
          <Text style={styles.text}>Go to detail</Text>
        </Pressable>
      </View>

      <CustomModal
        isVisible={isVisile}
        title={translate('project.name')}
        onBackdropPress={closeModal}
        labelPrimary={translate('action.confirm')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModal}
        onPressPrimary={handleAddProject}>
        <TextInput
          style={[styles.input, shareStyles.w100, shareStyles.textRegular]}
          placeholder={translate('project.enterName')}
        />
      </CustomModal>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    textAlign: 'center',
  },
  input: {
    borderColor: Colors.gray,
    borderBottomWidth: 0.5,
    height: 60,
    color: Colors.black,
  },
});

export default ProjectList;
