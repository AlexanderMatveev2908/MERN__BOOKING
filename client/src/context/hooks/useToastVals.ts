import { Dispatch } from "react";
import {
  ToastActionTypes,
  ToastMsgType,
  ToastStateType,
  ToastVals,
} from "../types/toast";
import { SET_TOAST } from "../actions/toastActions";

export const useToastVals = (
  toastState: ToastStateType,
  dispatch: Dispatch<ToastActionTypes>
): ToastVals => {
  const closeToast = () => dispatch({ type: SET_TOAST, payload: false });

  return {
    showToastMsg: (msg: ToastMsgType["msg"], type: ToastMsgType["type"]) => {
      dispatch({ type: SET_TOAST, payload: { msg, type } });
    },
    closeToast,
    ...toastState,
  };
};
