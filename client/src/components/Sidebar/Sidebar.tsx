import { Dispatch, FC, useEffect, useRef } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useUsers } from "../../hooks/useGlobal";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { sideLinks } from "./linksArr";
import { useLogoutBtn } from "../LogoutBtn/useLogoutBtn";

type PropsType = {
  openSide: boolean;
  setOpenSide: Dispatch<boolean>;
};

const Sidebar: FC<PropsType> = ({ openSide, setOpenSide }) => {
  const { isLogged } = useUsers();
  const { handleLogout } = useLogoutBtn();
  const sideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCLickOut = (e: MouseEvent) => {
      if (sideRef?.current && !sideRef.current.contains(e?.target as Node))
        setOpenSide(false);
    };

    if (openSide) document.addEventListener("mousedown", handleCLickOut);

    return () => document.removeEventListener("mousedown", handleCLickOut);
  }, [openSide, setOpenSide]);

  return (
    <>
      <div
        className={`transition-all duration-300 fixed md:hidden w-screen h-screen top-0 z-40 left-0  ${
          openSide ? "bg-neutral-950/50" : "bg-transparent pointer-events-none"
        }`}
      ></div>

      <div
        ref={sideRef}
        className={`w-[250px] sm:w-[400px] fixed md:hidden z-40 top-0 h-screen left-0 bg-neutral-950 border-2 border-green-600 transition-all duration-500 rounded-e-2xl 
              ${
                openSide
                  ? "translate-x-0"
                  : "translate-x-[-190px] sm:translate-x-[-340px]"
              }
            `}
      >
        <div
          onClick={() => setOpenSide(!openSide)}
          className="flex w-full justify-end border-b-2 border-green-600 pb-2
    "
        >
          <IoChevronForwardOutline
            size={35}
            className={`text-[whitesmoke] transition-all duration-300 h-[50px] w-[50px] hover:text-green-600 mt-2 mr-2 cursor-pointer ${
              openSide ? "rotate-180" : ""
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-5">
          {isLogged ? (
            <div
              className="flex justify-between w-full cursor-pointer items-center gap-3 mt-5 group"
              onClick={() => {
                handleLogout();
                setOpenSide(false);
              }}
            >
              <span className=" sidebar__link ">Logout</span>

              <IoIosLogOut className="sidebar__icon " size={30} />
            </div>
          ) : (
            <Link
              to="/user/login"
              className="flex justify-between w-full cursor-pointer group items-center gap-3 mt-5"
              onClick={() => setOpenSide(false)}
            >
              <span className="sidebar__link">Login</span>

              <MdLogin size={30} className=" sidebar__icon" />
            </Link>
          )}

          {sideLinks.map(
            (el) =>
              ((el.hasToBeLogin && isLogged) || !el.hasToBeLogin) && (
                <NavLink
                  key={el.id}
                  to={el.path}
                  className={`flex justify-between w-full cursor-pointer items-center gap-3 sidebar__nav_link trans-al duration-300 group ${
                    openSide ? "" : ""
                  }`}
                  onClick={() => setOpenSide(false)}
                >
                  <span className="sidebar__link">{el.label}</span>

                  <el.icon size={30} className="sidebar__icon" />
                </NavLink>
              )
          )}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
