import { useNavHooks, useUsers } from "../../hooks/useGlobal";

export const useEmailNotice = () => {
  const { searchParams } = useNavHooks();
  const { isVerifyingEmail, isChangingPwd } = useUsers();
  const prefix = searchParams.get("prefix");

  const msg =
    prefix === "register"
      ? " and confirm the account "
      : " and click the link to change the password ";

  return {
    isVerifyingEmail,
    isChangingPwd,
    msg,
  };
};
