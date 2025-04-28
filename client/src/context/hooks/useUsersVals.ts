import { Dispatch } from "react";
import { UsersStateType, UsersVals } from "../types/users";
import { RootActionTypes } from "../types/rootTypes";
import {
  SET_IS_CHANGING_PWD,
  SET_IS_vERIFYING_EMAIL,
} from "../actions/usersActions";

export const useUsersVals = (
  usersState: UsersStateType,
  dispatch: Dispatch<RootActionTypes>
): UsersVals => {
  const { ...usersVals } = usersState;
  const isLogged = !!localStorage.getItem("accessToken");

  const setIsVerifyingEmail = (isVerifyingEmail: boolean) => {
    dispatch({
      type: SET_IS_vERIFYING_EMAIL,
      payload: isVerifyingEmail,
    });
  };

  const setIsChangingPwd = (isChangingPwd: boolean) => {
    dispatch({
      type: SET_IS_CHANGING_PWD,
      payload: isChangingPwd,
    });
  };

  return {
    setIsVerifyingEmail,
    setIsChangingPwd,

    // validateTokenAPI,
    isLogged,
    ...usersVals,
  };
};
