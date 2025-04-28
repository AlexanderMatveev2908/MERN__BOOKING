import { AxiosResponse } from "axios";
import { axiosInstance } from "../../constants/instances";
import { LoginFormDataType, RegisterFormDataType } from "../types/users";
import { FormDataVerifyEmail } from "../../pages/SendEmailVerifyAccount/SendEmailVerifyAccount";
import { FormDataEmail } from "../../forms/AuthForm/SendEmailForm";

export const registerUserApi = async (
  formData: RegisterFormDataType
): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post("/users/register", formData);

  return data;
};

export const loginUserAPI = async (
  formData: LoginFormDataType
): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post("/users/login", formData);

  return data;
};

export const logoutUserAPI = async (): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post("/users/logout");

  return data;
};

// export const validateTokenAPI = async (): Promise<AxiosResponse> => {
//   const { data } = await axiosInstance.get("/users/validate-token");

//   return data;
// };

export const validateEmailAPI = async (
  token: string,
  userId: string
): Promise<any> => {
  const { data } = await axiosInstance.get(
    `/verify/verify-email?token=${token}&userId=${userId}`
  );

  return data;
};

export const sendEmailAgainAPI = async (formData: FormDataVerifyEmail) => {
  const { data } = await axiosInstance.post(
    `/verify/send-email-again`,
    formData
  );

  return data;
};

export const sendEmailChangePwdAPI = async (formData: FormDataEmail) => {
  const { data } = await axiosInstance.post(
    "/verify/send-email-change-pwd",
    formData
  );
  return data;
};

export const validateTokenChangePwdAPI = async (
  token: string,
  userId: string
): Promise<any> => {
  const { data } = await axiosInstance.get(
    `/verify/verify-email-change-pwd?token=${token}&userId=${userId}`
  );
  return data;
};

export const changePwdAPI = async (
  newPassword: string,
  userId: string,
  token: string
): Promise<any> => {
  const { data } = await axiosInstance.put(
    `/users/change-pwd?token=${token}&userId=${userId}`,
    {
      newPassword,
    }
  );
  return data;
};

export const getUserInfoAPI = async () => {
  const { data } = await axiosInstance.get("/users/info");

  return data;
};
