import { useMutation, useQueryClient } from "react-query";
import { useNavHooks, useToast } from "../../../hooks/useGlobal";

const useCreateMutationHotel = (funcAPI: any, msg: string): any => {
  const queryClient = useQueryClient();
  const { navigate } = useNavHooks();
  const { showToastMsg } = useToast();

  const { mutate, isLoading } = useMutation(funcAPI, {
    onSuccess: async () => {
      showToastMsg(msg, "SUCCESS");
      await queryClient.invalidateQueries("hotelsAdmin");
      navigate("/admin/my-hotels");
    },
  });

  return {
    mutate,
    isLoading,
  };
};

export default useCreateMutationHotel;
