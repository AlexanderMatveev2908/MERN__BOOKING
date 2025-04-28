import { FC } from "react";
import { useLogoutBtn } from "./useLogoutBtn";

const LogoutBtn: FC = () => {
  const { handleLogout, logoutLoading } = useLogoutBtn();

  return (
    <button
      onClick={handleLogout}
      className="btn_link pseudo_btn justify-self-end  justify-center h-fit hidden md:flex self-center"
    >
      {logoutLoading ? "Logging out..." : "Logout"}
    </button>
  );
};
export default LogoutBtn;
