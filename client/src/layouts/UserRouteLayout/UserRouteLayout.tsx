import { Navigate, Outlet } from "react-router-dom";
import { useNavHooks, useUsers } from "../../hooks/useGlobal";

const UserRouteLayout = () => {
  const { isLogged } = useUsers();
  const { location } = useNavHooks();

  return isLogged ? (
    <Navigate to={location.state?.from ?? "/"} replace />
  ) : (
    <Outlet />
  );
};
export default UserRouteLayout;
