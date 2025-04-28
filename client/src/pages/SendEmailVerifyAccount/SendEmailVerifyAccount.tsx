import { sendEmailAgainAPI } from "../../context/api/usersApi";
import SendEmailForm from "../../forms/AuthForm/SendEmailForm";
import { useScrollTop } from "../../hooks/useScrollTop";

export type FormDataVerifyEmail = {
  email: string;
};

const SendEmailVerifyAccount = () => {
  useScrollTop();

  return (
    <SendEmailForm
      {...{
        title: "Write your email so we can verify your account",
        queryFrag: "prefix=register",
        funcAPI: sendEmailAgainAPI,
      }}
    />
  );
};
export default SendEmailVerifyAccount;
