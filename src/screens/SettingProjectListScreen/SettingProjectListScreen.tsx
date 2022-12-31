import {FlatList, StyleSheet, View} from 'react-native';
import type {FC} from 'react';
import React from 'react';
import DefaultLayout from 'src/components/DefaultLayout/DefaultLayout';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import Colors from 'src/styles/Colors';
import shareStyles from 'src/styles';
import TouchableBlock from 'src/components/TouchableBlock/TouchableBlock';
import ArrowRight from 'src/icons/ArrowRight';
import {projectService} from 'src/services/project-service';
import {numberOfLines} from 'src/helpers/string-helper';
import type {ProjectWithQuantity} from 'src/services/project-service/use-project-list';

interface SettingProjectListScreenProps extends NativeStackScreenProps<any> {}

const SettingProjectListScreen: FC<SettingProjectListScreenProps> = (
  props: SettingProjectListScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [listProject] = projectService.useProjectList();

  const handleGoToSettingScreen = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = React.useCallback(
    ({item}: {item: ProjectWithQuantity}) => {
      return (
        <TouchableBlock
          key={item.id}
          style={styles.block}
          label={numberOfLines(item.name, 30)}
          subLabel={`${item.numberOfUniverse} universe`}
          right={<ArrowRight color={Colors.blue} />}
        />
      );
    },
    [],
  );
  return (
    <DefaultLayout
      left={true}
      goBack={handleGoToSettingScreen}
      title={translate('projects')}
      headerColor={Colors.background}>
      <View style={shareStyles.defaultBackground}>
        <FlatList
          data={listProject}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 80,
    paddingHorizontal: 16,
  },
});

export default SettingProjectListScreen;
