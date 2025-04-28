import { useQuery } from "react-query";
import { useNavHooks, useToast } from "../../hooks/useGlobal";
import { validateEmailAPI } from "../../context/api/usersApi";

export const useVerifyEmailAccount = () => {
  const { searchParams } = useNavHooks();
  const { showToastMsg } = useToast();

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const isValidId = userId && userId?.length === 24;
  const isValidToken = token && token?.length === 64;

  const { isLoading, isSuccess } = useQuery(
    ["verifyEmailUser", token, userId],
    () => validateEmailAPI(token, userId),
    {
      enabled: !!isValidId && !!isValidToken,
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        showToastMsg("Email verified successfully", "SUCCESS");
      },
    }
  );

  return {
    isLoading,
    isSuccess,
  };
};
