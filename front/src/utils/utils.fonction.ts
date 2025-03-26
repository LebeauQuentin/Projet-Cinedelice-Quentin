import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Fonction pour remonter en haut de la page à chaque changement de route
export const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};