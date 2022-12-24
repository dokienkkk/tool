import {View} from 'react-native';
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

interface ProjectDetailScreenProps extends NativeStackScreenProps<any> {}

const ProjectDetailScreen: FC<ProjectDetailScreenProps> = (
  props: ProjectDetailScreenProps,
) => {
  const {navigation, route} = props;

  const {project} = route.params ?? {};

  const [translate] = useTranslation();

  return (
    <DefaultLayout
      left={true}
      title={numberOfLines(project?.name ?? translate('project.info'), 20)}
      goBack={navigation.goBack}
      right={<AddButton />}>
      <View style={shareStyles.defaultBackground}>
        <TouchableBlock
          left={<UniverseIcon color={Colors.blue} />}
          label={'Universe 1'}
          style={shareStyles.boxShadow}
        />
      </View>
    </DefaultLayout>
  );
};

export default ProjectDetailScreen;
