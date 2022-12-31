import {StyleSheet, Text, View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import Colors from 'src/styles/Colors';
import shareStyles from 'src/styles';
import {numberOfLines} from 'src/helpers/string-helper';
import LineBlock from 'src/components/LineBlock/LineBlock';
import {formatDate} from 'src/helpers/time-helper';
import CustomButton from 'src/components/CustomButton/CustomButton';
import CustomModal from 'src/components/CustomModal/CustomModal';
import {projectService} from 'src/services/project-service';

interface SettingProjectDetailScreenProps extends NativeStackScreenProps<any> {}

const SettingProjectDetailScreen: FC<SettingProjectDetailScreenProps> = (
  props: SettingProjectDetailScreenProps,
) => {
  const {navigation, route} = props;

  const {project} = route.params;

  const [translate] = useTranslation();

  const [isVisible, openModal, closeModal, handleDeleteProject] =
    projectService.useDeleteProject();

  const handleGoToSettingProjectListScreen = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <DefaultLayout
      left={true}
      goBack={handleGoToSettingProjectListScreen}
      title={numberOfLines(project?.name ?? translate('project'), 30)}
      headerColor={Colors.background}>
      <View style={[shareStyles.defaultBackground]}>
        <View style={styles.flexGrow}>
          <LineBlock
            left={translate('project.name')}
            right={numberOfLines(project?.name, 15)}
          />
          <LineBlock
            left={translate('universe.name')}
            right={`${project?.numberOfUniverse} universe`}
          />
          <LineBlock
            left={translate('project.date')}
            right={formatDate(project?.createAt)}
          />
        </View>
        <View style={styles.footer}>
          <CustomButton
            label={translate('project.export')}
            style={styles.exportButton}
            styleLabel={styles.colorWhite}
          />
          <CustomButton
            label={translate('project.delete')}
            style={styles.deleteButton}
            styleLabel={styles.colorWhite}
            onPress={openModal}
          />
        </View>
      </View>

      <CustomModal
        isVisible={isVisible}
        isConfirmDelete={true}
        onBackdropPress={closeModal}
        title={translate('action.delete.confirm')}
        labelPrimary={translate('action.delete')}
        labelSecondary={translate('action.cancel')}
        onPressSecondary={closeModal}
        onPressPrimary={() => {
          handleDeleteProject(project);
        }}>
        <View style={styles.body}>
          <Text style={[shareStyles.textRegular, styles.text]}>
            {translate('action.delete.project')}
          </Text>
        </View>
      </CustomModal>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
  },
  exportButton: {
    backgroundColor: Colors.blue,
  },
  flexGrow: {
    flexGrow: 1,
  },
  colorWhite: {
    color: Colors.white,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
  body: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black,
  },
});

export default SettingProjectDetailScreen;
