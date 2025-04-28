import AuthField from "./AuthField";
import { FC } from "react";
import { fieldEmail } from "./fieldEmail";
import { useSendEmailForm } from "./useSendEmailForm";

export type FormDataEmail = {
  email: string;
};

type PropsType = {
  queryFrag: string;
  title: string;
  funcAPI: (data: FormDataEmail) => Promise<any>;
};

const SendEmailForm: FC<PropsType> = ({ queryFrag, funcAPI, title }) => {
  const { handleSave, register, errors, sendingEmailLoading } =
    useSendEmailForm(queryFrag, funcAPI);

  return (
    <div className="w-full flex flex-col items-center text-[whitesmoke]">
      <h1 className="text-base sm:text-xl font-bold">{title}</h1>

      <form
        onSubmit={handleSave}
        className="border-2 border-green-600 p-5 pt-16  rounded-xl w-full mt-5 flex flex-col gap-5"
      >
        <AuthField
          key={fieldEmail.id}
          {...{ register, errors, field: fieldEmail }}
        />

        <div className="flex w-full justify-center">
          <button
            disabled={sendingEmailLoading}
            type="submit"
            className="btn w-full max-w-[250px] sm:max-w-[350px]"
          >
            {sendingEmailLoading ? "Sending email..." : "Send Email"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default SendEmailForm;
