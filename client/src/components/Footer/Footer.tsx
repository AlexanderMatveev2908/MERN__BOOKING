import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="bg-neutral-950 py-5 pl-[70px] md:pl-10 px-10 sm:py-10">
      <div className="flex justify-between items-center flex-wrap ">
        <span className="text-2xl sm:text-3xl  text-green-600 font-bold tracking-tighter flex sm:block w-full sm:max-w-fit justify-center">
          MernHolidays.com
        </span>

        <span className="text-green-600 text-sm sm:text-base font-bold tracking-tighter flex gap-4 w-full sm:max-w-fit justify-around sm:justify-normal mt-5 sm:mt-0">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms Of Service</p>
        </span>
      </div>
    </div>
  );
};
export default Footer;
