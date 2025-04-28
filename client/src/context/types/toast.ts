import { SET_TOAST } from "../actions/toastActions";

export type ToastMsgType = {
  msg: string;
  type: "SUCCESS" | "ERROR" | "INFO";
};

export type ToastStateType = {
  toast: ToastMsgType | false;
};

export type ToastActionTypes = {
  type: typeof SET_TOAST;
  payload: ToastMsgType | false;
};

export type ToastVals = ToastStateType & {
  closeToast?: () => void;
  showToastMsg: (msg: ToastMsgType["msg"], type: ToastMsgType["type"]) => void;
};
