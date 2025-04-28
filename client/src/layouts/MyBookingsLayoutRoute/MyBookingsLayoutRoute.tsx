import { FC } from "react";
import { useUsers } from "../../hooks/useGlobal";
import { Navigate, Outlet } from "react-router-dom";

const MyBookingsLayoutRoute: FC = () => {
  const { isLogged } = useUsers();

  return isLogged ? <Outlet /> : <Navigate to="/user/login" replace={true} />;
};
export default MyBookingsLayoutRoute;
