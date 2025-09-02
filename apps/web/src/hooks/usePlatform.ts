import { useScreenSize } from './useScreenSize';

// Platform hook that uses useScreenSize for mobile, tablet, and desktop
export const usePlatform = () => {
  const isMobile = useScreenSize('mobile');
  const isTablet = useScreenSize('tablet');
  const isDesktop = useScreenSize('desktop');

  return {
    isMobile,
    isTablet,
    isDesktop
  };
};
