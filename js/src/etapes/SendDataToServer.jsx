
// import React, { useState, useEffect } from 'react';
// import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
// import { Box, Button, CardMedia, CircularProgress, Modal, Typography } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: "100%",
//   height: "80%",
//   bgcolor: 'background.paper',
//   // bgcolor: 'black',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const SendDataToServer = ({ activeStep, setActiveStep }) => {

//   const { lienResultatJ2V, idProduit, setIdProduit, navigationId, previsuOwnVisu, imageVisuelPath, pathImageGenerate, outputFilePathContext } = useSousCat(); // Récupère l'ID produit via le hook personnalisé
//   const [productId, setProductId] = useState(null); // État local pour l'ID produit
// console.log("CHEMIN POUR IMAGE : " + JSON.stringify(previsuOwnVisu));
// console.log("CHEMIN POUR pathImageGenerate : " + JSON.stringify(pathImageGenerate));
// console.log("VERIFICATION IDPRODUIT : " + JSON.stringify(idProduit));

// React.useEffect(() => {
//         // Accéder à la div existante
//         const modalElement = document.getElementById("customization-modal");
    
//         if (modalElement) {
//           // Récupérer la valeur de data-product-id
//           const productId = modalElement.getAttribute("data-product-id");
//           console.log("Product ID:", productId); // Affiche la valeur dans la console
//         // setAffichageProductId(productId);
//         setIdProduit(productId);
//         } else {
//           console.error("Div with ID 'customization-modal' not found!");
//         }
//       }, []);

//   // Effet pour récupérer l'ID produit à partir du modal (DOM)
//   useEffect(() => {
//     const modal = document.getElementById('customization-modal');
//     if (modal) {
//       const id = modal.getAttribute('data-product-id'); // Récupère l'attribut personnalisé
//       console.log('ID Produit récupéré depuis le modal :', id);
//       setProductId(id); // Met à jour l'état avec l'ID produit
//     } else {
//       console.error("L'élément #customization-modal est introuvable !");
//     }
//   }, []); // Exécuté une seule fois au montage du composant

//   // Effet pour envoyer les données au serveur
//   // useEffect(() => {
//   //   if (!idProduit) {
//   //     console.error('ID Produit manquant dans le contexte !');
//   //     return;
//   //   }

//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch(MyPluginAjax.ajax_url, {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/x-www-form-urlencoded',
//   //         },
//   //         body: new URLSearchParams({
//   //           action: 'add_custom_product_to_cart', // Action WordPress
//   //           product_id: idProduit, // ID produit depuis le hook
//   //           // custom_text: 'toto', // Texte personnalisé
//   //           // custom_text: '<p>ID cadre : '+ {navigationId} + '</p><p><img src="' + {pathImageGenerate} + "\""+ " alt=\"Image\" with=\"100\" height=\"100\" /></p>",
//   //           // custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${outputFilePathContext}" alt="Image" width="100" height="100" /></p>`,
//   //           custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${pathImageGenerate}" alt="Image" width="100" height="100" /></p>`,
//   //         }),
//   //       });

//   //       if (!response.ok) {
//   //         throw new Error(`Erreur HTTP : ${response.status}`);
//   //       }

//   //       const result = await response.json();
//   //       console.log('Résultat de la requête AJAX :', result);
//   //       // const customText = `<p>ID cadre : ${navigationId}</p><p><img src="${pathImageGenerate}" alt="Image" /></p>`;
//   //       // window.location.href = '/panier/';
//   //     } catch (error) {
//   //       console.error('Erreur AJAX :', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [idProduit]); 

// const [open, setOpen] = React.useState(true);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleNextPanierEtEnregistrement = () => {

//     // Récuperation de l'ID Produit
//     const modal = document.getElementById('customization-modal');
//     if (modal) {
//       const id = modal.getAttribute('data-product-id'); // Récupère l'attribut personnalisé
//       console.log('ID Produit récupéré depuis le modal :', id);
//       setProductId(id); // Met à jour l'état avec l'ID produit
//     } else {
//       console.error("L'élément #customization-modal est introuvable !");
//     }

//     if (!idProduit) {
//       console.error('ID Produit manquant dans le contexte !');
//       return;
//     }

    
//     console.log('!!!!!!!!!! ICI LE RESULTAT DU productId :', productId);
//     const fetchData = async () => {
//       try {
//         const response = await fetch(MyPluginAjax.ajax_url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: new URLSearchParams({
//             action: 'add_custom_product_to_cart',
//             product_id: productId, 
//             custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${pathImageGenerate}" alt="Image" width="100" height="100" /></p>`,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`Erreur HTTP : ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('Résultat de la requête AJAX :', result);
//         // const customText = `<p>ID cadre : ${navigationId}</p><p><img src="${pathImageGenerate}" alt="Image" /></p>`;
//         if (result) {
//           window.location.href = '/panier/';
//         }
//       } catch (error) {
//         console.error('Erreur AJAX :', error);
//       }
//     };
//     fetchData();

//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     window.scrollTo(0, 0);
//   };

