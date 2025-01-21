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
import { Box, CardMedia, Snackbar, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

// Définir le composant stylisé en dehors de `FormDialog`
const VisuallyHiddenInputPropreVisuel = styled("input")({
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

export default function FormDialog() {
  const { navigationId, pathImageGenerate, } = useSousCat();
  const [envoiReussi, setEnvoiReussi] = React.useState(null);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [fileForSendVideo, setFileForSendVideo] = React.useState(null);
  const [productId, setProductId] = React.useState();

  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITHOUT_TPL = "https://core-api.memenza.fr/api/wp-media/create-without-tpl";

  React.useEffect(() => {
      const modal = document.getElementById('customization-modal');
    
      if (modal) {
        const id = modal.getAttribute('data-product-id');
        console.log('ID Produit récupéré depuis le modal :', id);
        setProductId(id);
      } else {
        console.error("L'élément #customization-modal est introuvable !");
      }
    
      // Log uniquement après la mise à jour de l'état
      console.log("IDPRODUIT : " + productId);
    
    }, []); // Effet exécuté une seule fois, après le premier rendu
    
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const EnregistrementPropreVideo = async (e) => {
    const file = e.target.files[0];
    console.log("Nom du fichier : " + file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const fileExtension = file.name.substring(file.name.lastIndexOf("."));
      const dynamicName = navigationId + fileExtension;

      formData.append("destinationName", dynamicName);
      formData.append("destinationFolder", navigationId);

      const uploadResponse = await fetch(
        "../../wp-content/plugins/ProductImageCustomizer/js/upload-media.php", {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
    }

    const fileEnvoi = `https://memenza.fr/visuels/uploads/${navigationId}/${navigationId}.mp4`;
    console.log("Destination du fichier : " + fileEnvoi);
    setFileUrl(fileEnvoi);
  };

  const handleSendMedia = async () => {
    if (!fileUrl) {
      console.error("fileUrl est invalide :", fileUrl);
      return;
    }

    const formDataPourCreationVideo = {
      video_path: fileUrl,
      desc: "testdesc",
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
        setEnvoiReussi(true);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.statusText);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erreur du serveur :", error.response.data, error.response.status);
      } else if (error.request) {
        console.error("Aucune réponse reçue :", error.request);
      } else {
        console.error("Erreur lors de la configuration de la requête :", error.message);
      }
    }
  };

  const handleNextPanierEtEnregistrement = () => {
    console.log("IDPRODUIT : " + productId);
    console.log('RESULTAT DU productId :', productId);
    
    const fetchData = async () => {
      try {
        const response = await fetch(MyPluginAjax.ajax_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'add_custom_product_to_cart',
            product_id: productId, 
            custom_text: `<p>ID cadre : ${navigationId}</p>` + `<p><img src="${pathImageGenerate}" alt="Image" width="100" height="100" /></p>`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        console.log('Résultat de la requête AJAX :', result);
        if (result) {
          window.location.href = '/panier/';
        }
      } catch (error) {
        console.error('Erreur AJAX :', error);
      }
    };
    fetchData();

  }

  return (
    <React.Fragment>
      <Button
        component="label"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<CloudUploadIcon />}
        sx={{ backgroundColor: "#1976d2" }}
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
        sx={{ zIndex: "9999" }}
      >
        <DialogTitle>Votre Vidéo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Détails sur les conditions
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: 'column' }}>
          {fileUrl && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                component="video"
                src={fileUrl}
                controls
                sx={{ width: "80%", objectFit: "contain" }}
              />
              <Button
                onClick={handleSendMedia}
                component="label"
                variant="outlined"
                color="success"
                sx={{ marginBottom: "10px", marginTop: "10px" }}
              >
                Choisir cette vidéo
              </Button>
              {envoiReussi && (
                <Box>
                  <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Envoi réussi !
                  </Alert>
                  <Button
                  variant="contained"
                  onClick={handleNextPanierEtEnregistrement}
                  sx={{ ml: 1, p: {xs: "5px 10px !important", sm: "16px 35px !important"}, fontSize: {xs: "0.7rem !important", sm: "19px !important"}}}
                  >
                  Continuer vers le panier
                  </Button>
                </Box>
              )}
            </Box>
          )}
          <Button
            onClick={handleClose}
            component="label"
            variant="contained"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
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
            <VisuallyHiddenInputPropreVisuel type="file" accept="video/*" onChange={EnregistrementPropreVideo} />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
