import { useEffect } from "react";

export const useFocusInput = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);
};
