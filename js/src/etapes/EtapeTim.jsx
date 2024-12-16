import React, { useState } from 'react';
import { useSousCat } from '../componentsMemenza/GestionEtat.jsx';
import SendDataToServer from './SendDataToServer.jsx';

// const handleCustomize = async () => {
const handleCustomize = () => {
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


    // try {
    //     // Étape 1 : Récupérer l'ID du produit via la route REST
    //     const productResponse = await fetch('/wp-json/plugin_memenza/v1/id_produit_perso');
        
    //     if (!productResponse.ok) {
    //         console.error('Erreur dans la requête REST :', productResponse.status, productResponse.statusText);
    //         alert('Erreur lors de la récupération de l\'ID du produit.');
    //         return;
    //     }

    //     const resultProduct = await productResponse.json();
    //     console.log("Réponse de l'API :", resultProduct);
        
    //     if (!resultProduct.product_id) {
    //         alert('Impossible de récupérer l\'ID du produit.');
    //         return;
    //     }

    //     const productId = resultProduct.product_id;

    //     // Étape 2 : Envoyer les données de personnalisation via AJAX
    //     const formData = new URLSearchParams({
    //         action: 'customize_product',
    //         product_id: productId,
    //         custom_text: 'Personnalisée youpitralala',
    //         nonce: ajaxConfig.nonce,  // Assurez-vous que ajaxConfig est défini
    //     });

    //     const response = await fetch(ajaxConfig.ajaxUrl, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //         body: formData.toString(),
    //     });

    //     const result = await response.json();
    //     if (result.success) {
    //         alert(result.message);
    //         window.location.href = '/cart';
    //     } else {
    //         alert(result.message + ' Une erreur est survenue.');
    //     }
    // } catch (error) {
    //     console.error('Erreur lors de la personnalisation du produit :', error);
    //     alert('Une erreur est survenue lors de la personnalisation du produit.');
    // }

    return(
        <div>
            {/* <h1>ID Produit : {productId}</h1> */}
            <h1>ID Produit : {affichageProductId}</h1>
            <h1>ID Produit : {idProduit}</h1>
            <SendDataToServer />
            {/* <h1>ID Produit : ?</h1> */}
            {/* <h1>ID Produit : {idProduit}</h1> */}
            {/* Ajoute ici la logique pour utiliser cet ID */}
        </div>
    )

};

export default handleCustomize;
