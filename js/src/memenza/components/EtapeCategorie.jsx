import React, { useState } from "react";
import Sliders from "./Sliders.jsx";
import { Box, Button, Modal, Typography } from "@mui/material";
import SlidersSousCategories from "./SlidersSousCategories.jsx";

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
  background-color: rgba(164, 111, 251, 0.9);
  position: absolute;
  height: 85vh;
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
          mb: "1.5rem",
          textAlign: "center",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        Choisissez votre catégorie.
      </Typography>
      <Sliders onImageClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="memenza-sous-categories">
            <h2>Choisissez votre sous-catégorie</h2>
            <SlidersSousCategories />
            <Button
              variant="contained"
              sx={{ position: "absolute", bottom: "5%", right: "5%" }}
            >
              Visuel
            </Button>
            <style>{StylesSousCategories}</style>
          </div>
        </Box>
      </Modal>
    </Box>
  );
}

export default EtapeCategorie;
