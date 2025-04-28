import { useForm } from "react-hook-form";
import { RegisterFormDataType } from "../../context/types/users";
import { useNavHooks, useToast, useUsers } from "../../hooks/useGlobal";
import { useMutation } from "react-query";
import { registerUserApi } from "../../context/api/usersApi";
import { useEffect } from "react";
import { useScrollTop } from "../../hooks/useScrollTop";

export const useRegister = () => {
  const { navigate } = useNavHooks();
  const { showToastMsg } = useToast();
  const { setIsVerifyingEmail } = useUsers();

  useScrollTop();

  const {
    register: registerFields,
    handleSubmit: handleRegisterSubmit,
    watch: registerWatch,
    reset: resetRegister,
    formState: { errors: registerErrors },
    setFocus: setRegisterFocus,
  } = useForm<RegisterFormDataType>({ mode: "onChange" });

  useEffect(() => {
    setRegisterFocus("firstName");
  }, [setRegisterFocus]);

  const { mutate, isLoading: registerLoading } = useMutation(registerUserApi, {
    onSuccess: async () => {
      resetRegister();
      setIsVerifyingEmail(true);
      navigate("/user/verify-email-notice?prefix=register");
      showToastMsg("Account created, validate email", "SUCCESS");
    },
  });

  const handleRegister = handleRegisterSubmit(
    (formData: RegisterFormDataType) => {
      mutate(formData);
    }
  );

  return {
    registerFields,
    registerWatch,
    registerErrors,
    handleRegister,
    registerLoading,
  };
};
