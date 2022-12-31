import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import type {Project} from 'src/database/model';
import {showSuccess} from 'src/helpers/toast-helper';
import {useBoolean} from 'src/hooks/use-boolean';
import {projectRepository} from 'src/repositories/project-repository';
import {universeRepository} from 'src/repositories/universe-repository';

export function useDeleteProject(): [
  boolean,
  () => void,
  () => void,
  (project: Project) => Promise<void>,
] {
  const navigation = useNavigation();

  const [translate] = useTranslation();

  const [isVisile, , openModal, closeModal] = useBoolean(false);

  const handleDeleteProject = React.useCallback(
    async (project: Project) => {
      await projectRepository.remove(project.id);
      await universeRepository.removeAll(project.id);
      closeModal();
      navigation.goBack();
      showSuccess(translate('action.delete.success', {name: project.name}));
    },
    [closeModal, navigation, translate],
  );

  return [isVisile, openModal, closeModal, handleDeleteProject];
}
