import { useQuery } from "react-query";
import { useScrollTop } from "../../hooks/useScrollTop";
import { getLatestHotelsAPI } from "../../context/api/searchAPI";
import { useEffect, useState } from "react";
import { extraLargeVw, largeVw, smallVw } from "../../constants/breakPoints";

export const useHome = () => {
  useScrollTop();

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () =>
      window.innerWidth > smallVw
        ? setLimit(10)
        : window.innerWidth > largeVw
        ? setLimit(12)
        : window.innerWidth > extraLargeVw
        ? setLimit(16)
        : setLimit(5);

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const { data: dataHotels, isLoading: isLoadingHotels } = useQuery(
    ["homeLatest", limit],
    () => getLatestHotelsAPI(limit + ""),
    {
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 30,
    }
  );

  const { hotels = [] } = dataHotels ?? ({} as any);

  return {
    hotels,
    isLoadingHotels,
  };
};
