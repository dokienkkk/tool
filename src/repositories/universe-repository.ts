import type {Project} from '../database/model';
import {Universe} from '../database/model';
import {databaseService} from '../database/services/database-service';
import {v4} from 'uuid';

export class UniverseRepository {
  public list = async (project: Project): Promise<Universe[]> => {
    const dataSource = await databaseService.getDataSource();

    const universeRepository = dataSource.getRepository(Universe);

    const listUniverse = await universeRepository.findBy({
      projectId: project.id,
    });

    return listUniverse;
  };

  public create = async (
    project: Project,
    index: number,
  ): Promise<Universe> => {
    const dataSource = await databaseService.getDataSource();

    const universeRepository = dataSource.getRepository(Universe);

    const existUniverse = await universeRepository.findOneBy({
      projectId: project.id,
      index,
    });

    if (existUniverse) {
      return Promise.reject({index});
    }

    const newUniverse = new Universe();
    newUniverse.id = v4();
    newUniverse.name = `Universe ${index}`;
    newUniverse.projectId = project.id;
    newUniverse.index = index;
    newUniverse.createAt = new Date();

    await universeRepository.save(newUniverse);

    return newUniverse;
  };
}

export const universeRepository = new UniverseRepository();
