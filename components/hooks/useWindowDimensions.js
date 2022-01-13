import { useState, useEffect } from 'react';

export default function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const screenWidth = hasWindow ? window.innerWidth : null;
    const screenHeight = hasWindow ? window.innerHeight : null;
    return {
      screenWidth,
      screenHeight,
    };
  }

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect((getWindowDimensions) => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}