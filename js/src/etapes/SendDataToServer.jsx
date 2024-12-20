
import React, { useState, useEffect } from 'react';
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import { Box, Button, CardMedia, CircularProgress, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  bgcolor: 'background.paper',
  // bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const SendDataToServer = () => {
  const { lienResultatJ2V, idProduit, setIdProduit, navigationId, previsuOwnVisu, imageVisuelPath, pathImageGenerate, outputFilePathContext } = useSousCat(); // Récupère l'ID produit via le hook personnalisé
  const [productId, setProductId] = useState(null); // État local pour l'ID produit
console.log("CHEMIN POUR IMAGE : " + JSON.stringify(previsuOwnVisu));
console.log("CHEMIN POUR pathImageGenerate : " + JSON.stringify(pathImageGenerate));
console.log("VERIFICATION IDPRODUIT : " + JSON.stringify(idProduit));

React.useEffect(() => {
        // Accéder à la div existante
        const modalElement = document.getElementById("customization-modal");
    
        if (modalElement) {
          // Récupérer la valeur de data-product-id
          const productId = modalElement.getAttribute("data-product-id");
          console.log("Product ID:", productId); // Affiche la valeur dans la console
        // setAffichageProductId(productId);
        setIdProduit(productId);
        } else {
          console.error("Div with ID 'customization-modal' not found!");
        }
      }, []);

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
  // useEffect(() => {
  //   if (!idProduit) {
  //     console.error('ID Produit manquant dans le contexte !');
  //     return;
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(MyPluginAjax.ajax_url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: new URLSearchParams({
  //           action: 'add_custom_product_to_cart', // Action WordPress
  //           product_id: idProduit, // ID produit depuis le hook
  //           // custom_text: 'toto', // Texte personnalisé
  //           // custom_text: '<p>ID cadre : '+ {navigationId} + '</p><p><img src="' + {pathImageGenerate} + "\""+ " alt=\"Image\" with=\"100\" height=\"100\" /></p>",
  //           // custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${outputFilePathContext}" alt="Image" width="100" height="100" /></p>`,
  //           custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${pathImageGenerate}" alt="Image" width="100" height="100" /></p>`,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Erreur HTTP : ${response.status}`);
  //       }

  //       const result = await response.json();
  //       console.log('Résultat de la requête AJAX :', result);
  //       // const customText = `<p>ID cadre : ${navigationId}</p><p><img src="${pathImageGenerate}" alt="Image" /></p>`;
  //       // window.location.href = '/panier/';
  //     } catch (error) {
  //       console.error('Erreur AJAX :', error);
  //     }
  //   };

  //   fetchData();
  // }, [idProduit]); 

const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNextPanierEtEnregistrement = () => {

    // Récuperation de l'ID Produit
    const modal = document.getElementById('customization-modal');
    if (modal) {
      const id = modal.getAttribute('data-product-id'); // Récupère l'attribut personnalisé
      console.log('ID Produit récupéré depuis le modal :', id);
      setProductId(id); // Met à jour l'état avec l'ID produit
    } else {
      console.error("L'élément #customization-modal est introuvable !");
    }

    if (!idProduit) {
      console.error('ID Produit manquant dans le contexte !');
      return;
    }

    
    console.log('!!!!!!!!!! ICI LE RESULTAT DU productId :', productId);
    const fetchData = async () => {
      try {
        const response = await fetch(MyPluginAjax.ajax_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'add_custom_product_to_cart',
            product_id: productId, 
            custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${pathImageGenerate}" alt="Image" width="100" height="100" /></p>`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        console.log('Résultat de la requête AJAX :', result);
        // const customText = `<p>ID cadre : ${navigationId}</p><p><img src="${pathImageGenerate}" alt="Image" /></p>`;
        if (result) {
          window.location.href = '/panier/';
        }
      } catch (error) {
        console.error('Erreur AJAX :', error);
      }
    };
    fetchData();

  }

  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="h4">Envoi des données au serveur...</Typography>
      {/* {productId && <p>ID produit détecté : {productId}</p>}
      <p>ID cadre : {navigationId}   </p>
      <p><img src={previsuOwnVisu} alt="Image" /></p>
      <p><img src={pathImageGenerate} alt="Image" /></p> */}
      <div>
      {/* <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        <Box sx={style}>
          {!lienResultatJ2V ? (
            <Box>
              <CircularProgress disableShrink sx={{marginBottom: "10px"}}/>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Envoi des données au serveur...
              </Typography>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                .... Opération entre 1-3min selon les médias envoyés
              </Typography>
            </Box>
          ) : 
          (
            <Box sx={{display: "flex", flexDirection: 'column', gap: 4, alignItems: "center"}}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Votre Création
              </Typography>
              <Box
                component="video"
                src={lienResultatJ2V}
                controls
                sx={{ width: "60%", objectFit: "contain" }}
              />
              <Button
                type="button"
                variant="contained"
                onClick={handleNextPanierEtEnregistrement}
                sx={{ mt: 4, mr: "1rem" }}
              >
                Vers le panier
              </Button>
            </Box>
            )
            }
          </Box>
        
            
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
      {/* </Modal> */}
    </div>
    </Box>
  );
};

export default SendDataToServer;
