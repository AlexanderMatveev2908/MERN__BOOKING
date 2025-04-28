import { useMutation } from "react-query";
import { useNavHooks, useToast } from "../../hooks/useGlobal";
import { MONGO_ID_REG } from "../../constants/regex";
import { useEffect } from "react";
import { changePwdAPI } from "../../context/api/usersApi";
import { FormDataPwd } from "./ChangePwd";
import { useForm } from "react-hook-form";
import { useScrollTop } from "../../hooks/useScrollTop";

export const useChangePwd = () => {
  const { showToastMsg } = useToast();
  const { navigate, searchParams } = useNavHooks();

  useScrollTop();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const isValidId = MONGO_ID_REG.test(userId);
  const isValidToken = token && token?.length === 64;

  const hasToWritePwd = sessionStorage.getItem("hasToWritePwd");

  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
    setFocus,
  } = useForm<FormDataPwd>({
    mode: "onChange",
  });

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const { mutate, isLoading: sendingPwd } = useMutation(
    ({ password, userId }: { password: string; userId: string }) =>
      changePwdAPI(password, userId, token),
    {
      onSuccess: (data) => {
        sessionStorage.removeItem("hasToWritePwd");
        localStorage.setItem("accessToken", data.accessToken);
        reset();
        showToastMsg("Password changed successfully", "SUCCESS");
        navigate("/", { replace: true });
      },
    }
  );

  const handleSave = handleSubmit((formData: FormDataPwd) => {
    const { password } = formData;
    mutate({ password, userId });
  });

  return {
    hasToWritePwd,
    handleSave,
    register,
    errors,
    watch,
    sendingPwd,
    isValidId,
    isValidToken,
  };
};
