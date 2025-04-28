import { useMutation, useQueryClient } from "react-query";
import { useNavHooks, useToast } from "../../hooks/useGlobal";
import { logoutUserAPI } from "../../context/api/usersApi";

export const useLogoutBtn = () => {
  const queryClient = useQueryClient();
  const { navigate } = useNavHooks();
  const { showToastMsg } = useToast();

  const { mutate, isLoading: logoutLoading } = useMutation(logoutUserAPI, {
    onSuccess: async () => {
      localStorage.removeItem("accessToken");
      await queryClient.invalidateQueries("adminHotels");
      navigate("/");
      showToastMsg("Logout performed successfully!", "SUCCESS");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return {
    handleLogout,
    logoutLoading,
  };
};
