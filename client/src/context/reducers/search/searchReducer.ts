import {
  CLEAR_SEARCH_VALS,
  SAVE_SEARCH,
  SET_VAL_SEARCH,
} from "../../actions/searchActions";
import { RootActionTypes } from "../../types/rootTypes";
import { SearchStateType } from "../../types/search";
import {
  clearSearchValsHandler,
  saveSearchHandler,
  setValsSearchHandler,
} from "./searchHandlers";

export const searchReducer = (
  searchState: SearchStateType,
  action: RootActionTypes
): SearchStateType => {
  switch (action.type) {
    case SAVE_SEARCH:
      return saveSearchHandler(action);
    case SET_VAL_SEARCH:
      return setValsSearchHandler(searchState, action);
    case CLEAR_SEARCH_VALS:
      return clearSearchValsHandler();
    default:
      return searchState;
  }
};
