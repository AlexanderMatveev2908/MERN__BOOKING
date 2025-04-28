import { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  path: string;
};

const NonExistingHotel: FC<PropsType> = ({ path }) => {
  const str = path === "/admin/my-hotels" ? "My Hotels" : "Search 🔎";

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <h1 className="text-xl sm:text-2xl">
        It seems that this hotel does not exist 🤔
      </h1>
      <Link className="text-xl sm:text-2xl link_page" to={path} replace={true}>
        Back To&nbsp;{str}
      </Link>
    </div>
  );
};
export default NonExistingHotel;
