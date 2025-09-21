import { useEffect, useState } from "react";
import { useScreenSize } from "./useScreenSize";

export const usePlatform = () => {
  const [isMounted, setIsMounted] = useState(false);
  const rawIsMobile = useScreenSize("mobile");
  const rawIsTablet = useScreenSize("tablet");
  const rawIsDesktop = useScreenSize("desktop");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile = isMounted ? rawIsMobile : false;
  const isTablet = isMounted ? rawIsTablet : false;
  const isDesktop = isMounted ? rawIsDesktop : true;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
