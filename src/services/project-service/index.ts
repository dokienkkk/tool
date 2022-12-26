import {useNewProject} from './use-new-project';
import {useProjectList} from './use-project-list';

export class ProjectService {
  public readonly useProjectList = useProjectList;

  public readonly useNewProject = useNewProject;
}

export const projectService = new ProjectService();
