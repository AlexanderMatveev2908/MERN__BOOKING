import { FC } from "react";

const InfoStripe: FC = () => {
  return (
    <div className="flex flex-col gap-y-2 p-5 border-2 border-green-600/50 text-white/60 rounded-xl text-sm">
      <span>
        I am on test mode so to simulate a payment you can use the following
        details:
      </span>

      <span>
        - Card Number: 4242 4242 4242 4242 or chose another one from&nbsp;
        <a
          href="https://docs.stripe.com/testing"
          target="_blank"
          className="transition-all duration-300 border-b-2 border-transparent hover:border-green-600 hover:text-green-600 font-semibold text-base"
        >
          Stripe&apos;Documentation
        </a>
      </span>

      <span>- Expiry Date: is enough a date later than current one</span>

      <span>- CVV: 3 digits</span>

      <span>- Postal Code: 5 digits</span>
    </div>
  );
};
export default InfoStripe;
