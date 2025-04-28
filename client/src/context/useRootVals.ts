import { useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { rootInitState } from "./rootInitState";
import { useUsersVals } from "./hooks/useUsersVals";
import { useToastVals } from "./hooks/useToastVals";
import { UsersVals } from "./types/users";
import { ToastVals } from "./types/toast";
import { RootVals } from "./types/rootTypes";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchVals } from "./types/search";
import { useSearchVals } from "./hooks/useSearchVals";

export const useRootVals = (): RootVals => {
  const [state, dispatch] = useReducer(rootReducer, rootInitState);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const usersVals: UsersVals = useUsersVals(state.usersState, dispatch);
  const toastVals: ToastVals = useToastVals(state.toastState, dispatch);
  const searchVals: SearchVals = useSearchVals(
    state.searchState,
    dispatch,
    navigate
  );

  return {
    toastState: {
      ...toastVals,
    },
    usersState: {
      ...usersVals,
    },
    searchState: {
      ...searchVals,
    },
    navHooks: {
      navigate,
      location,
      searchParams,
    },
  };
};
