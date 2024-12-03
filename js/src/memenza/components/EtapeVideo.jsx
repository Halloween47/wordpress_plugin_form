import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  TextField,
  Typography,
  Box,
  Container,
  styled,
  Grid,
} from "@mui/material";

import { purple } from "@mui/material/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import MemenzaChoixVideo from "./MemenzaChoixVideo.jsx";
import PopupPreview from "./PopupPreview.jsx";
import { useSousCat } from "./SousCatContext.jsx";

const StyleEtapeVideo = `
  .etape-video {
    background-color: #f5f5f5;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: black;
  }
  .etape-video-intro {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .etape-video-intro-img {
    background-color: #e0e0e0;
    width: 40%;
    border-radius: 8px;
  }
  .etape-video-intro-txt {
    width: 50%;
    color: #333;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .etape-video-template {
  display: flex;
  flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .etape-video-upload-video {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .etape-video-personnalisation-video {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  .upload-media {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  .etape-video-boutons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;

const imgIntroVideo = [
  // "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
  "https://memenza.fr/visuels/personnaliservideo.png",
];

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

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

function EtapeVideo() {

  const [formData, setFormData] = useState({
    "video_path": "",
    "desc": "Version POC (Version template personnel)",
  });

  console.log("LIGNE 129 : " + JSON.stringify(formData));
  

  // const [showTextCustomVideo, setShowTextCustomVideo] = useState(false);
  // const handleVideoSend = () => {
  //   setShowTextCustomVideo(true);
  // };

  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITHOUT_TPL = "https://core-api.memenza.fr/api/wp-media/create-without-tpl";

  const handleVideoSendWithOutTemplate = async () => {
    try {
      const response = await axios.post(
        API_URL_WITHOUT_TPL , 
        formData ,
        {
          headers: {
            'WP-API-KEY': API_KEY,
            'Content-Type': 'application/json',
            },
        }
      );
  console.log("LIGNE 167 REPONSE : "+ response.data);
  
      if (response.status === 200) {
        console.log("Données envoyées avec succès :", response.data);
      } else {
        console.error("ICI ERREUR CATCH STATUS Erreur lors de l'envoi des données :", response.statusText);
      }
    } catch (error) {
      console.error("ICI ERREUR CATCH Erreur lors de l'envoi des données :", error);
      if (error.response) {
        console.error("Erreur API :", error.response.data);
        console.error("Statut HTTP :", error.response.status);
        console.error("Headers :", error.response.headers);
      } else if (error.request) {
        console.error("Aucune réponse reçue du serveur :", error.request);
      } else {
        console.error("Erreur lors de la configuration de la requête :", error.message);
      }
    }
  };

  // Fonction pour gérer l'upload de vidéo
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Récupérer le premier fichier sélectionné
    if (file) {
      const videoURL = URL.createObjectURL(file); // Générer une URL locale
      setFormData((prevData) => ({
        ...prevData,
        video_path: videoURL, // Mettre à jour l'état avec le lien vidéo
      }));
      console.log("Lien local de la vidéo :", videoURL);
    }
  };

  return (
    <Container className="etape-video" maxWidth="lg">
      <Box className="etape-video-intro">
        <Box className="etape-video-intro-img">
          <img
            src={imgIntroVideo}
            alt="Wedding"
            // style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            style={{ width: "100%",
              height: "100%",
              borderRadius: "8px",
              objectFit: "cover", }}
          />
        </Box>
        <Box className="etape-video-intro-txt">
          <Typography variant="h4" color="textPrimary" sx={(theme) => ({
    mb: 1,
    fontSize: {
      xs: '1.5rem',  // petite taille d'écran
      sm: '2rem',    // taille intermédiaire
      md: '2.5rem',  // écran moyen
      lg: '3rem',    // grand écran
    },
  })}>
            Créer votre vidéo
          </Typography>
          <Typography variant="body1" color="textPrimary"  sx={(theme) => ({
    pr: 3,
    fontSize: {
      xs: '0.875rem', // petite taille d'écran
      sm: '1rem',     // taille intermédiaire
      md: '1.125rem', // écran moyen
      lg: '1.25rem',  // grand écran
    },
  })}>
            Grâce aux modèles Memenza, créez une vidéo associée à votre produit (accessible via le QR Code). Vous pouvez aussi directement uploader une vidéo d’une minute de votre choix (créée par exemple avec Capcut). La vidéo doit-être en 16/9ème, 50Mo maximum.
          </Typography>
        </Box>
      </Box>

      <Box className="etape-video-template">
        <MemenzaChoixVideo />
        {/* <ColorButton variant="contained" onClick={handleVideoClickCustom}>Je choisi ce template</ColorButton> */}
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ColorButton
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleVideoSend}
          >
J'envoie mes données de paramétrage.
          </ColorButton>
        </Box> */}

        <Root>
          <Divider> OU </Divider>
          <Box className="etape-video-upload-video">
            {/* <DownloadButton /> */}
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Uploader sa propre Video
              {/* <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              /> */}
              <VisuallyHiddenInput
            type="file"
            accept="video/*" 
            onChange={handleFileUpload} 
          />
            </Button>
          </Box>
          {formData.video_path && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Prévisualisation de la vidéo :
          </Typography>
          <video
            src={formData.video_path}
            controls
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Votre navigateur ne prend pas en charge la vidéo.
          </video>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleVideoSendWithOutTemplate}
            >
              Envoyer votre vidéo
            </Button>
          </Box>
        </Box>
      )}
          {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            // onClick={handleVideoSendWithOutTemplate}
            // onClick={handleTestCompleteJsonTab}
          >
Uploader sa propre Video (en cours)
          </Button>
    </Box> */}
        </Root>
      </Box>
      {/* {showTextCustomVideo && (
        <Box className="etape-video-personnalisation-video">
          <Typography variant="h5" gutterBottom>
            Personnalisez votre vidéo
          </Typography>
          <Divider> ICI VOTRE TEXTE </Divider>
          <Box className="etape-video-personnalisation-video-medias">
            {[1, 2, 3].map((media) => (
              <Box className="upload-media" key={media}>
                <Typography variant="body2">Média {media} :</Typography>
                <Button variant="contained" color="primary">
                  Upload votre média
                </Button>
              </Box>
            ))}
            <Divider style={{ margin: "20px 0" }} />
            {[1, 2].map((text) => (
              <Box className="upload-media" key={`text-${text}`}>
                <Typography variant="body2">Texte {text} :</Typography>
                <TextField
                  id={`filled-basic-${text}`}
                  label={`Text ${text}`}
                  variant="filled"
                  size="small"
                />
                <Checkbox
                  defaultChecked
                  {...{ inputProps: { "aria-label": "Checkbox demo" } }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )} */}

      <Box className="etape-video-boutons">
        <ButtonGroup>
          <PopupPreview />
          <Button variant="contained" color="success">
            J'envoie
          </Button>
        </ButtonGroup>
      </Box>

      <style>{StyleEtapeVideo}</style>
    </Container>
  );
}

export default EtapeVideo;
