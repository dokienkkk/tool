import React from 'react';
import {useTranslation} from 'react-i18next';
import {showInfo, showWarning} from '../../helpers/toast-helper';
import {useBoolean} from '../../hooks/use-boolean';
import {projectRepository} from '../../repositories/project-repository';

export function useNewProject(): [
  boolean,
  () => void,
  () => void,
  string,
  (name: string) => void,
  () => void,
] {
  const [translate] = useTranslation();

  const [nameProject, setNameProject] = React.useState('');

  const [isVisile, , openModal, closeModal] = useBoolean(false);

  const handleChangeName = React.useCallback((name: string) => {
    setNameProject(name);
  }, []);

  const handleCreateNewProject = React.useCallback(async () => {
    if (nameProject?.length === 0) {
      showWarning(translate('project.error.name'));
      return;
    }
    try {
      await projectRepository.create(nameProject.trim());
    } catch (error) {
      if (error?.name && typeof error?.name === 'string') {
        showWarning(translate('project.error.existName', {name: error?.name}));
      }
      return;
    }
    setNameProject('');
    showInfo(translate('project.create.success'));
    closeModal();
  }, [closeModal, nameProject, translate]);

  return [
    isVisile,
    openModal,
    closeModal,
    nameProject,
    handleChangeName,
    handleCreateNewProject,
  ];
}
