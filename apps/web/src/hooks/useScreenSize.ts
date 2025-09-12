import { useEffect, useState } from "react";

export const useScreenSize = (size: 'mobile' | 'tablet' | 'desktop'): boolean => {
  const [isSize, setIsSize] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkSize = () => {
      const width = window.innerWidth;
      
      switch (size) {
        case 'mobile':
          setIsSize(width < 768);
          break;
        case 'tablet':
          setIsSize(width >= 768 && width < 1024);
          break;
        case 'desktop':
          setIsSize(width >= 1024);
          break;
        default:
          setIsSize(false);
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [size]);

  return isMounted ? isSize : false;
};
