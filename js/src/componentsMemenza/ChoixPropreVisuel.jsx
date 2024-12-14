import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { CardMedia, Paper } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import zIndex from "@mui/material/styles/zIndex";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 10000,
};

function ChoixPropreVisuel() {
  const [fileUrl, setFileUrl] = useState(null);


  const [ownFile, setOwnFile] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [dense, setDense] = React.useState(false);

  const [imageFields, setImageFields] = useState([
    {
      name: "image1",
      defaultSize: { width: 1806, height: 1806 },
      defaultFile: "/visuels/cadres/templates/alexandre.png",
    },
    {
      name: "image2",
      defaultSize: { width: 1806, height: 1806 },
      defaultFile: "/visuels/cadres/templates/bebe.png",
    },
  ]);
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    
    if (file) {
      const fileUrl = URL.createObjectURL(file); // URL temporaire pour la prévisualisation
      console.log("Test file URL : " + fileUrl);
      const updatedFields = [...imageFields];
      updatedFields[index].defaultFile = fileUrl;
      setImageFields(updatedFields);
    }
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const generatedUrl = URL.createObjectURL(file); // Génère une URL temporaire pour le fichier
      console.log("Generated file URL:", generatedUrl);
      setFileUrl(generatedUrl); 
    }
  };
  useEffect(() => {
    if (fileUrl) {
      console.log("FILEURL CONTENU (après mise à jour): " + fileUrl);
    }
  }, [fileUrl]);
  
  

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
        sx={{zIndex: 10000}}
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
            Envoyer votre propre visuel
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
                  {/* <ListItem disablePadding={true}> */}
                  <ListItem disablePadding={true}>
                    <ListItemText
                      primary="Information sur l'image : Vous pouvez uploader un visuels au format 1086*1086 pixels (ou format carré équivalent)"
                      // secondary={"Vous pouvez uploader un visuels au format 1086*1086 pixels (ou format carré équivalent)"}
                    />
                  </ListItem>
                {/* // )} */}
              </List>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}}>
              <CardMedia
                component="img"
                height="194"
                image={fileUrl ||"https://memenza.fr/visuels/placeholder.webp"}
                alt="Paella dish"
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
                onChange={(event) => handleFileChange2(event)}
              />
              </Button>
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
            

          </Box>
      </Modal>
    </div>
  );
}

export default ChoixPropreVisuel;

