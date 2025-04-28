import { FC, ReactNode } from "react";
import Header from "../../components/Header/Header";

type PropsType = {
  children: ReactNode;
};

const NotFoundLayoutUI: FC<PropsType> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#222] text-[whitesmoke] relative w-full">
      <div className="bg-neutral-950 flex flex-col items-center w-full">
        <Header />
      </div>

      <div className="py-10 px-5 sm:px-10 flex flex-col mt-[100px]">
        {children}
      </div>
    </div>
  );
};
export default NotFoundLayoutUI;
