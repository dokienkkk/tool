import {Project} from '../database/model';
import {databaseService} from '../database/services/database-service';
import {v4} from 'uuid';

export class ProjectRepository {
  public list = async (): Promise<Project[]> => {
    const projectRepository = databaseService
      .getDataSource()
      .getRepository(Project);

    const listProject = await projectRepository.find();

    return listProject;
  };

  public create = async (name: string): Promise<Project> => {
    const projectRepository = databaseService
      .getDataSource()
      .getRepository(Project);

    const newProject = new Project();
    newProject.id = v4();
    newProject.name = name;
    newProject.createAt = new Date();

    await projectRepository.save(newProject);

    return newProject;
  };
}

export const projectRepository = new ProjectRepository();
