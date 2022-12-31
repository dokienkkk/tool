import React from 'react';
import type {Project} from 'src/database/model/Project';
import {projectRepository} from 'src/repositories/project-repository';

export function useProjectList(): [Project[], () => Promise<void>] {
  const [list, setList] = React.useState([]);

  const getListProject = React.useCallback(async () => {
    const listProject = await projectRepository.list();
    setList(listProject);
  }, []);

  React.useEffect(() => {
    projectRepository.list().then((listPoject: Project[]) => {
      setList(listPoject);
    });
  }, []);

  return [list, getListProject];
}
