import {Project} from 'src/database/model/Project';
import {databaseService} from 'src/database/services/database-service';
import {v4} from 'uuid';

export class ProjectRepository {
  public list = async (): Promise<Project[]> => {
    const dataSource = await databaseService.getDataSource();

    if (dataSource.isInitialized) {
      const projectRepository = dataSource.getRepository(Project);

      const listProject = await projectRepository.find();

      return listProject;
    }

    return [];
  };

  public create = async (name: string): Promise<Project> => {
    const dataSource = await databaseService.getDataSource();

    const projectRepository = dataSource.getRepository(Project);

    const existProject = await projectRepository.findOneBy({
      name,
    });

    if (existProject) {
      return Promise.reject({name});
    }

    const newProject = new Project();
    newProject.id = v4();
    newProject.name = name;
    newProject.createAt = new Date();

    await projectRepository.save(newProject);

    return newProject;
  };

  public update = async (
    projectId: string,
    update: Partial<Project>,
  ): Promise<void> => {
    const dataSource = await databaseService.getDataSource();

    const projectRepository = dataSource.getRepository(Project);

    let updateProject = await projectRepository.findOneBy({id: projectId});

    updateProject = {...updateProject, ...update};

    const {name} = updateProject;

    const existProject = await projectRepository.findOneBy({
      name,
    });

    if (existProject) {
      return Promise.reject({name});
    }

    await projectRepository.save(updateProject);
  };

  public remove = async (projectId: string): Promise<void> => {
    const dataSource = await databaseService.getDataSource();

    const projectRepository = dataSource.getRepository(Project);

    let project = await projectRepository.findOneBy({id: projectId});

    await projectRepository.remove(project);
  };
}

export const projectRepository = new ProjectRepository();
