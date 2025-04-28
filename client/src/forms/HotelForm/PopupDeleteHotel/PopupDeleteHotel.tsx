import { FC } from "react";

type PropsType = {
  setPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteHotel?: () => void;
  deleteLoading?: boolean;
};

const PopupDeleteHotel: FC<PropsType> = ({
  setPopupOpen,
  handleDeleteHotel,
  deleteLoading,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-neutral-950/50 z-50 ">
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          className="absolute t-1/2
        bg-[#222] w-[75%] h-1/2 rounded-3xl p-10 sm:w-[500px]"
        >
          <div className="relative flex flex-col items-center justify-start h-full">
            <div className="font-bold sm:text-xl">
              <h1>Are you sure you want to delete this hotel?</h1>
            </div>

            <div className="flex justify-around w-full items-center absolute bottom-10 flex-wrap gap-5">
              <button
                disabled={deleteLoading}
                onClick={handleDeleteHotel}
                type="button"
                className="popup_delete_hotel__btn pseudo_btn border-red-600 hover:bg-red-600"
              >
                {deleteLoading ? "Deleting Hotel..." : "I Am Sure"}
              </button>
              <button
                disabled={deleteLoading}
                onClick={() => setPopupOpen?.(false)}
                type="button"
                className="popup_delete_hotel__btn pseudo_btn border-green-600 hover:bg-green-600"
              >
                I change idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopupDeleteHotel;
