import { useNavHooks, useSearch } from "../../../hooks/useGlobal";
import { useParams } from "react-router-dom";

export const useGuestForm = () => {
  const { navigate, location } = useNavHooks();

  const {
    checkIn,
    checkOut,
    adultCount,
    childCount,
    handleChangeSearchDate,
    handleChangeSearch,
    saveSearchVals,
  } = useSearch();

  const { hotelId } = useParams();

  const handleSignInClick = () => {
    saveSearchVals();
    navigate("/user/login", { state: { from: location.pathname } });
  };

  // const { mutate, isLoading: isLoadingBooking } = useMutation(bookHotelAPI, {
  //   onSuccess: (data: any) => {
  //     if (data?.session?.url) window.location.href = data?.session?.url;
  //   },
  // });

  // const handleCLickForLogged = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   mutate({
  //     checkIn,
  //     checkOut,
  //     adultCount,
  //     childCount,
  //     hotelId,
  //   });
  // };

  const handleCLickForLogged = async (e: React.FormEvent) => {
    e.preventDefault();
    saveSearchVals();
    navigate(`/hotel-booking/${hotelId}`, {
      state: { from: location.pathname },
    });
  };

  return {
    checkIn,
    checkOut,
    adultCount,
    childCount,
    handleChangeSearchDate,
    handleChangeSearch,
    handleSignInClick,
    // isLoadingBooking,
    handleCLickForLogged,
  };
};
