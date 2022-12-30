import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import type {Project, Universe} from '../../database/model';
import {showSuccess, showWarning} from '../../helpers/toast-helper';
import {useBoolean} from '../../hooks/use-boolean';
import {universeRepository} from '../../repositories/universe-repository';

export function useUniverseList(
  project: Project,
): [
  Universe[],
  () => void,
  boolean,
  () => void,
  () => void,
  (index: number) => Promise<void>,
] {
  const navigation = useNavigation();

  const [translate] = useTranslation();

  const [list, setList] = React.useState([]);

  const [isVisible, , openModal, closeModal] = useBoolean(false);

  const getListUniverse = React.useCallback(async () => {
    const listUniverse = await universeRepository.list(project);
    setList(listUniverse);
  }, [project]);

  const handleCreateUniverse = React.useCallback(
    async (index: number) => {
      try {
        await universeRepository.create(project, index);
      } catch (error) {
        if (error?.index && typeof error?.index === 'number') {
          showWarning(translate('universe.error.exist', {index: error?.index}));
          return;
        }
      }
      showSuccess(translate('universe.create.success'));
      await getListUniverse();
      closeModal();
    },
    [closeModal, getListUniverse, project, translate],
  );

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getListUniverse();
    });
  }, [getListUniverse, navigation]);

  return [
    list,
    getListUniverse,
    isVisible,
    openModal,
    closeModal,
    handleCreateUniverse,
  ];
}
