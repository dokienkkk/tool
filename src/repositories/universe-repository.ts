import type {Project} from '../database/model';
import {Universe} from '../database/model';
import {databaseService} from '../database/services/database-service';
// import {v4} from 'uuid';

export class UniverseRepository {
  public list = async (project: Project): Promise<Universe[]> => {
    const dataSource = await databaseService.getDataSource();

    const universeRepository = dataSource.getRepository(Universe);

    const listuniverse = await universeRepository
      .createQueryBuilder('universe')
      .where('universe.projectId = :projectId', {projectId: project.id})
      .execute();

    return listuniverse;
  };

  public create = async (quantity: number): Promise<Universe[]> => {
    return [];
  };
}

export const universeRepository = new UniverseRepository();
