import React, { createContext, useContext, useState } from 'react';

// Créez le contexte
const SousCatContext = createContext();

// Fournir le contexte
export const SousCatProvider = ({ children }) => {
  const [selectedSousCatId, setSelectedSousCatId] = useState(null);
  const [navigationId, setNavigationId] = useState(null);
  const [outputFilePathContext, setOutputFilePathContext] = useState(null);
  const [isGenerate, setIsGenerate] = useState(false);

  const [previsuOwnVisu, setPrevisuOwnVisu] = useState(false);

  return (
    <SousCatContext.Provider value={{ 
      selectedSousCatId, 
      setSelectedSousCatId,
      navigationId, 
      setNavigationId, 
      outputFilePathContext, 
      setOutputFilePathContext, 
      isGenerate, 
      setIsGenerate,
      previsuOwnVisu, 
      setPrevisuOwnVisu 
      }}>
      {children}
    </SousCatContext.Provider>
  );
};

// Hook pour consommer le contexte
export const useSousCat = () => useContext(SousCatContext);
