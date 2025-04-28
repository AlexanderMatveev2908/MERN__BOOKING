import { searchInitState } from "./initStates/searchInitState";
import { toastInitState } from "./initStates/toastInitState";
import { usersInitState } from "./initStates/usersInitState";
import { RootStateTypes } from "./types/rootTypes";

export const rootInitState: RootStateTypes = {
  usersState: usersInitState,
  toastState: toastInitState,
  searchState: searchInitState,
};
