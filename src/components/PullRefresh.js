import { useEffect, useState } from 'react';

const usePullToRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      // Guardamos la posición Y al empezar el toque
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;

      // Detecta si el usuario hace scroll hacia abajo desde la parte superior
      if (window.scrollY === 0 && currentY > touchStartY && !isRefreshing) {
        setIsRefreshing(true);
        window.location.reload();  // Recarga la página
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isRefreshing]);

  return isRefreshing;
};

export default usePullToRefresh;
