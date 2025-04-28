import { FC } from "react";
import KeysGame from "./KeysGame";
import { Link } from "react-router-dom";
import { useNotFound } from "./useNotFound";

const NotFound: FC = () => {
  const { snake, food, direction, setDirection } = useNotFound();

  return (
    <div className="flex w-full flex-col justify-start items-center gap-10">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex flex-col md:flex-row justify-center gap-5 md:items-center">
          <h1 className="text-5xl text-center font-bold">404</h1>
          <h1 className="text-2xl">It seems that you lost yourself 🤔</h1>
        </div>

        <div className="flex w-full items-center justify-center">
          <span className="text-lg sm:text-2xl">
            Don&apos;t worry, play a game 🕹️ or&nbsp;
            <Link className="link_page" to="/">
              go back Home
            </Link>
          </span>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-start gap-5">
        <div className="w-full max-w-[250px] md:max-w-[400px] border-2 border-green-600 rounded-2xl bg-neutral-950 h-[250px] md:h-[400px] grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)]">
          {snake.map((el: any, i: number) => (
            <div
              key={i}
              className="bg-green-600"
              style={{
                gridColumnStart: el.x,
                gridRowStart: el.y,
              }}
            ></div>
          ))}

          <div
            className="bg-[whitesmoke] rounded"
            style={{
              gridColumnStart: food.x,
              gridRowStart: food.y,
            }}
          ></div>
        </div>

        <KeysGame {...{ direction, setDirection }} />
      </div>
    </div>
  );
};
export default NotFound;
