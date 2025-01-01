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
  const [imageVisuelPath, setImageVisuelPath] = useState(false);
  const [pathImageGenerate, setPathImageGenerate] = useState(false);
  
  const [idProduit, setIdProduit] = useState(null);
  const [lienResultatJ2V, setLienResultatJ2V] = useState(null);
  
  const [modalVideoGenere, setModalVideoGenere] = useState(false);
  
  const [visuelIdVignetteSelectionner, setVisuelIdVignetteSelectionner] = useState(null);
  const [visuelTextesCadres, setVisuelTextesCadres] = useState(null);
  const [visuelDataVignetteClique, setVisuelDataVignetteClique] = useState([]);
  const [visuelChampText1, setVisuelChampText1] = useState(null);
  const [visuelGeneratedImageUrl, setVisuelGeneratedImageUrl] = useState(null);
  
  const [videoCreationFail, setVideoCreationFail] = useState(null);
    


  return (
    <SousCatContext.Provider value={{
      videoCreationFail, 
      setVideoCreationFail,
      visuelGeneratedImageUrl, 
      setVisuelGeneratedImageUrl,
      visuelChampText1, 
      setVisuelChampText1,
      visuelDataVignetteClique, 
      setVisuelDataVignetteClique,
      visuelTextesCadres, 
      setVisuelTextesCadres,
      visuelIdVignetteSelectionner, 
      setVisuelIdVignetteSelectionner,
      modalVideoGenere, 
      setModalVideoGenere,
      lienResultatJ2V, 
      setLienResultatJ2V,
      pathImageGenerate, 
      setPathImageGenerate,
      idProduit, 
      setIdProduit, 
      imageVisuelPath, 
      setImageVisuelPath,
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
