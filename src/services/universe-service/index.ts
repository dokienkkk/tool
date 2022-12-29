import {useUniverseList} from './use-universe-list';

export class UniverseService {
  public useUniverseList = useUniverseList;
}

export const universeService = new UniverseService();
