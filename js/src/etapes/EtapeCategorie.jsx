import React, { useState } from "react";
import Sliders from "../componentsMemenza/CarouselCategories.jsx";
import { Box, Button, Modal, Typography } from "@mui/material";
import SlidersSousCategories from "../memenza/components/SlidersSousCategories.jsx";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();


const style = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "20vh",
  p: 4,
  color: "#000",
};

const StylesSousCategories = `
.memenza-sous-categories {
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 50%;
  // background-color: rgba(164, 111, 251, 0.9);
  background-color: rgba(0,0,0, 0.9);
  position: absolute;
  // height: 85vh;
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

function EtapeCategorie() {
  const [activeStep, setActiveStep] = useState(0);  


  const { setSelectedSousCatId, setNavigationId, selectedSousCatId, navigationId } = useSousCat();
  console.log("LECTURE DU CONTEXTE : " + selectedSousCatId + " " + navigationId);
  
  if(!navigationId) {
    // const generateUniqueId = () => uuidv4();
    // setNavigationId(generateUniqueId)
    // const generateUniqueId = () => "cmd" + Math.floor(10000 + Math.random() * 90000); 
    const generateUniqueId = () => "cmd" + Math.floor(10000 + Math.random() * 90000); 
    const newId = generateUniqueId();
    setNavigationId(newId)
    console.log("TEST NAVIGATION ID : " + navigationId);

  }

  // const handleSelectSousCat = (id) => {
  //   setSelectedSousCatId(id); 
  //   console.log(id);
    
  // };

  const handleSelectSousCat = (id) => {
    setSelectedSousCatId(id); 
    // const uniqueId = generateUniqueId();
    // const uniqueId = uuidv4();
    // setNavigationId(uniqueId);
    setActiveStep(1);  
    console.log(id);
  };

  function handleImageClick() {
    setShowSliders(true);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="memenza-categories">
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
      <Sliders onImageClick={handleOpen} onSousCatClick={handleSelectSousCat} setActiveStep={setActiveStep} />
    </Box>

  );
}

export default EtapeCategorie;
