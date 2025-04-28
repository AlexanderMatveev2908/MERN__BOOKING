import { ReactElement, ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRootVals } from "../useRootVals";
import Toast from "../../components/Toast/Toast";
import { ToastMsgType } from "../types/toast";
import { useSetupAsync } from "./useSetupAsync";
import { RootVals } from "../types/rootTypes";
// import { bulkAPI } from "../../bulk/API";
import { loadStripe } from "@stripe/stripe-js";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const GlobalProvider = ({ children }: PropsType): ReactElement => {
  const {
    toastState: { toast, closeToast, showToastMsg },
    navHooks: { navigate, ...restNavVals },
    ...rootVals
  } = useRootVals();

  useSetupAsync({ showToastMsg, navigate });

  return (
    <GlobalContext.Provider
      value={
        {
          toastState: { showToastMsg },
          navHooks: { navigate, ...restNavVals },
          stripePromise,
          ...rootVals,
        } as RootVals
      }
    >
      <Toast
        {...{
          msg: (toast as ToastMsgType).msg,
          type: (toast as ToastMsgType).type,
          closeToast,
          toast,
        }}
      />
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;

// const hasRun = useRef<boolean>(false);

// const { isSuccess, isLoading: valTokenLoading } = useQuery(
//   "validateToken",
//   validateTokenAPI,
//   {
//     retry: false,
//     enabled:
//       !sessionStorage.getItem("hasToWriteEmail") &&
//       !sessionStorage.getItem("hasToWritePwd") &&
//       !localStorage.getItem("accessToken"),
//     onError: (err: any) => {
//       if (err.status === 401) queryClient.removeQueries("adminHotels");
//     },
//   }
// );

// useEffect(() => {
//   if (!hasRun.current) hasRun.current = true;
//   bulkAPI();
// }, []);
