import {
  SET_IS_CHANGING_PWD,
  SET_IS_vERIFYING_EMAIL,
} from "../../actions/usersActions";
import { RootActionTypes } from "../../types/rootTypes";
import { UsersStateType } from "../../types/users";

export const usersReducer = (
  usersState: UsersStateType,
  action: RootActionTypes
): UsersStateType => {
  switch (action.type) {
    case SET_IS_vERIFYING_EMAIL: {
      return {
        ...usersState,
        isVerifyingEmail: action.payload,
      };
    }
    case SET_IS_CHANGING_PWD: {
      return {
        ...usersState,
        isChangingPwd: action.payload,
      };
    }
    default:
      return usersState;
  }
};
