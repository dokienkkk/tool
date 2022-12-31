import {useNavigation} from '@react-navigation/native';
import React from 'react';
import type {Project} from 'src/database/model/Project';
import {projectRepository} from 'src/repositories/project-repository';
import {universeRepository} from 'src/repositories/universe-repository';

export interface ProjectWithQuantity extends Project {
  numberOfUniverse: number;
}

export function useProjectList(): [ProjectWithQuantity[], () => Promise<void>] {
  const navigation = useNavigation();

  const [list, setList] = React.useState([]);

  const getListProject = React.useCallback(async () => {
    const listProject = await projectRepository.list();
    var result = await Promise.all(
      listProject.map(
        async (project: Project): Promise<ProjectWithQuantity> => {
          const listUniverse = await universeRepository.count(project);
          return {...project, numberOfUniverse: listUniverse};
        },
      ),
    );
    setList(result);
  }, []);

  React.useEffect(() => {
    // projectRepository.list().then((listPoject: Project[]) => {
    //   setList(listPoject);
    // });
    navigation.addListener('focus', () => {
      getListProject();
    });
  }, [getListProject, navigation]);

  return [list, getListProject];
}
