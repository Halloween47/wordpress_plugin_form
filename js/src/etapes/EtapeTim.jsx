import React, { useState } from 'react';
import { useSousCat } from '../componentsMemenza/GestionEtat.jsx';
import SendDataToServer from './SendDataToServer.jsx';

// const handleCustomize = async () => {
const handleCustomize = ({ activeStep, setActiveStep }) => {
    const { idProduit, setIdProduit } = useSousCat();
    const [affichageProductId, setAffichageProductId] = useState("produitVideAffichage");
    React.useEffect(() => {
        // Accéder à la div existante
        const modalElement = document.getElementById("customization-modal");
    
        if (modalElement) {
          // Récupérer la valeur de data-product-id
          const productId = modalElement.getAttribute("data-product-id");
          console.log("Product ID:", productId); // Affiche la valeur dans la console
        setAffichageProductId(productId);
        setIdProduit(productId);
        } else {
          console.error("Div with ID 'customization-modal' not found!");
        }
      }, []);

    return(
        <div>
            {/* <h1>ID Produit : {productId}</h1> */}
            {/* <h1>ID Produit : {affichageProductId}</h1>
            <h1>ID Produit : {idProduit}</h1> */}
            <SendDataToServer setActiveStep={setActiveStep}  activeStep={activeStep} />
            {/* <h1>ID Produit : ?</h1> */}
            {/* <h1>ID Produit : {idProduit}</h1> */}
            {/* Ajoute ici la logique pour utiliser cet ID */}
        </div>
    )

};

export default handleCustomize;
