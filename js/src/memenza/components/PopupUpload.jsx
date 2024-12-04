import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PopupUpload() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [dense, setDense] = React.useState(false);

  const [imageFields, setImageFields] = useState([
    {
      name: "image1",
      defaultSize: { width: 1806, height: 1806 },
      defaultFile: "visuels/cadres/templates/alexandre_template.png",
    },
    {
      name: "image2",
      defaultSize: { width: 1806, height: 1806 },
      defaultFile: "visuels/cadres/templates/alexandre_template.png",
    },
  ]);

  

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // URL temporaire pour la prévisualisation
      const updatedFields = [...imageFields];
      updatedFields[index].defaultFile = fileUrl;
      setImageFields(updatedFields);
    }
  };

  return (
    <div>
     
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
      >
        Envoyer votre propre visuel
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Personnalisez vos images
          </Typography>
          <Box
              className="popup-upload_zone-infos-qualite"
              sx={{
                // backgroundColor: "#000000",
                // width: "70%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignItems: "center",
                m: 2,
                "& > :not(style)": {
                  // width: 228,
                  width: "100%",
                  // height: 128,
                },
              }}
            >
              <List dense={dense}>
                {/* {generate( */}
                  <ListItem disablePadding={true}>
                    <ListItemText
                      primary="Information sur l'image"
                      secondary={"Vous pouvez uploader un visuels au format 1086*1086 pixels (ou format carré équivalent)"}
                    />
                  </ListItem>,
                {/* // )} */}
              </List>
            </Box>

          {imageFields.map((field, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 3,
                gap: 2,
                width: "100%"
              }}
            >
              <Typography variant="subtitle1">{field.name}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundImage: `url(${field.defaultFile})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Choisir un fichier
                  <input
                    type="file"
                    hidden
                    onChange={(event) => handleFileChange(index, event)}
                  />
                </Button>
              </Box>
            </Box>
          ))}

          <Button
            variant="contained"
            color="success"
            onClick={() => {
              console.log("Final imageFields:", imageFields);
              handleClose();
            }}
          >
            Sauvegarder
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PopupUpload;

