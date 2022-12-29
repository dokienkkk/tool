import type {Project} from '../database/model';

export interface ProjectReducerAction {
  type: ProjectReducerActionType;

  project?: Project;

  name?: string;
}

export enum ProjectReducerActionType {
  CHANGE_NAME,
  RESET_NAME,
}

export function projectReducer(
  state: Project,
  action: ProjectReducerAction,
): Project {
  switch (action.type) {
    case ProjectReducerActionType.CHANGE_NAME:
      let newState = {...state, name: action.name};
      return newState;
    case ProjectReducerActionType.RESET_NAME:
      newState = {...state, name: action.name};
      return newState;
    default:
      return state;
  }
}
