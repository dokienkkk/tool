import {useNavigation} from '@react-navigation/native';
import React from 'react';
import type {Project} from '../../database/model';
import {projectRepository} from '../../repositories/project-repository';

export function useProjectList(): [Project[], () => Promise<void>] {
  const navigation = useNavigation();

  const [list, setList] = React.useState([]);

  const getListProject = React.useCallback(async () => {
    const listProject = await projectRepository.list();
    setList(listProject);
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getListProject();
    });
  }, [getListProject, navigation]);

  return [list, getListProject];
}
