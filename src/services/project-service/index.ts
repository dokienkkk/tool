import {useDeleteProject} from 'src/services/project-service/use-delete-project';
import {useNewProject} from 'src/services/project-service/use-new-project';
import {useProjectList} from 'src/services/project-service/use-project-list';
import {useUpdateProject} from 'src/services/project-service/use-update-project';

export class ProjectService {
  public readonly useProjectList = useProjectList;

  public readonly useNewProject = useNewProject;

  public readonly useUpdateProject = useUpdateProject;

  public readonly useDeleteProject = useDeleteProject;
}

export const projectService = new ProjectService();
