import { FC } from "react";
import { sendEmailChangePwdAPI } from "../../context/api/usersApi";

import SendEmailForm from "../../forms/AuthForm/SendEmailForm";
import { useScrollTop } from "../../hooks/useScrollTop";

const SendEmailChangePwd: FC = () => {
  useScrollTop();

  return (
    <SendEmailForm
      {...{
        title:
          "Insert your email so we can send you the link to change password",
        queryFrag: "change-pwd",
        funcAPI: sendEmailChangePwdAPI,
      }}
    />
  );
};
export default SendEmailChangePwd;
