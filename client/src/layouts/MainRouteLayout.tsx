import { Outlet } from "react-router-dom";
import MainUILayout from "./MainUILayout";
import { FC } from "react";

const MainRouteLayout: FC = () => {
  return (
    <MainUILayout>
      <Outlet />
    </MainUILayout>
  );
};
export default MainRouteLayout;
