import { FC, useEffect } from "react";

type PropsType = {
  popup: boolean;
  setPopup: (popup: boolean) => void;
  isLoadingRefund: boolean;
  handleRefund: (val: string) => void;
  bookingIdRefundId: null | string;
  setBookingIdRefundId: (val: string | null) => void;
};

const PopupRefund: FC<PropsType> = ({
  popup,
  setPopup,
  isLoadingRefund,
  handleRefund,
  bookingIdRefundId,
  setBookingIdRefundId,
}) => {
  useEffect(() => {
    if (popup && !bookingIdRefundId) setPopup(false);
  }, [popup, bookingIdRefundId, setPopup]);

  return (
    <div
      className={`w-full h-full top-0 left-0 z-50 bg-black/50 ${
        popup ? "fixed" : "hidden"
      }`}
    >
      <div className="relative w-[80%] rounded-2xl left-[50%] translate-x-[-50%] h-1/2 top-1/4 bg-[#222] max-w-[500px]">
        <button
          onClick={() => {
            setPopup(false);
            setBookingIdRefundId(null);
          }}
          className="text-5xl text-red-600 absolute top-0 right-4"
        >
          x
        </button>

        <div className="w-full flex flex-col max-w-full px-5 mx-auto">
          <span className="font-semibold text-xl sm:text-2xl mt-14 justify-center text-center">
            Are you sure you want cancel this booking ?
          </span>

          <div className="flex w-full gap-5 justify-around max-w-full flex-wrap absolute bottom-10 left-1/2 -translate-x-1/2 px-10">
            <button
              disabled={isLoadingRefund}
              onClick={() => setPopup(false)}
              className="popup_delete_hotel__btn pseudo_btn max-w-[200px] border-green-600 hover:bg-green-600 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              Changed Idea
            </button>
            <button
              onClick={() => handleRefund(bookingIdRefundId!)}
              disabled={isLoadingRefund}
              className="popup_delete_hotel__btn pseudo_btn max-w-[200px] border-red-600 hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              Ask Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopupRefund;
