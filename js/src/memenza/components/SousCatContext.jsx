import React, { createContext, useContext, useState } from 'react';

// Créez le contexte
const SousCatContext = createContext();

// Fournir le contexte
export const SousCatProvider = ({ children }) => {
  const [selectedSousCatId, setSelectedSousCatId] = useState(null);

  return (
    <SousCatContext.Provider value={{ selectedSousCatId, setSelectedSousCatId }}>
      {children}
    </SousCatContext.Provider>
  );
};

// Hook pour consommer le contexte
export const useSousCat = () => useContext(SousCatContext);
