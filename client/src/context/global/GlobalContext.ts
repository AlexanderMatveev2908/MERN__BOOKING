import { createContext } from "react";
import { RootVals } from "../types/rootTypes";

export const GlobalContext = createContext<RootVals | null>(null);
