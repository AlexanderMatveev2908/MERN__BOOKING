import { useEffect, useState } from "react";

export const useResponsiveSearchBar = () => {
  const [placeholderDest, setPlaceholderDest] = useState(
    "Where are you going?"
  );

  useEffect(() => {
    const updateSearchDesign = () => {
      if (window.innerWidth < 450) setPlaceholderDest("Destination");
      else setPlaceholderDest("Where are you going?");
    };

    updateSearchDesign();

    window.addEventListener("resize", updateSearchDesign);

    return () => window.removeEventListener("resize", updateSearchDesign);
  }, []);

  return { placeholderDest };
};
