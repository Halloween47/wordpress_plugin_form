
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { CardMedia, Paper, Snackbar, Alert } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSousCat } from "./GestionEtat.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 10000,
};

function ChoixPropreVisuel() {
  const { navigationId, previsuOwnVisu, setPrevisuOwnVisu } = useSousCat();
  const [fileForSend, setFileForSend] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [dense, setDense] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setFileForSend(file);
    setIsSaved(false);
    setSnackbarOpen(false);

    if (file) {
      const generatedUrl = URL.createObjectURL(file);
      setFileUrl(generatedUrl);
      // setPrevisuOwnVisu(generatedUrl);
    }
  };

  const handleSubmitOwnFile = async (e) => {
    e.preventDefault();

    if (!fileForSend) {
      alert("Veuillez sélectionner un fichier avant de le sauvegarder.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", fileForSend);

      const fileExtension = fileForSend.name.substring(fileForSend.name.lastIndexOf("."));
      const dynamicName = navigationId + fileExtension;
      formData.append("destinationName", dynamicName);
      formData.append("destinationFolder", "default");

      const uploadResponse = await fetch(
        // "../../wp-content/plugins/ProductImageCustomizer/js/upload-media2.php",
        // POUR SIMULATION
        "https://memenza.fr/wp-content/plugins/ProductImageCustomizer/js/upload-media2.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (uploadResponse.ok) {
        setSnackbarOpen(true);
        setIsSaved(true);
        creationDuVisuelSansTemplate();

        // Ajouter un délai avant la fermeture de la fenêtre
        setTimeout(() => {
          setOpen(false);
          setPrevisuOwnVisu(true)
        }, 2000); 
        

      } else {
        console.error("Erreur lors de l'envoi :", uploadResponse.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
    }

  };

  const creationDuVisuelSansTemplate = async (e) => {
    console.log("test fonction de création sans template");

    const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
    const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;
  
    let image2Blob = fileForSend;

    const formPayload = new FormData();
    formPayload.append("text1", '');
    formPayload.append("text2", '');
    formPayload.append("image1", fileForSend, `${navigationId}.png`);
    formPayload.append("image2", fileForSend, `${navigationId}.png`);
    formPayload.append("output_file", outputFilePath); // Destination de la crea cadre
    formPayload.append("dossier", outputFolder); // Créa du dossier pour les medias video
    

    // Appel à process de creation
    try {
      // const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-test.php", {
      // POUR SIMULATION
      const response = await fetch("https://memenza.fr/wp-content/plugins/ProductImageCustomizer/js/process-test.php", {
        method: "POST",
        body: formPayload,
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la soumission du formulaire");
      }

    } catch (error) {
      setError(error.message);
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
        sx={{ zIndex: 10000 }}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 2,
              "& > :not(style)": {
                width: "100%",
              },
            }}
          >
            <List dense={dense}>
              <ListItem disablePadding={true}>
                <ListItemText
                  primary="Information sur l'image : Vous pouvez télécharger un visuel au format 1086*1086 pixels (ou format carré équivalent)"
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CardMedia
              component="img"
              sx={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: "50vh",
              }}
              image={fileUrl || "https://memenza.fr/visuels/placeholder.webp"}
              alt="Prévisualisation du visuel"
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 2 }}
            >
              Choisir un fichier
              <input
                type="file"
                hidden
                onChange={(event) => handleFileChange2(event)}
              />
            </Button>
            {!isSaved && (
              <Button
                variant="contained"
                color="success"
                onClick={(event) => handleSubmitOwnFile(event)}
                sx={{ mt: 2 }}
              >
                Sauvegarder
              </Button>
            )}
            {snackbarOpen && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Image téléchargée avec succès ! Patientez un instant...
              </Alert>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ChoixPropreVisuel;
