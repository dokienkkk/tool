import type {Address} from 'src/database/model';

export interface AddressReducerAction {
  type: AddressReducerActionType;

  address?: Partial<Address>;

  listAddress?: Address[];
}

export enum AddressReducerActionType {
  INIT,
  ADD_ADDRESS,
  DELETE_ADDRESS,
}

export const addressReducer = (
  state: Partial<Address>[],
  action: AddressReducerAction,
) => {
  switch (action.type) {
    case AddressReducerActionType.INIT:
      return action.listAddress;
    case AddressReducerActionType.ADD_ADDRESS:
      const newListAddress = [...state, action.address];
      // eslint-disable-next-line no-console
      console.log(newListAddress);
      return newListAddress;
    case AddressReducerActionType.DELETE_ADDRESS:
      return state;
    default:
      return state;
  }
};
