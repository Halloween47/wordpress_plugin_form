import { useEffect, useState } from "react";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

// const IdProduit = ({ productId }) => {
const IdProduit = () => {
    const [productId, setProductId] = useState(null);
  const { idProduit, setIdProduit } = useSousCat();

    useEffect(() => {
        // Supposons qu'un élément HTML dans le DOM contient l'ID du produit
        const rootElement = document.getElementById('plugin_backoffice_container');
        const modal = document.getElementById('customization-modal');        // if (productElement) {
          const id = modal.getAttribute("data-product-id");
          console.log("!!!!!!!!!!!!!!! : " + JSON.stringify(id));
          
          setProductId(id); // Mettre à jour l'état avec l'ID récupéré
          setIdProduit(id); // Mettre à jour l'état avec l'ID récupéré
          console.log("ID PRODUIT : " + JSON.stringify(productId));
        // }
      }, [idProduit]);
      
    return (
        <div>
            {/* <h1>ID Produit : {productId}</h1> */}
            {/* <h1>ID Produit : ?</h1> */}
            {/* <h1>ID Produit : {idProduit}</h1> */}
            {/* Ajoute ici la logique pour utiliser cet ID */}
        </div>
    );
};

export default IdProduit;