import { FC, ReactNode, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import SearchBar from "../components/SearchBar/SearchBar";
import { useNavHooks } from "../hooks/useGlobal";
import Sidebar from "../components/Sidebar/Sidebar";

type PropsType = {
  children: ReactNode;
};

const MainUILayout: FC<PropsType> = ({ children }) => {
  const { location } = useNavHooks();
  const validPaths = ["/", "/search"];
  const [openSide, setOpenSide] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#222] text-[whitesmoke] relative w-full">
      <div className="bg-neutral-950 flex-1 flex flex-col items-center w-full">
        <Header />
        <Hero />
      </div>
      <Sidebar {...{ openSide, setOpenSide }} />

      {validPaths.includes(location.pathname) && <SearchBar />}

      <div className="py-10 pl-[70px] md:px-10 relative flex flex-col min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainUILayout;