//   return (
//     <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
//       <Typography variant="h4">Envoi des données au serveur...</Typography>
//       {/* {productId && <p>ID produit détecté : {productId}</p>}
//       <p>ID cadre : {navigationId}   </p>
//       <p><img src={previsuOwnVisu} alt="Image" /></p>
//       <p><img src={pathImageGenerate} alt="Image" /></p> */}
//       <div>
//       {/* <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       > */}
//         <Box sx={style}>
//           {!lienResultatJ2V ? (
//             <Box>
//               <CircularProgress disableShrink sx={{marginBottom: "10px"}}/>
//               <Typography id="modal-modal-title" variant="h5" component="h2">
//                 Envoi des données au serveur...
//               </Typography>
//               <Typography id="modal-modal-title" variant="h5" component="h2">
//                 ... L’opération peut prendre entre une et 3 minutes selon la taille des médias envoyés, Vous pourrez voir le résultat de votre vidéo à la fin de cette étape.
//               </Typography>
//             </Box>
//           ) : 
//           (
//             <Box sx={{display: "flex", flexDirection: 'column', gap: 4, alignItems: "center"}}>
//               <Typography id="modal-modal-title" variant="h5" component="h2">
//               Félicitations, Voici votre vidéo générée avec Memenza!
//               </Typography>
//               <Box
//                 component="video"
//                 src={lienResultatJ2V}
//                 controls
//                 sx={{ width: "60%", objectFit: "contain" }}
//               />
//               <Button
//                 type="button"
//                 variant="contained"
//                 onClick={handleNextPanierEtEnregistrement}
//                 sx={{ mt: 4, mr: "1rem" }}
//               >
//                 Vers le panier
//               </Button>
//               <Button
//                       disabled={activeStep === 0}
//                       // disabled={activeStep === 0 || !isGenerate}
//                       onClick={handleBack}
//                       sx={{ mr: 1 }}
//                     >
//                       Retour
//                     </Button>
//             </Box>
//             )
//             }
//           </Box>
        
            
//           {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography> */}
//       {/* </Modal> */}
//     </div>
//     </Box>
//   );
// };

// export default SendDataToServer;
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import LinearBuffer from '../componentsMemenza/LinearBuffer.jsx';
import { Margin } from '@mui/icons-material';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflowY: 'auto',  // Permet le défilement vertical si le contenu dépasse la hauteur définie
  zIndex: 9999,  // S'assure que la modal sera toujours au-dessus
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Fond semi-transparent pour opacifier l'arrière-plan
  zIndex: 9998,  // S'assurer que l'overlay est sous la modal mais au-dessus du reste du contenu
};

const SendDataToServer = ({ activeStep, setActiveStep }) => {
    const { videoCreationFail, 
      setVideoCreationFail,
      modalVideoGenere, 
      setModalVideoGenere, 
      lienResultatJ2V, 
      idProduit, 
      setIdProduit, 
      navigationId, 
      previsuOwnVisu, 
      imageVisuelPath, 
      pathImageGenerate, 
      outputFilePathContext } = useSousCat(); 

      // NE PAS EFFACER - Vérification du résultat du lien du retour de J2V
  // console.log("RESULTAT de lienResultatJ2V coté SENDDATATOSERVEUR : " + lienResultatJ2V);
  
  const [productId, setProductId] = useState();
  
  useEffect(() => {
    const modal = document.getElementById('customization-modal');
  
    if (modal) {
      const id = modal.getAttribute('data-product-id');
      console.log('ID Produit récupéré depuis le modal :', id);
      setProductId(id);
    } else {
      console.error("L'élément #customization-modal est introuvable !");
    }
  
    // Log uniquement après la mise à jour de l'état
    console.log("IDPRODUIT : " + productId);
  
  }, []); // Effet exécuté une seule fois, après le premier rendu
  

  const handleNextPanierEtEnregistrement = () => {

    console.log('RESULTAT DU productId :', productId);

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
        if (result) {
          window.location.href = '/panier/';
        }
      } catch (error) {
        console.error('Erreur AJAX :', error);
      }
    };
    fetchData();

  }

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
    setModalVideoGenere(false)
  };

  return (
    <>
      {/* Overlay pour opacifier l'arrière-plan */}
      <div style={overlayStyle} />
  
      {/* Modal */}
      <Box
        sx={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',  // Empêche le défilement
          maxHeight: '100vh',  // Assure que la modal n'excède pas la hauteur de la fenêtre
          padding: '20px',
        }}
      >
        {!lienResultatJ2V ? (
          videoCreationFail ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" color="error">
              Une erreur est survenue !
            </Typography>
            <Typography variant="h6" color="error">
              Merci de vérifier que vos medias soit bien en format paysag et que le media ne soit pas une vidéo.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px' }}
              // onClick={() => setModalVideoGenere(false)}
              onClick={() => {
                setModalVideoGenere(false); // Ferme la modale
                setVideoCreationFail(false); // Réinitialise l'état d'échec
              }}
            >
              Réessayer
            </Button>
          </Box>
          ) : (
          <Box sx={{ textAlign: 'center' }}>
            {/* <CircularProgress disableShrink /> */}
            <Typography variant="h5">Envoi des données au serveur...</Typography>
            <LinearBuffer sx={{Margin: "10px 0px"}} />
            <Typography variant="body1">
              L’opération peut prendre entre une et 3 minutes selon la taille des médias envoyés.
            </Typography>
          </Box>
        ) )

        :  (
          <Box sx={{ display: "flex", flexDirection: 'column', gap: 4, alignItems: "center", flexGrow: 1 }}>
            <Typography variant="h5">Félicitations, voici votre vidéo générée avec Memenza!</Typography>
            <Box component="video" src={lienResultatJ2V} controls sx={{ width: {xs: "100%", sm: "70%"}, objectFit: "contain", maxHeight: '90vh' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, p: {xs: "5px 10px !important", sm: "16px 35px !important"}, fontSize: {xs: "0.7rem !important", sm: "19px !important"}}}
              >
                Retour
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPanierEtEnregistrement}
                sx={{ ml: 1, p: {xs: "5px 10px !important", sm: "16px 35px !important"}, fontSize: {xs: "0.7rem !important", sm: "19px !important"}}}
              >
                Vers le panier
              </Button>
            </Box>
          </Box>
        )
        }
      </Box>
    </>
  );
  
  
};

export default SendDataToServer;
