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
import { useSousCat } from "./GestionEtat.jsx";

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

// function ChoixPropreVisuel({fileUrl}) {
function ChoixPropreVisuel() {
  const { navigationId, previsuOwnVisu, setPrevisuOwnVisu } = useSousCat();
  const [fileForSend, setFileForSend] = useState(null);
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
  //   console.log("Event object:", event);
  // console.log("Target:", event.target);
  // console.log("Files:", event.target.files);
  console.log("Files0:", event.target.files[0]);
    const file = event.target.files[0];
    setFileForSend(file);
    // console.log("FILE DU HANDLECHANGE2 : " + JSON.stringify(file.name));
    
    if (file) {
      const generatedUrl = URL.createObjectURL(file); // Génère une URL temporaire pour le fichier
      // console.log("Generated file URL:", generatedUrl);
      setFileUrl(generatedUrl); 
      setPrevisuOwnVisu(generatedUrl)
    }
  };
  // useEffect(() => {
  //   if (fileUrl) {
  //     console.log("FILEURL CONTENU (après mise à jour): " + fileUrl);
  //   }
  // }, [fileUrl]);
  
  const handleSubmitOwnFile = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
  
    // Vérifie si un fichier a été sélectionné
    if (!fileForSend) {
      console.error("Aucun fichier sélectionné.");
      alert("Veuillez sélectionner un fichier avant de le sauvegarder.");
      return;
    }
    
    // console.log("fileForSend === :", JSON.stringify(fileForSend.name));
    try {
      // Crée un FormData pour inclure les données du fichier
      const formData = new FormData();
      formData.append("file", fileForSend); 
      // formData.append("destinationName", "testTom"); 
      
      // const dynamicName = `test${fileForSend.name.substring(fileForSend.name.lastIndexOf("."))}`; // Génère "Media1", "Media2", etc., basé sur l'index
      // formData.append("destinationName", dynamicName); 

      const fileExtension = fileForSend.name.substring(fileForSend.name.lastIndexOf("."));
      const dynamicName = navigationId + fileExtension; // Combine l'ID avec l'extension du fichier
      formData.append("destinationName", dynamicName);

      // formData.append("destinationName", navigationId); 
      formData.append("destinationFolder", "default"); 
  
      // Affiche le contenu de formData pour déboguer (facultatif)
      // console.log("Contenu de FormData :", Array.from(formData.entries()));
      // console.log("FormData :", JSON.stringify(formData));
  
      // Envoie le fichier via une requête POST
      const uploadResponse = await fetch(
        // "../../wp-content/plugins/ProductImageCustomizer/js/upload-media.php",{
        "../../wp-content/plugins/ProductImageCustomizer/js/upload-media2.php",{
          method: "POST",
          body: formData,
        }
      );
  
      // Gère la réponse du serveur
      // if (uploadResponse.ok) {
      //   const result = await uploadResponse.json(); 
      //   console.log("Fichier envoyé avec succès :", result);
      // } else {
      //   console.error(
      //     "Erreur lors de l'envoi :",
      //     uploadResponse.status,
      //     uploadResponse.statusText
      //   );
      // }
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
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
                      primary="Information sur l'image : Vous pouvez uploader un visuel au format 1086*1086 pixels (ou format carré équivalent)"
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
            // onClick={() => {
            //   console.log("Final imageFields:", imageFields);
            //   handleClose();
            // }}
            onClick={(event) => handleSubmitOwnFile(event, fileForSend)}
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

