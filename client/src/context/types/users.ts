import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import {
  SET_IS_CHANGING_PWD,
  SET_IS_vERIFYING_EMAIL,
} from "../actions/usersActions";

export type RegisterFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormDataType = Pick<
  RegisterFormDataType,
  "email" | "password"
>;

//  => FORM HOOKS TYPE
type FormHookType<
  T extends RegisterFormDataType | LoginFormDataType,
  Prefix extends string
> = {
  [key in `${Prefix}Fields`]: UseFormRegister<T>;
} & { [key in `${Prefix}Watch`]: UseFormWatch<T> } & {
  [key in `${Prefix}Errors`]: FieldErrors<T>;
};

export type RegisterFormHookType = FormHookType<
  RegisterFormDataType,
  "register"
>;
export type LoginFormHookType = FormHookType<LoginFormDataType, "login">;

export type UsersStateType = {
  isVerifyingEmail: boolean;
  isChangingPwd: boolean;
};

export type UsersActionType =
  | {
      type: typeof SET_IS_vERIFYING_EMAIL;
      payload: boolean;
    }
  | {
      type: typeof SET_IS_CHANGING_PWD;
      payload: boolean;
    };

export type UsersVals = UsersStateType & {
  setIsVerifyingEmail: (isVerifyingEmail: boolean) => void;
  setIsChangingPwd: (isChangingPwd: boolean) => void;
  isLogged: boolean;
  // validateTokenAPI: () => Promise<AxiosResponse>;
};
