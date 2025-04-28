import { SET_TOAST } from "../../actions/toastActions";
import { RootActionTypes } from "../../types/rootTypes";
import { ToastStateType } from "../../types/toast";

export const toastReducer = (
  toastState: ToastStateType,
  action: RootActionTypes
): ToastStateType => {
  switch (action.type) {
    case SET_TOAST: {
      return {
        ...toastState,
        toast: action.payload,
      };
    }
    default:
      return toastState;
  }
};
