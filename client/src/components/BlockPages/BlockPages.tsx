import { FC } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import useBlockPages from "./useBlockPages.ts";

type PropsType = {
  totalPages: number;
  currPage: number;
  setCurrPage: (page: number) => void;
};

const BlockPages: FC<PropsType> = ({ currPage, setCurrPage, totalPages }) => {
  const { setBlockPages, blockLength, blockPages, blockSize } =
    useBlockPages(totalPages);

  return !totalPages ? null : (
    <div className="w-full absolute bottom-[-30px]">
      <div className="grid w-full grid-cols-[50px_1fr_50px] gap-5">
        {blockPages > 1 && (
          <button
            onClick={() => setBlockPages(blockPages - 1)}
            className="pseudo_btn hover:bg-green-600 hover:text-neutral-950 rounded-xl flex place-content-center"
          >
            <MdNavigateBefore className="text-4xl" />
          </button>
        )}

        <div
          className={`${blockPages === 1 ? "col-start-2" : ""} w-full ${
            blockLength < blockSize ? "justify-start gap-5" : "justify-between"
          } flex `}
        >
          {Array.from(
            {
              length: blockLength,
            },
            (_, i) => i + 1 + (blockPages - 1) * blockSize
          )?.map((page: number) => (
            <button
              onClick={() => setCurrPage(page)}
              key={page}
              className={`font-semibold rounded-xl border-2 transition-all duration-300 text-sm sm:text-base px-3 sm:px-5 py-1 border-green-600 text=[whitesmoke] text-center hover:bg-green-600 bg-[#222] hover:text-neutral-950 ${
                currPage === page ? "bg-green-600 text-neutral-950" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {blockPages * blockSize < totalPages && (
          <button
            onClick={() => setBlockPages(blockPages + 1)}
            className="pseudo_btn hover:bg-green-600 hover:text-neutral-950 rounded-xl col-start-3 flex place-content-center"
          >
            <MdNavigateNext className="text-4xl" />
          </button>
        )}
      </div>
    </div>
  );
};
export default BlockPages;
