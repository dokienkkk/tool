import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ProjectDetailScreen from '../ProjectDetailScreen/ProjectDetailScreen';
interface ProjectListScreenProps extends NativeStackScreenProps<any> {}
const ProjectList: FC<ProjectListScreenProps> = (
  props: ProjectListScreenProps,
) => {
  const {navigation} = props;

  const [translate] = useTranslation();

  const handleGoToProjectDetailScreen = React.useCallback(() => {
    navigation.navigate(ProjectDetailScreen.name);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('project')}</Text>
      <Pressable onPress={handleGoToProjectDetailScreen}>
        <Text style={styles.text}>Go to detail</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default ProjectList;
