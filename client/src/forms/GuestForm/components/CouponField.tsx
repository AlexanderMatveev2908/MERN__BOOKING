import { FC } from "react";

const CouponField: FC = () => {
  return (
    <label className="grid grid-cols-1 w-full gap-y-3 md:gap-y-0 sm:grid-cols-[120px_1fr] md:grid-cols-[120px_1fr_120px_1fr]">
      <span className="text-lg font-semibold">Coupon</span>

      <input
        type="text"
        className="w-full px-5 py-1 bg-transparent border-2 border-green-600 rounded-xl h-fit outline-none focus_input sm:max-w-[250px] md:max-w-full"
        placeholder="Coupon Code..."
      />
    </label>
  );
};
export default CouponField;
