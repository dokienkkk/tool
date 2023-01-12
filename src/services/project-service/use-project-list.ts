import React from 'react';
import {projectRepository} from 'src/repositories/project-repository';
import {universeRepository} from 'src/repositories/universe-repository';
import type {Project} from 'src/types/project';

export interface ProjectWithQuantity extends Project {
  numberOfUniverse: number;
}

export function useProjectList(): [ProjectWithQuantity[], () => Promise<void>] {
  const [list, setList] = React.useState<ProjectWithQuantity[]>([]);

  const getListProject = React.useCallback(async () => {
    const listProject = await projectRepository.list();
    var result = await Promise.all(
      listProject.map(
        async (project: Project): Promise<ProjectWithQuantity> => {
          const listUniverse = await universeRepository.count(project.id);
          return {...project, numberOfUniverse: listUniverse};
        },
      ),
    );
    setList(result);
  }, []);

  React.useEffect(() => {
    getListProject();
  }, [getListProject]);

  return [list, getListProject];
}
