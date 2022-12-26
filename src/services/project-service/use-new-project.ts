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
  //   boolean,
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
    await projectRepository.create(nameProject);
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
    // reload,
  ];
}
