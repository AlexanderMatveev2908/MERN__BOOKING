import { Dispatch } from "react";
import { SET_TOAST } from "../actions/toastActions";
import { ToastActionTypes, ToastMsgType } from "../types/toast";

export const showToastMsg = (
  msg: ToastMsgType["msg"],
  type: ToastMsgType["type"],
  dispatch: Dispatch<ToastActionTypes>
) => {
  dispatch({ type: SET_TOAST, payload: { msg, type } });
};
