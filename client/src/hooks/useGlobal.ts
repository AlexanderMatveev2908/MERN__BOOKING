import { useContext } from "react";
import { GlobalContext } from "../context/global/GlobalContext";
import { ToastVals } from "../context/types/toast";
import { SearchVals } from "../context/types/search";
import { RootVals } from "../context/types/rootTypes";
import { NavHooks } from "../context/types/navHooks";
import { Stripe } from "@stripe/stripe-js";

const useGlobal = (): RootVals => {
  const context = useContext(GlobalContext);

  if (!context) throw new Error("GlobalContext not found");

  return context;
};

export const useUsers = (): RootVals["usersState"] => useGlobal().usersState;

export const useToast = (): Pick<ToastVals, "showToastMsg"> =>
  useGlobal().toastState;

export const useSearch = (): SearchVals => useGlobal().searchState;

export const useNavHooks = (): NavHooks => useGlobal().navHooks;

export const useStripePromise = (): Promise<Stripe> =>
  useGlobal().stripePromise!;
