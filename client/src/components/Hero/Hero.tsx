import { FC } from "react";
import { useUsers } from "../../hooks/useGlobal";

const Hero: FC = () => {
  const { isLogged } = useUsers();

  return (
    <div
      className={`py-5 pb-10 w-full pl-[70px] md:px-5 ${
        isLogged
          ? "mt-[50px] sm:mt-[75px] md:mt-[120px] lg:mt-[125px]"
          : "mt-[50px] sm:mt-[75px] md:mt-[120px]"
      }
      `}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl sm:text-5xl text-green-600 font-bold">
          Find Your Next Stay
        </h1>

        <p className="text-base sm:text-2xl md:text-3xl text-green-600">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};
export default Hero;
