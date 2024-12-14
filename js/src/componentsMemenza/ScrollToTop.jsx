import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Surveille les changements de route

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Optionnel : pour un défilement fluide
    });
  }, [pathname]); // Exécute l'effet chaque fois que la route change

  return null; // Ce composant n'affiche rien
};

export default ScrollToTop;
