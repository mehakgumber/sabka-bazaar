import { useState, useEffect } from "react";

export function useScreenWidth() {
  const [width, setWidth] = useState(global.innerWidth);

  const listener = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return {
    width,
  };
}
