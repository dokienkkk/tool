import type {Reducer} from 'react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import type {Project} from '../../database/model';
import {showSuccess, showWarning} from '../../helpers/toast-helper';
import {useBoolean} from '../../hooks/use-boolean';
import type {ProjectReducerAction} from '../../reducer/project-reducer';
import {ProjectReducerActionType} from '../../reducer/project-reducer';
import {projectReducer} from '../../reducer/project-reducer';
import {projectRepository} from '../../repositories/project-repository';

export function useUpdateProject(
  currentProject: Project,
): [
  boolean,
  () => void,
  () => void,
  Project,
  (name: string) => void,
  () => void,
] {
  const [translate] = useTranslation();

  const [project, dispatch] = React.useReducer<
    Reducer<Project, ProjectReducerAction>
  >(projectReducer, currentProject);

  const [isVisile, , openModal, closeModal] = useBoolean(false);

  const handleChangeName = React.useCallback((name: string) => {
    dispatch({
      type: ProjectReducerActionType.CHANGE_NAME,
      name: name,
    });
  }, []);

  const handleCloseModal = React.useCallback(() => {
    dispatch({
      type: ProjectReducerActionType.RESET_NAME,
      name: currentProject?.name,
    });
    closeModal();
  }, [closeModal, currentProject]);

  const handleSaveProject = React.useCallback(async () => {
    if (project?.name?.length === 0) {
      showWarning(translate('project.error.name'));
      return;
    }
    try {
      await projectRepository.update(currentProject.id, {
        name: project?.name?.trim(),
      });
    } catch (error) {
      if (error?.name && typeof error?.name === 'string') {
        showWarning(translate('project.error.existName', {name: error?.name}));
      }
      return;
    }
    showSuccess(translate('project.update.success'));
    closeModal();
  }, [closeModal, currentProject, project, translate]);

  return [
    isVisile,
    openModal,
    handleCloseModal,
    project,
    handleChangeName,
    handleSaveProject,
  ];
}
