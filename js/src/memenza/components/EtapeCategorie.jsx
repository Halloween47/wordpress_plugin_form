import React, { useState } from "react";
import Sliders from "./Sliders.jsx";
import MemenzaSousCategories from "./MemenzaSousCategories.jsx";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "#000",
};

function EtapeCategorie() {
  const [showSliders, setShowSliders] = useState(false);

  function handleImageClick() {
    setShowSliders(true);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="memenza-categories">
      <h2>Choisissez votre catégorie.</h2>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Sliders onImageClick={handleImageClick} />
      {showSliders && <MemenzaSousCategories />}
    </div>
  );
}

export default EtapeCategorie;
