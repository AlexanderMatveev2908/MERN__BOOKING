import { useMutation } from "react-query";
import { createHotelAPI } from "../../context/api/hotelAPI";
import { useNavHooks, useToast } from "../../hooks/useGlobal";
import { useScrollTop } from "../../hooks/useScrollTop";

export const useAddHotel = () => {
  useScrollTop();

  const { showToastMsg } = useToast();
  const { navigate } = useNavHooks();

  const { mutate, isLoading } = useMutation(createHotelAPI, {
    onSuccess: () => {
      showToastMsg("Hotel created successfully!", "SUCCESS");
      navigate("/admin/my-hotels");
    },
  });

  const handleSave = (formData: FormData, resetForm?: () => void) => {
    mutate(formData, {
      onSuccess: () => resetForm?.(),
    });
  };

  return {
    handleSave,
    isLoading,
  };
};
