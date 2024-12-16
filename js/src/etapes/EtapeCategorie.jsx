import React, { useRef, useState } from "react";
import CarouselCategories from "../componentsMemenza/CarouselCategories.jsx";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import { v4 as uuidv4 } from "uuid";
import IdProduit from "./Test.jsx";
import SendDataToServer from "./SendDataToServer.jsx";

// Style pour la modal
const modalStyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "20vh",
  p: 4,
  color: "#000",
};

// Style CSS pour les sous-catégories
const StylesSousCategories = `
.memenza-sous-categories {
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
.memenza-sous-categories .MuiButton-root {
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 500;
  background-color: #ffffff;
  color: #a46ffb;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.memenza-sous-categories .MuiButton-root:hover {
  background-color: #f0e6ff;
  transform: scale(1.05);
}
.memenza-sous-categories .MuiButton-root:focus {
  outline: 2px solid #ffffff;
  outline-offset: 4px;
}
`;

function EtapeCategorie({ activeStep, setActiveStep }) {
  const [productId, setProductId] = useState();
  const [isSousCatSelect, setIsSousCatSelect] = useState(false);
  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };
  // const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const sousCatRef = useRef(null);

  const { idProduit, setIdProduit, setSelectedSousCatId, setNavigationId, selectedSousCatId, navigationId } = useSousCat();
console.log("l'id pruit est bien passé : " + JSON.stringify(idProduit));

  // Générer un identifiant unique si non défini
  if (!navigationId) {
    const newId = `cmd${Math.floor(10000 + Math.random() * 90000)}`;
    setNavigationId(newId);
    console.log("Navigation ID généré :", newId);
  }

  // Gestion de la sélection d'une sous-catégorie
  const handleSelectSousCat = (id) => {
    setSelectedSousCatId(id);
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
    setIsSousCatSelect(true);
    // setActiveStep(1);

    // Scroll vers la section cible
    if (sousCatRef.current) {
      sousCatRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    console.log("Sous-catégorie sélectionnée :", id);
  };

  // Gestion de l'ouverture et de la fermeture de la modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/wp-json/plugin_memenza/v1/id_produit_perso");
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
          }
          const result = await response.json();
          console.log("ID PERSO RESPONSE : " + JSON.stringify(result));
          
        } catch (error) {
          console.error("Erreur :", error);
        }
      };
      fetchData();
    }, []);

    // React.useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch("/wp-json/plugin_memenza/v1/id_produit_perso");
    //       if (!response.ok) {
    //         throw new Error("Erreur lors de la récupération des données");
    //       }
    //       const result = await response.json();
    //       console.log("ID PERSO RESPONSE : " + JSON.stringify(result));
    //       // Assurez-vous que l'ID du produit est bien extrait de la réponse
    //       const productId = result?.product_id; // Exemple, selon la structure de la réponse
    //       setProductId(productId)
    //       // Vous pouvez alors utiliser cet ID pour le transmettre à d'autres parties de votre application
    //       console.log("ID du produit récupéré : ", productId);
    //     } catch (error) {
    //       console.error("Erreur :", error);
    //     }
    //   };
    //   fetchData();
    // }, []);
    

  return (
    <Box className="memenza-categories">
      {/* <IdProduit productId={productId} /> */}
      {/* <SendDataToServer idProduit={idProduit}/> */}
      {/* <IdProduit /> */}
      {/* <SendDataToServer/> */}
      <Typography
        variant="h4"
        sx={{
          fontSize: "2.5rem",
          color: "#000000",
          mt: "1.5rem",
          mb: "1.5rem",
          textAlign: "center",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        Choisissez votre catégorie.
      </Typography>
      <CarouselCategories
        onImageClick={handleOpen}
        // onSousCatClick={handleSelectSousCat}
        onSousCatClick={(id) => {
          setSelectedSousCatId(id); 
          setIsSousCatSelect(true); 
        }}
        // setActiveStep={setActiveStep}
      />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          {/* Contenu de la modal ici */}
          <Typography id="modal-title" variant="h6">
            Contenu de la modal
          </Typography>
        </Box>
      </Modal>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          type="button"
          variant="contained"
          disabled={!selectedSousCatId}
          onClick={handleNext}
          sx={{ 
            mt: 2, 
            mr: "1rem",
            // position: "absolute", 
            // right: "1.5rem", // Distance du bord droit de l'écran
            // bottom: "1rem",
          }}
        >     
          {/* Suivant après choix categories */}
          Suivant
        </Button>
      </Box>
    </Box>
  );
}

export default EtapeCategorie;

