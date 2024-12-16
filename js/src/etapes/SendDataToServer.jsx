// import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

// const SendDataToServer = async () => {
//       const { idProduit } = useSousCat();
//     //   const [productId, setProductId] = React.useState(null);
//       console.log("idproduit dans send to server : " + JSON.stringify(idProduit));
      
//       React.useEffect(() => {
//         const modal = document.getElementById('customization-modal');
//         if (modal) {
//             const id = modal.getAttribute('data-product-id');
//             console.log('ID Produit récupéré :', id);
//             setProductId(id); // Met à jour l'état avec l'ID produit
//         } else {
//             console.error("L'élément #customization-modal est introuvable !");
//         }
//     }, []);
    
//     React.useEffect(() => {
//           const fetchData = async () => {
//     try {
//         const response = await fetch(MyPluginAjax.ajax_url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams({
//                 action: 'add_custom_product_to_cart', // Action WordPress
//                 // product_id: 470, // ID produit
//                 product_id: idProduit, // ID produit
//                 custom_text: 'toto', // Texte personnalisé
//             }),
//         });

//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error('Erreur AJAX :', error);
//     }
//     console.log(MyPluginAjax.ajax_url);
// }
// fetchData();
// }, [])
// }
// export default SendDataToServer;


import React, { useState, useEffect } from 'react';
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

const SendDataToServer = () => {
  const { idProduit, navigationId, previsuOwnVisu, imageVisuelPath, pathImageGenerate, outputFilePathContext } = useSousCat(); // Récupère l'ID produit via le hook personnalisé
  const [productId, setProductId] = useState(null); // État local pour l'ID produit
console.log("CHEMIN POUR IMAGE : " + JSON.stringify(previsuOwnVisu));
console.log("CHEMIN POUR pathImageGenerate : " + JSON.stringify(pathImageGenerate));

  // Effet pour récupérer l'ID produit à partir du modal (DOM)
  useEffect(() => {
    const modal = document.getElementById('customization-modal');
    if (modal) {
      const id = modal.getAttribute('data-product-id'); // Récupère l'attribut personnalisé
      console.log('ID Produit récupéré depuis le modal :', id);
      setProductId(id); // Met à jour l'état avec l'ID produit
    } else {
      console.error("L'élément #customization-modal est introuvable !");
    }
  }, []); // Exécuté une seule fois au montage du composant

  // Effet pour envoyer les données au serveur
  useEffect(() => {
    if (!idProduit) {
      console.error('ID Produit manquant dans le contexte !');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(MyPluginAjax.ajax_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'add_custom_product_to_cart', // Action WordPress
            product_id: idProduit, // ID produit depuis le hook
            // custom_text: 'toto', // Texte personnalisé
            // custom_text: '<p>ID cadre : '+ {navigationId} + '</p><p><img src="' + {pathImageGenerate} + "\""+ " alt=\"Image\" with=\"100\" height=\"100\" /></p>",
            // custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${outputFilePathContext}" alt="Image" width="100" height="100" /></p>`,
            custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${pathImageGenerate}" alt="Image" width="100" height="100" /></p>`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        console.log('Résultat de la requête AJAX :', result);
        // const customText = `<p>ID cadre : ${navigationId}</p><p><img src="${pathImageGenerate}" alt="Image" /></p>`;
        window.location.href = '/panier/';
      } catch (error) {
        console.error('Erreur AJAX :', error);
      }
    };

    fetchData();
  }, [idProduit]); // L'effet se déclenche uniquement lorsque `idProduit` change

console.log("RESULTAT previsuOwnVisu : " + JSON.stringify(previsuOwnVisu));
console.log("RESULTAT pathImageGenerate : " + JSON.stringify(pathImageGenerate));
console.log("RESULTAT outputFilePathContext : " + JSON.stringify(outputFilePathContext));
console.log("RESULTAT imageVisuelPath : " + JSON.stringify(imageVisuelPath));


  return (
    <div>
      <p>Envoi des données au serveur...</p>
      {productId && <p>ID produit détecté : {productId}</p>}
      <p>ID cadre : {navigationId}   </p>
      <p><img src={previsuOwnVisu} alt="Image" /></p>
      <p><img src={pathImageGenerate} alt="Image" /></p>
    </div>
  );
};

export default SendDataToServer;
