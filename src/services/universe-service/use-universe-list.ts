import {useNavigation} from '@react-navigation/native';
import React from 'react';
import type {Project, Universe} from '../../database/model';
import {useBoolean} from '../../hooks/use-boolean';
import {universeRepository} from '../../repositories/universe-repository';

export function useUniverseList(
  project: Project,
): [Universe[], () => void, boolean, () => void, () => void] {
  const navigation = useNavigation();

  const [list, setList] = React.useState([]);

  const [isVisible, , openModal, closeModal] = useBoolean(false);

  const getListUniverse = React.useCallback(async () => {
    const listUniverse = await universeRepository.list(project);
    setList(listUniverse);
  }, [project]);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getListUniverse();
    });
  }, [getListUniverse, navigation]);

  return [list, getListUniverse, isVisible, openModal, closeModal];
}
