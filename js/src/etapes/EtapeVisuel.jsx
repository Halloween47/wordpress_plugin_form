import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PopupUpload from "../memenza/components/PopupUpload.jsx";
import TestGeneration from "../memenza/components/TestGeneration.jsx";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

// Styled Components
const FormGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
});

const StyleEtapeVisuel = styled.div`
  .selected-card {
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 105, 180, 0.6);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 1;
    }

    &.selected::after {
      opacity: 1;
      z-index: 0;
    }

    .check-icon {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: green;
      font-size: 2rem;
      z-index: 3;
    }
  }
`;

// Composant VisuelCard
const VisuelCard = ({ item, isSelected, onClick }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card
      className={`selected-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      sx={{
        transform: 'scale(1.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        padding: '20px',
        '&:hover': {
          transform: 'scale(1.15)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={item.img_modele}
        alt={item.nom_modele}
      />
      <CardContent>
        <Typography>{item.nom_modele}</Typography>
        {isSelected && (
          <CheckCircleIcon className="check-icon" />
        )}
      </CardContent>
    </Card>
  </Grid>
);

const EtapeVisuel = () => {
  const { selectedSousCatId } = useSousCat();
  const [selectedVisuelId, setSelectedVisuelId] = useState(null);
  // console.log("SELECTEDVISUELID : " + JSON.stringify(selectedVisuelId)); 
  const [imagesVisuels, setImagesVisuels] = useState([]);
  // console.log("TOUS LES RESULTATS DU FETCH image_visuels : " + JSON.stringify(imagesVisuels));
  const [showTextCustomVisuel, setShowTextCustomVisuel] = useState(false);  
  const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);
  // console.log("TOUS LES RESULTATS DU FILTRES image_visuels : " + JSON.stringify(tableauFiltrePourVignette));



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/images_visuel");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        const result = await response.json();
        setImagesVisuels(result);
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleVisuelClickCustom = (id) => {
    setSelectedVisuelId(id);
    setShowTextCustomVisuel(true);
    const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
    console.log("RESULTAT DU CLIC VIGNETTES : " + selectedVisuelId + " " + id + " " +
      JSON.stringify(filtreSelonVignetteSelectionne));
  
  };


  return (
    <Box sx={{ textAlign: "center", p: 4, bgcolor: "#f5f5f5" }}>
      <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
        <Typography variant="h5" color="textSecondary">Choisissez votre modèle</Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {tableauFiltrePourVignette.map((item, index) => (
          <VisuelCard
            key={index}
            item={item}
            isSelected={selectedVisuelId === item.id_modele_cadre}
            onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
          />
        ))}
      </Grid>

      {showTextCustomVisuel && <TestGeneration />}

      <Divider sx={{ mt: 2 }}>OU</Divider>
      <FormGrid sx={{ width: "50%", mt: 2 }}>
        <PopupUpload />
      </FormGrid>

      <StyleEtapeVisuel />
    </Box>
  );
};

export default EtapeVisuel;
