/**
 * EtapeCategorie.jsx
 * 
 * Composant React pour gérer l'étape de sélection de catégorie dans un processus multi-étapes.
 * 
 * ## Sommaire des fonctionnalités :
 * (Utilisez "Ctrl + F" pour rechercher les mots-clés indiqués et atteindre rapidement la section correspondante.)
 * 
 * 1. Initialisation (mot-clé : "// INITIALISATION")
 *    - Génération d'un `navigationId` unique si absent.
 * 
 * 2. Sélection de sous-catégories (mot-clé : "// SÉLECTION DE SOUS-CATÉGORIES")
 *    - Gestion de la sélection d'une sous-catégorie (avec défilement vers la vue correspondante).
 *    - Mise à jour de l'état pour autoriser la progression vers l'étape suivante.
 * 
 * 3. Modal (mot-clé : "// MODAL")
 *    - Ouverture et fermeture d'une modal pour afficher des informations supplémentaires.
 * 
 * 4. Progression (mot-clé : "// PROGRESSION")
 *    - Bouton "Suivant" pour passer à l'étape suivante une fois une sous-catégorie sélectionnée.
 * 
 * ## Props :
 * - `activeStep` : Numéro de l'étape active.
 * - `setActiveStep` : Fonction pour mettre à jour l'étape active.
 */

import React, { useEffect, useRef, useState } from "react";
import CarouselCategories from "../componentsMemenza/CarouselCategories.jsx";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

// Style pour la modal
const modalStyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "20vh",
  padding: "16px",
  backgroundColor: "#fff",
  boxShadow: 24,
  borderRadius: "8px",
  color: "#000",
};

function EtapeCategorie({ activeStep, setActiveStep }) {
  const [isSousCatSelect, setIsSousCatSelect] = useState(false);
  const [open, setOpen] = useState(false);
  const sousCatRef = useRef(null);

  const { 
    setSelectedSousCatId, 
    setNavigationId, 
    selectedSousCatId, 
    navigationId 
  } = useSousCat();

  // INITIALISATION
  // Générer un identifiant unique si non défini
  useEffect(() => {
    if (!navigationId) {
      const newId = `cmd${Math.floor(10000 + Math.random() * 90000)}`;
      setNavigationId(newId);
      console.log("Navigation ID généré :", newId);
    }
  }, [navigationId, setNavigationId]);

  // SÉLECTION DE SOUS-CATÉGORIES
  const handleSelectSousCat = (id) => {
    setSelectedSousCatId(id);
    setIsSousCatSelect(true);

    // Scroll vers la section cible si elle existe
    sousCatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    console.log("Sous-catégorie sélectionnée :", id);
  };

  // MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // PROGRESSION
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 0); // Remonte en haut de la page
  };

  return (
    <Box className="memenza-categories">
      <Typography
        variant="h4"
        sx={{
          fontSize: "2.5rem",
          color: "#000",
          margin: "1.5rem 0",
          textAlign: "center",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        Choisissez votre catégorie
      </Typography>

      {/* Composant Carousel */}
      <CarouselCategories
        onImageClick={handleOpen}
        onSousCatClick={handleSelectSousCat}
      />

      {/* Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6">
            Contenu de la modal
          </Typography>
        </Box>
      </Modal>

      {/* Bouton Suivant */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          type="button"
          variant="contained"
          disabled={!selectedSousCatId}
          onClick={handleNext}
          sx={{
            mt: 2,
            marginRight: "1rem",
          }}
        >
          Suivant
        </Button>
      </Box>
    </Box>
  );
}

export default EtapeCategorie;
