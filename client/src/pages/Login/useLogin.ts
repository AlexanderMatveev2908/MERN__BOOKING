import { useForm } from "react-hook-form";
import { LoginFormDataType } from "../../context/types/users";
import { useMutation, useQueryClient } from "react-query";
import { loginUserAPI } from "../../context/api/usersApi";
import { useToast } from "../../hooks/useGlobal";
import { useEffect } from "react";
import { useScrollTop } from "../../hooks/useScrollTop";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { showToastMsg } = useToast();

  useScrollTop();

  const {
    register: loginFields,
    handleSubmit: handleLoginSubmit,
    watch: loginWatch,
    reset: resetLogin,
    formState: { errors: loginErrors },
    setFocus: setLoginFocus,
  } = useForm<LoginFormDataType>({ mode: "onChange" });

  useEffect(() => {
    setLoginFocus("email");
  }, [setLoginFocus]);

  const { mutate, isLoading: loginLoading } = useMutation(loginUserAPI, {
    onSuccess: async (data: any) => {
      resetLogin();
      localStorage.setItem("accessToken", data.accessToken);
      await queryClient.invalidateQueries("adminHotels");
      showToastMsg("Login performed successfully!", "SUCCESS");
    },
  });

  const handleLogin = handleLoginSubmit((formData: LoginFormDataType) => {
    mutate(formData);
  });

  return {
    loginFields,
    loginWatch,
    loginErrors,
    handleLogin,
    loginLoading,
    setLoginFocus,
  };
};
