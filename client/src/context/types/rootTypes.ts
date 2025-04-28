import { ToastActionTypes, ToastStateType, ToastVals } from "./toast";
import { UsersActionType, UsersStateType, UsersVals } from "./users";
import { SearchActionsType, SearchStateType, SearchVals } from "./search";
import { NavHooks } from "./navHooks";
import { Stripe } from "@stripe/stripe-js";

export type RootStateTypes = {
  toastState: ToastStateType;
  searchState: SearchStateType;
  usersState: UsersStateType;
};

export type RootActionTypes =
  | ToastActionTypes
  | SearchActionsType
  | UsersActionType;

export type RootVals = {
  usersState: UsersVals;
  toastState: ToastVals;
  navHooks: NavHooks;
  searchState: SearchVals;
  stripePromise?: Promise<Stripe>;
};
