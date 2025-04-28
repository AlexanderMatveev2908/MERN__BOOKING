import { Link, NavLink } from "react-router-dom";
import { useUsers } from "../../hooks/useGlobal";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import { FC } from "react";

const Header: FC = () => {
  const { isLogged } = useUsers();

  return (
    <div
      id="header"
      className="bg-neutral-950 py-5 fixed top-0 left-0 z-40 w-full px-[70px] md:px-5"
    >
      <div className="grid w-full grid-cols-2 gap-4">
        <span className=" text-green-600 font-bold col-span-3 sm:col-span-1">
          <Link className="text-2xl sm:text-5xl " to="/">
            MernHolidays.com
          </Link>
        </span>

        {isLogged ? (
          <LogoutBtn />
        ) : (
          <Link
            to="/user/login"
            className="btn_link pseudo_btn md:flex justify-center justify-self-end hidden"
          >
            Sign In
          </Link>
        )}

        <div
          className={`justify-around col-span-2 w-full hidden md:flex ${
            isLogged ? "" : "col-span-2"
          }`}
        >
          <NavLink to="/" className="header__link pseudo_btn">
            <span>Home</span>
          </NavLink>
          <NavLink to="/search" className="header__link pseudo_btn">
            <span>Search</span>
          </NavLink>

          {isLogged && (
            <>
              <NavLink
                to="/admin/my-hotels"
                className="header__link pseudo_btn "
              >
                <span>My Hotels</span>
              </NavLink>
              <NavLink
                to="/admin/manage-bookings"
                className="header__link pseudo_btn"
              >
                <span>Manage Bookings</span>
              </NavLink>
              <NavLink
                to="/guest/my-bookings"
                className="header__link pseudo_btn"
              >
                <span>My Bookings</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
