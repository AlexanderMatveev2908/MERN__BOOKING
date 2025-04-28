import { searchReducer } from "./reducers/search/searchReducer";
import { toastReducer } from "./reducers/toast/toastReducer";
import { usersReducer } from "./reducers/users/usersReducer";
import { RootActionTypes, RootStateTypes } from "./types/rootTypes";

export const rootReducer = (
  state: RootStateTypes,
  action: RootActionTypes
): RootStateTypes => ({
  toastState: toastReducer(state.toastState, action),
  searchState: searchReducer(state.searchState, action),
  usersState: usersReducer(state.usersState, action),
});
