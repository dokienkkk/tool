import {useNewProject} from './use-new-project';
import {useProjectList} from './use-project-list';
import {useUpdateProject} from './use-update-project';

export class ProjectService {
  public readonly useProjectList = useProjectList;

  public readonly useNewProject = useNewProject;

  public readonly useUpdateProject = useUpdateProject;
}

export const projectService = new ProjectService();
