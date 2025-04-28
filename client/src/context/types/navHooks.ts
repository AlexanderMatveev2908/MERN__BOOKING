import { NavigateFunction } from "react-router-dom";

export type NavHooks = {
  navigate: NavigateFunction;
  location: any;
  searchParams: any;
};
