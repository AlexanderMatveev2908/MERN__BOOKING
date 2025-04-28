import { useEffect, useState } from "react";
import {
  extraLargeVw,
  largeVw,
  mediumVw,
  smallVw,
} from "../constants/breakPoints";

const useTruncateLength = (): number => {
  const [maxTxtLength, setMaxTxtLength] = useState(100);

  useEffect(() => {
    const updateLength = () => {
      const width = window.innerWidth;
      if (width < smallVw) setMaxTxtLength(100);
      if (width < mediumVw) setMaxTxtLength(200);
      if (width < largeVw) setMaxTxtLength(300);
      else if (width < extraLargeVw) setMaxTxtLength(400);
      else setMaxTxtLength(500);
    };

    updateLength();
    window.addEventListener("resize", updateLength);
    return () => window.removeEventListener("resize", updateLength);
  }, []);

  return maxTxtLength;
};
export default useTruncateLength;
