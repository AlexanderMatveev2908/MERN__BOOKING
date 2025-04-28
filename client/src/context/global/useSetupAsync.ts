import { useQueryClient } from "react-query";

export const useSetupAsync = ({ showToastMsg, navigate }: any) => {
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
      onError: (err: any) => {
        if (err.message === "SESSION_EXPIRED") {
          showToastMsg("Session Expired", "ERROR");
          queryClient.invalidateQueries();
          navigate("/user/login");
        } else {
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
        }
      },
    },
    mutations: {
      retry: false,
      onError: (err: any) => {
        if (err.message === "SESSION_EXPIRED") {
          showToastMsg("Session Expired", "ERROR");
          queryClient.invalidateQueries();
          navigate("/user/login");
        } else {
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
        }
      },
    },
  });
};
