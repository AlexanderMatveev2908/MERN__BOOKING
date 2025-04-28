import { useEffect } from "react";
import { useNavHooks, useToast, useUsers } from "../../hooks/useGlobal";
import { useForm } from "react-hook-form";
import { FormDataEmail } from "./SendEmailForm";
import { useMutation } from "react-query";

export const useSendEmailForm = (
  queryFrag: string,
  funcAPI: (data: FormDataEmail) => Promise<any>
) => {
  const { showToastMsg } = useToast();
  const { setIsChangingPwd } = useUsers();
  const { navigate } = useNavHooks();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormDataEmail>({
    mode: "onChange",
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { mutate, isLoading: sendingEmailLoading } = useMutation(funcAPI, {
    onSuccess: () => {
      setIsChangingPwd(true);
      reset();
      showToastMsg("Email sent successfully", "SUCCESS");
      navigate(`/user/verify-email-notice?${queryFrag}`, {
        replace: true,
      });
    },
  });

  const handleSave = handleSubmit((formData: FormDataEmail) => {
    mutate(formData);
  });

  return {
    handleSave,
    register,
    errors,
    sendingEmailLoading,
  };
};
