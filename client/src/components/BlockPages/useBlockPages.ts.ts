import { useEffect, useState } from "react";
import {
  extraLargeVw,
  largeVw,
  mediumVw,
  smallVw,
} from "../../constants/breakPoints";

const useBlockPages = (totalPages: number) => {
  const [blockSize, setBlockSize] = useState(3);
  const [blockPages, setBlockPages] = useState(1);

  useEffect(() => {
    const updateSize = () => {
      const currWidth = window.innerWidth;
      if (currWidth < 400) {
        setBlockSize(3);
      } else if (currWidth < smallVw) {
        setBlockSize(5);
      } else if (currWidth < mediumVw) {
        setBlockSize(6);
      } else if (currWidth < largeVw) {
        setBlockSize(10);
      } else if (currWidth < extraLargeVw) {
        setBlockSize(12);
      } else {
        setBlockSize(15);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const blockLength = Math.min(
    blockSize,
    totalPages - (blockPages - 1) * blockSize
  );

  return {
    setBlockPages,
    blockLength,
    blockPages,
    blockSize,
  };
};
export default useBlockPages;
