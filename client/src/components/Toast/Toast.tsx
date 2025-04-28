import { FC } from "react";
import { ToastMsgType } from "../../context/types/toast";
import { useToastLocal } from "./useToastLocal";

type PropsType = ToastMsgType & {
  closeToast?: () => void;
  toast: ToastMsgType | false;
};

const Toast: FC<PropsType> = ({ msg, type, closeToast, toast }) => {
  const { handleClose } = useToastLocal(toast, closeToast);

  const conditionalStyle =
    type === "SUCCESS"
      ? "bg-green-600"
      : type === "INFO"
      ? "bg-blue-600"
      : "bg-red-600";

  return (
    <div
      className={`px-5 py-1 max-w-[80%] fixed top-4 right-4 z-50 rounded-xl text-white border-2  ${
        toast ? "opacity-100 translate-x-0" : "translate-x-[120%] opacity-0"
      } duration-150 transition-all ease-in-out ${conditionalStyle}`}
    >
      <div className="flex justify-center relative py-5 pt-8 w-full">
        <span className="font-bold break-words flex-1 max-w-full text-xl sm:text-2xl md:text-3xl">
          {msg}
        </span>
        <div
          onClick={handleClose}
          className="text-3xl md:text-4xl text-white font-bold absolute -top-2 -right-2 cursor-pointer"
        >
          x
        </div>
      </div>
    </div>
  );
};
export default Toast;
