import {Platform, StyleSheet, Text, View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import Colors from 'src/styles/Colors';
import shareStyles from 'src/styles';
import {numberOfLines} from 'src/helpers/string-helper';
import LineBlock from 'src/components/LineBlock/LineBlock';
import {formatDate, genNameFileExport} from 'src/helpers/time-helper';
import CustomButton from 'src/components/CustomButton/CustomButton';
import CustomModal from 'src/components/CustomModal/CustomModal';
import {projectService} from 'src/services/project-service';
import {exportPermissionSevice} from 'src/services/export-permission-service';
import RNFS from 'react-native-fs';
import {addressRepository} from 'src/repositories/address-repository';
import InfoModal from 'src/components/InfoModal/InfoModal';
import SuccessIcon from 'src/icons/SuccessIcon';
import {showError, showWarning} from 'src/helpers/toast-helper';
import {obj2xml} from 'src/helpers/xml-helper';

interface SettingProjectDetailScreenProps extends NativeStackScreenProps<any> {}

const SettingProjectDetailScreen: FC<SettingProjectDetailScreenProps> = (
  props: SettingProjectDetailScreenProps,
) => {
  const {navigation, route} = props;

  const {project} = route.params;

  const [translate] = useTranslation();

  const [isVisible, openModal, closeModal, handleDeleteProject] =
    projectService.useDeleteProject();

  const [isVisibleSuccess, setVisibleSuccess] = React.useState(false);

  const [body, setBody] = React.useState('');

  const handleGoToSettingProjectListScreen = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleExportFile = React.useCallback(async () => {
    const status = await exportPermissionSevice.requestPermission();
    if (status === 'blocked') {
      showWarning(
        'Vui lòng cấp quyền cho ứng dụng truy cập bộ nhớ để sử dụng chức năng này',
      );
      return;
    }
    if (status !== 'granted') {
      return;
    }

    const data = await addressRepository.get(project);

    if (!data) {
      showWarning('Không có dữ liệu');
      return;
    }

    const xml = obj2xml(data);

    if (Platform.OS === 'android') {
      const pathFile =
        RNFS.DownloadDirectoryPath +
        `/dmx_${genNameFileExport(new Date())}.xml`;

      RNFS.writeFile(pathFile, xml, 'utf8')
        .then(() => {
          setBody(
            `Thông tin của dự án ${project.name} đã được lưu trong ${pathFile}`,
          );
          setVisibleSuccess(true);
        })
        .catch(err => {
          showError('Lỗi');
          // eslint-disable-next-line no-console
          console.log('Error: ' + err.message);
        });
    }
  }, [project]);

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
            onPress={handleExportFile}
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

      <InfoModal
        isVisible={isVisibleSuccess}
        icon={<SuccessIcon />}
        body={body}
        button={translate('action.continue')}
        onPress={navigation.goBack}
        style={styles.modal}
      />
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
  modal: {
    minHeight: 210,
  },
});

export default SettingProjectDetailScreen;
