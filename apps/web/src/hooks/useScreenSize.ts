import { useEffect, useState } from "react";

// Custom hook for screen size detection - returns boolean based on passed size
export const useScreenSize = (size: 'mobile' | 'tablet' | 'desktop') => {
  const [isSize, setIsSize] = useState(false);

  useEffect(() => {
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

  return isSize;
};
