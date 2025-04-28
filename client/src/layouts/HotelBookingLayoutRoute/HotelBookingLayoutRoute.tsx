import { FC } from "react";
import { useNavHooks, useUsers } from "../../hooks/useGlobal";
import { REG_FROM_HOTEL_DETAILS } from "../../constants/regex";
import { Navigate, Outlet } from "react-router-dom";

const HotelBookingLayoutRoute: FC = () => {
  const { location } = useNavHooks();
  const { isLogged } = useUsers();

  const canVisitBooking = REG_FROM_HOTEL_DETAILS.test(
    location?.state?.from ?? ""
  );

  return canVisitBooking && isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/search" replace={true} />
  );
};
export default HotelBookingLayoutRoute;
