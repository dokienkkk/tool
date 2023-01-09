import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import shareStyles from 'src/styles';
import Colors from 'src/styles/Colors';
import {useTranslation} from 'react-i18next';
import FolderIcon from 'src/icons/FolderIcon';
import type {DocumentPickerResponse} from 'react-native-document-picker';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from 'src/components/CustomButton/CustomButton';
import {showError, showSuccess, showWarning} from 'src/helpers/toast-helper';
import InfoModal from 'src/components/InfoModal/InfoModal';
import Spinner from 'react-native-spinkit';
import RNFS from 'react-native-fs';
import type {ProjectData} from 'src/types/data';
import {isProjectData} from 'src/helpers/instanceOf';
import {fileService} from 'src/services/file-service';

interface ImportFileScreenProps extends NativeStackScreenProps<any> {}

const ImportFileScreen: FC<ImportFileScreenProps> = (
  props: ImportFileScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [fileResponse, setFileResponse] =
    React.useState<DocumentPickerResponse>();

  const [loading, setLoading] = React.useState(false);

  const handleSelectFile = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      // console.warn(err);
    }
  }, []);

  const handleImportFile = React.useCallback(async () => {
    if (!fileResponse) {
      showWarning(translate('import.nofile'));
      return;
    }

    const extFile = fileResponse?.name.split('.');

    if (extFile.length > 0) {
      const extFileValue = extFile.pop();

      if (extFileValue !== 'json') {
        showError('File import không đúng định dạng');
        return;
      }
    }

    const content = await RNFS.readFile(fileResponse.uri);

    const data: ProjectData = JSON.parse(content);

    if (!isProjectData(data)) {
      showError('Dữ liệu không đúng định dạng');
      return;
    }
    setLoading(true);

    await fileService.importFile(data);

    setLoading(false);

    showSuccess('Import file dự án thành công');

    navigation.goBack();
  }, [fileResponse, navigation, translate]);

  return (
    <DefaultLayout
      left={true}
      goBack={navigation.goBack}
      title={'Import file dự án'}>
      <View style={shareStyles.defaultBackground}>
        <TouchableOpacity style={styles.row} onPress={handleSelectFile}>
          <FolderIcon color={Colors.blue} />
          <Text style={[shareStyles.textRegular, styles.text]}>
            {translate('import.select')}
          </Text>
        </TouchableOpacity>

        <View style={styles.body}>
          {fileResponse && (
            <View style={styles.block}>
              <Text>{fileResponse.name}</Text>
            </View>
          )}
        </View>
        <View>
          <CustomButton
            label="Import"
            style={styles.button}
            styleLabel={styles.label}
            onPress={handleImportFile}
          />
        </View>
      </View>

      <InfoModal
        isVisible={loading}
        icon={<Spinner type="9CubeGrid" color={Colors.blue} />}
        body={'Đang import file dự án'}
      />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.blue,
    fontSize: 16,
    marginLeft: 12,
  },
  block: {
    mimheight: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  body: {
    flexGrow: 1,
  },
  button: {
    height: 48,
    backgroundColor: Colors.blue,
    borderRadius: 20,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default ImportFileScreen;
