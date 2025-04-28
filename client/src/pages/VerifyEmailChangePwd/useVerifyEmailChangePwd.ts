import { useQuery } from "react-query";
import { useNavHooks, useToast } from "../../hooks/useGlobal";
import { MONGO_ID_REG } from "../../constants/regex";
import { validateTokenChangePwdAPI } from "../../context/api/usersApi";

export const useVerifyEmailChangePwd = () => {
  const { showToastMsg } = useToast();
  const { searchParams } = useNavHooks();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const isValidId = MONGO_ID_REG.test(userId);
  const isValidToken = token && token?.length === 64;

  const { isLoading, isSuccess } = useQuery(
    ["verifyEmailChangePwd", userId, token],
    () => validateTokenChangePwdAPI(token, userId),
    {
      enabled: !!isValidId && !!isValidToken,
      onSuccess: () => {
        sessionStorage.setItem("hasToWritePwd", "true");
        showToastMsg("Email verified successfully", "SUCCESS");
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    token,
    userId,
  };
};
