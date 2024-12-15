import * as React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSousCat } from './GestionEtat.jsx';

export default function FormDialog() {
const { navigationId } = useSousCat();
  const [fileUrl, setFileUrl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [fileForSendVideo, setFileForSendVideo] = React.useState(null);

  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITHOUT_TPL = "https://core-api.memenza.fr/api/wp-media/create-without-tpl";


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const EnregistrementPropreVideo = async (e) => {
    
    const file = e.target.files[0];
    console.log("TEST FILE : " + file.name);
// ICI enregistrment du media dans le dossier
    try {
        const formData = new FormData();
        formData.append("file", file);  
  
        const fileExtension = file.name.substring(file.name.lastIndexOf("."));
        const dynamicName = navigationId + fileExtension; // Combine l'ID avec l'extension du fichier
        formData.append("destinationName", dynamicName);
  
        formData.append("destinationFolder", navigationId); 
    
        const uploadResponse = await fetch(
          "../../wp-content/plugins/ProductImageCustomizer/js/upload-media.php",{
            method: "POST",
            body: formData,
          }
        );
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier :", error);
      }

      // On passe à la création du template
      // if (file) {
      //   const generatedUrl = URL.createObjectURL(file); // Génère une URL temporaire pour le fichier
      //   console.log("Generated file URL:", generatedUrl);
      //   setFileUrl(generatedUrl); 
      // }
      const fileEnvoi = `https://memenza.fr/visuels/uploads/${navigationId}/${navigationId}`+ ".mp4";
      console.log("!!!!!!!!!!!!!!!!!!!!!!" + JSON.stringify(fileEnvoi));


      const formDataPourCreationVideo = {
        // "video_path": fileUrl,
        // "video_path": fileEnvoi,
        "video_path": JSON.stringify(fileEnvoi),
        "desc": "",
      };
      try {
        const response = await axios.post(API_URL_WITHOUT_TPL, formDataPourCreationVideo, {
          headers: {
            "WP-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 200 || response.status === 201) {
          console.log("Données envoyées avec succès :", response.data);
        } else {
          console.error("Erreur lors de l'envoi des données :", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi des données pour la création de la vidéo :", error);
      }

  };

  return (
    <React.Fragment>
      <Button 
      // variant="outlined"
      component="label"
        variant="contained" 
      onClick={handleClickOpen} 
      startIcon={<CloudUploadIcon />}
      sx={{backgroundColor : "#1976d2"}}
      >
      Uploader sa propre Vidéo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        sx={{zIndex: "9999"}}
      >
        <DialogTitle>Votre Vidéo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Détails sur les conditions
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: "flex", flexDirection: 'column'}}>
          <Button 
            onClick={handleClose} 
            component="label"
            variant="contained" 
            sx={{ marginBottom: "10px"}}
            >
              Fermer
          </Button>
          <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 2 }}
      >
        Uploader sa propre Vidéo
        <VisuallyHiddenInput type="file" accept="video/*" onChange={EnregistrementPropreVideo} />
      </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}