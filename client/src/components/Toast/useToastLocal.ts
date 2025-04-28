import { useEffect, useState } from "react";
import { ToastMsgType } from "../../context/types/toast";

export const useToastLocal = (
  toast: ToastMsgType | false,
  closeToast?: () => void
) => {
  const [timer, setTimer] = useState<number | boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast?.();
    }, 5000);

    setTimer(timer);

    return () => clearTimeout(timer);
  }, [closeToast, toast]);

  const handleClose = () => {
    clearTimeout(timer as number);
    closeToast?.();
  };

  return {
    handleClose,
  };
};
