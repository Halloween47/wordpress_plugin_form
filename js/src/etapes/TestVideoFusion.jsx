import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
//   Tooltip,
  IconButton,
  Modal,
  CircularProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import styled from "styled-components";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ChoixPropreVideo from "../componentsMemenza/ChoixPropreVideo.jsx";
import SendDataToServer from "./SendDataToServer.jsx";
import zIndex from "@mui/material/styles/zIndex.js";

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
const ButtonForm = styled("button")({
    marginTop: "0px",
    padding: "5px 20px",
    backgroundColor: "rgba(0,0,0,0)"
})
const stylePrevisu = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  // bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};
const StylesTest = `
.test-modificationButton {
  background-color: red !important;
  margin: 0 !important;
  padding: 0 !important;
  font-size: inherit !mportant;
}

.etape-video-intro {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .etape-video-intro-img {
    background-color: #e0e0e0;
    // width: 40%;
    border-radius: 8px;
  }
  .etape-video-intro-txt {
    width: 100%;
    color: #333;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
  }

`;

const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    return (
      <div
        style={{ position: "relative", display: "inline-block" }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#333",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
              whiteSpace: "nowrap",
              zIndex: 9999,
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
          >
            {text}
          </div>
        )}
      </div>
    );
  };

  const EtapeVideo = ({ activeStep, setActiveStep }) => {
    const { videoCreationFail, setVideoCreationFail,modalVideoGenere, setModalVideoGenere, setLienResultatJ2V, imageVisuelPath, selectedSousCatId, navigationId, outputFilePathContext } = useSousCat();
    // const [modalVideoGenere, setModalVideoGenere] = React.useState(false);
    
    const [openPrevisu, setOpenPrevisu] = React.useState(true);
      const handleOpenPrevisu = () => setOpen(true);
      const handleClosePrevisu = () => setOpen(false);

    const [reponseJ2VOK, setReponseJ2VOK] = useState(false);
    const [checkedFields, setCheckedFields] = useState({});

  const [check, setCheck] = useState(false);
  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1); // Incrémenter l'étape
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };
  const [isMediaSaved, setIsMediaSaved] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [nomTemplate, setNomTemplate] = useState("");
  const [variables, setVariables] = useState({});  
  console.log("DATAS prêt pour envoi : " + JSON.stringify(variables));
  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
  const [tabParseMediasVideo, setTabParseMediasVideo] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [mediaCounter, setMediaCounter] = useState(1);
  const [mediaFiles, setMediaFiles] = React.useState([]);  
  const [fileCounter, setFileCounter] = React.useState(1);
  const [idJ2V, setIdJ2V] = React.useState(1);
  const videoRefs = useRef([]);
  
  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITH_TPL = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";
  const API_URL_WITHOUT_TPL = "https://core-api.memenza.fr/api/wp-media/create-without-tpl";
  
  const variablesString = JSON.stringify(variables);
  
  const imagesVideosFiltered = visuelsVideos.filter(
    (item) => item.id_ss_cat === selectedSousCatId
  );
  // console.log("POUR AFFICHADE IMAGE VIDEO : " + JSON.stringify(imagesVideosFiltered));

  const imagesVideosFilteredParNomTemplate = visuelsVideos.filter(
    (item) => item.nom_modele_video === nomTemplate
  );
  // console.log("REPONSE imagesVideosFilteredParNomTemplate : " + JSON.stringify(imagesVideosFilteredParNomTemplate));

  const imagesVideosFilteredPourIdJ2V = visuelsVideos.find(
    (item) => item.id_json2video
  );
  // console.log("REPONSE J2V : " + JSON.stringify(imagesVideosFilteredPourIdJ2V));
  
  // console.log("VERIF imagesVideosFilteredParNomTemplate en premiere position : "  + JSON.stringify(imagesVideosFilteredParNomTemplate));
  

  // Récuperation données de videos_visuel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/videos_visuel");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setVisuelsVideos(result);
        // console.log("RESULTAT FETCH : " + JSON.stringify(result));
        
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    fetchData();
  }, []);
  if (!imagesVideosFiltered.length) {
      return <Typography>Chargement des templates...</Typography>;
    }

  const handleVariableChange = (key, value) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [key]: value,
    }));
  };
  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    ////////////////////
    ////////////////////
    if (file) {
      setCheck(true);      
    }
    ////////////////////
    ////////////////////
    setMediaFiles((prevFiles) => [
      ...prevFiles,
      { fieldName, file }, 
    ]);
    if (file) {
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        console.error("Seuls les fichiers d'image ou de vidéo sont autorisés.");
        return;
      }
      
      const fileExtension = file.name.split('.').pop(); // Récupère la partie après le dernier "."
      const validExtension = fileExtension && fileExtension.length <= 5 ? fileExtension : 'unknown';

      const mediaName = `media${mediaCounter}.${validExtension}`;
      console.log("Nom de fichier généré : ", mediaName);

      // setMediaName(mediaName);
      setVariables((prevState) => ({
        ...prevState,
        // [fieldName]: 'https://memenza.fr/visuels/uploads/' + navigationId + "/" + file.name, 
        [fieldName]: `https://memenza.fr/visuels/uploads/${navigationId}/${mediaName}`, 
      }));
      // console.log("Fichier sélectionné :", file.name);
      setCheckedFields((prevChecked) => ({
        ...prevChecked,
        [fieldName]: true,
      }));

      setMediaCounter((prevCount) => prevCount + 1);
    }
  };
  
  const handleSendMedia = async (fieldName) => {
    // console.log("CONTENU DE MEDIA");
    const mediaData = mediaFiles.find((item) => item.fieldName === fieldName);
    if (!mediaData) {
      console.error("Aucun fichier trouvé pour ce champ :", fieldName);
      return;
    }
    const { file } = mediaData;
    // console.log("VIDEO CONTENT FILE : " + JSON.stringify(file));
    
    if (!file) {
      console.error("Aucun fichier sélectionné.");
      return;
    }
    // Génère un nom dynamique basé sur le compteur actuel
    const dynamicName = `media${fileCounter}${file.name.substring(file.name.lastIndexOf("."))}`;
    // console.log("Nom dynamique généré :", dynamicName);
    // Prépare les données pour l'envoi
    const formData = new FormData();
    formData.append("file", file);
    
    // Identifier le champ en cours dans `tabParseMediasVideo` et générer un nom dynamique
  const fieldIndex = tabParseMediasVideo.findIndex((field) => field.name === fieldName);
  if (fieldIndex !== -1) {
    // const dynamicName = `Media${fieldIndex + 1}`; // Génère "Media1", "Media2", etc., basé sur l'index
    const dynamicName = `media${fieldIndex + 1}${file.name.substring(file.name.lastIndexOf("."))}`; // Génère "Media1", "Media2", etc., basé sur l'index
    // console.log("Nom dynamique généré (2) :", dynamicName);
    // Ajouter le nom dynamique dans formData
    formData.append("destinationName", dynamicName);
  } else {
    console.error("Champ non trouvé dans tabParseMediasVideo :", fieldName);
    return;
  }

    formData.append("destinationFolder", navigationId);
    console.log("ID A LENVOI de navigatonId : " + JSON.stringify(navigationId));
    
  
    // Incrémente le compteur pour le prochain fichier
    setFileCounter((prevCounter) => prevCounter + 1);
  
    try {
      // Effectue l'envoi des données
      const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/upload-media.php", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // console.log("Fichier envoyé avec succès :", await response.json());
      } else {
        console.error("Erreur lors de l'envoi :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
      if (error.response) {
        console.log("Réponse d'erreur:", error.response);
        console.log("Code d'état:", error.response.status);
        console.log("Données d'erreur:", error.response.data);
        console.log("Message d'erreur:", error.response.statusText);
      } else if (error.request) {
        console.log("Erreur de requête:", error.request);
      } else {
        console.log("Erreur lors de la configuration de la requête:", error.message);
      }
    }
  };
  

  const handleTest = (srcVid, nomVid) => {
    // setIsClicked(true);
    setOpenModal(true);
    setCurrentVideoSrc(srcVid);
    setNomTemplate(nomVid);    

    // console.log("Dans la console, personne ne vous entendra crier : "  + JSON.stringify(visuelsVideos));
    const imagesVideosFilteredParNomTemplate = visuelsVideos.filter(
      // (item) => item.nom_modele_video === nomTemplate
      (item) => item.nom_modele_video === nomVid
    );
    // console.log("VERIF imagesVideosFilteredParNomTemplate en DEUXIEME position : "  + JSON.stringify(imagesVideosFilteredParNomTemplate));
    
    // const selectedTemplate = visuelsVideos.find(
    const selectedTemplate = imagesVideosFilteredParNomTemplate.find(
      (item) => item.textes_video && item.medias_video
    );
    // console.log("VERIFICATION TABLEAU selectedTemplate : " + JSON.stringify(selectedTemplate));

    if (!selectedTemplate) {
      console.error("Aucun template sélectionné");
      return;
    }
    const parsedTemplateTextesVideo = JSON.parse(selectedTemplate.textes_video);
    setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields);
    const parsedTemplateMediasVideo = JSON.parse(selectedTemplate.medias_video);
    setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields || []);

    // try {
    //   const parsedTemplateTextesVideo = JSON.parse(selectedTemplate.textes_video);
    //   const parsedTemplateMediasVideo = JSON.parse(selectedTemplate.medias_video);

    //   setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields || []);
    //   setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields || []);
    // } catch (error) {
    //   console.error("Erreur lors du parsing JSON :", error);
    // }

  };
  
  const handleVideoSendWithTemplate = async () => {
    const pourIdTemplateDynamique = imagesVideosFilteredParNomTemplate.find(
      (item) => item.id_json2video
    );
    console.log("En attente ....");

    const formData = {
      "template_id": pourIdTemplateDynamique.id_json2video,
      "desc": "test",
      "variables": JSON.stringify(variables),
    };

    try {
      const response = await axios.post(API_URL_WITH_TPL, formData, {
        headers: {
          "WP-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || 201) {
        console.log("Données envoyées avec succès :", response.data);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const handleSendAllMedia = async () => {
    setIsMediaSaved(true);
    if (mediaFiles.length === 0) {
      console.error("Aucun média enregistré à envoyer.");
      return;
    }
  
    // console.log("Démarrage de l'envoi des fichiers individuellement...");
    
    for (const mediaData of mediaFiles) {
      const { fieldName } = mediaData;
  
      try {
        // Utilisation de handleSendMedia pour chaque fichier
        await handleSendMedia(fieldName);
        console.log(`Fichier associé au champ ${fieldName} envoyé avec succès.`);
      } catch (error) {
        console.error(`Erreur lors de l'envoi du fichier pour le champ ${fieldName} :`, error);
      }
    }
  
    console.log("Envoi de tous les fichiers terminé.");
  };

  const handleVideoSendWithoutTemplate = async () => {
    const formData = {
      "video_path": pourIdTemplateDynamique.id_json2video,
      "desc": "",
    };
    try {
      const response = await axios.post(API_URL_WITHOUT_TPL, formData, {
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
  }

  const handleSendAllMediaAndCreateVideo = async () => {
    setModalVideoGenere(true);
    setLienResultatJ2V(null);
    console.log("Démarrage de l'envoi des médias et création de la vidéo...");
  
    // Étape 1 : Envoi de tous les médias
    if (mediaFiles.length === 0) {
      console.error("Aucun média enregistré à envoyer.");
      return;
    }
  
    try {
      for (const mediaData of mediaFiles) {
        const { fieldName } = mediaData;
  
        try {
          // Utilisation de handleSendMedia pour chaque fichier
          await handleSendMedia(fieldName);
          console.log(`Fichier associé au champ ${fieldName} envoyé avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de l'envoi du fichier pour le champ ${fieldName} :`, error);
          throw new Error("Erreur dans l'envoi des médias. Interruption du processus.");
        }
      }
  
      console.log("Envoi de tous les fichiers terminé.");
      console.log("Création du média en cours...");
    } catch (mediaError) {
      console.error("Erreur globale lors de l'envoi des médias :", mediaError);
      return; // Arrêter si l'envoi des médias échoue
    }
  
    // Étape 2 : Création de la vidéo avec le template
    const pourIdTemplateDynamique = imagesVideosFilteredParNomTemplate.find(
      (item) => item.id_json2video
    );
  
    if (!pourIdTemplateDynamique) {
      console.error("Template dynamique non trouvé !");
      return;
    }
  
    const formData = {
      "template_id": pourIdTemplateDynamique.id_json2video,
      "desc": "test",
      "variables": JSON.stringify(variables),
    };
  
    try {
      const response = await axios.post(API_URL_WITH_TPL, formData, {
        headers: {
          "WP-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        setReponseJ2VOK(true);
        console.log("!!!!!!!!!!!!!!!!!!!!!! REPONSE : " + JSON.stringify(response.data));

        // Extraction du lien Movie URL
        const movieUrl = response.data.match(/Movie URL: (https:\/\/[^\s]+)/)[1];
        console.log("Movie URL:", movieUrl);
        setLienResultatJ2V(movieUrl);

        const qrCode = JSON.parse(response.data.match(/({.*})/)[1]).data.qrcode;
        console.log("ICI LE QR CODE : "+ qrCode);

        const outputTest = 'https://memenza.fr/visuels/cmd/' + navigationId + '.png';
        // const imagePath = 'visuels/cmd/' + navigationId + '.png';
        // const imagePath = 'https://memenza.fr/visuels/cmd/' + navigationId + '.png';
        const imagePath = "visuels/cmd/" + navigationId + '.png';
        console.log("LIEN DE L IMAGE : " + JSON.stringify(imagePath));
        console.log("LIEN OUTPUFILE : " + JSON.stringify(outputTest));
        //////////////////////
        //////////////////////
        const formQR = new FormData();
        formQR.append("qrcode", qrCode);
        // formQR.append("qr_code", qrCode);
        formQR.append("imagecmd", imagePath);
        // formQR.append("imagecmd", );
        // formQR.append("output_file", outputTest);
        console.log("Données envoyées dans formQR :", Array.from(formQR.entries()));

        try {
          const responseQR = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
            method: "POST",
            body: formQR,
          });

          // A NE PAS EFFACER - vérification de la reponse pour le QRCode (si tout ce passe bien)
          console.log("Statut de la réponse :", responseQR.status); // Vérifiez si c'est 200
          console.log("Réponse brute :", await responseQR.text()); // Inspectez la réponse brute

    
          if (!responseQR.ok) {
            throw new Error("Erreur lors de la soumission du formulaire");
          }
    
          const result = await responseQR.blob();
          const url = URL.createObjectURL(result);
          setGeneratedImageUrl(url);
          setIsGenerate(true)
          // console.log("TEST PREVISU VOICI LE RESULT DE LA REPONSE : " + JSON.stringify(result));
          // console.log("TEST PREVISU VOICI LERESULTAT DE LID : " + JSON.stringify(url));
        } catch (error) {
          console.log(error.message);
        }
        //////////////////////
        //////////////////////

        
        console.log("Données envoyées avec succès :", response.data);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données pour la création de la vidéo :", error);
      setVideoCreationFail("Erreur lors de la generation de la video");
    }
  };
  

  return (
    <Box sx={{ textAlign: "center", p: 4, position: "relative" }}>
      <Box className="etape-video-intro">
              <Box className="etape-video-intro-img">
                <img
                  // src={imgIntroVideo}
                  src="https://memenza.fr/visuels/personnaliservideo.png"
                  alt="Wedding"
                  // style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  style={{ 
                    // width: "100%",
                    // height: "100%",
                    width: "100px", 
                    height: "100px",
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
            lg: '1.5rem',  // grand écran
          },
        })}>
                  Grâce aux modèles Memenza, créez une vidéo associée à votre produit (accessible via le QR Code). Vous pouvez aussi directement télécharger  une vidéo d’une minute de votre choix (créée par exemple avec Capcut). La vidéo doit-être en 16/9ème format Paysage, 50Mo maximum.
                </Typography>
              </Box>
            </Box>
      {/* <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 2 }}
      >
        Uploader sa propre Vidéo
        <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileUpload} />
      </Button> */}
      <ChoixPropreVideo />
      <Divider sx={{ color: "black", opacity: 0.6, margin: "10px" }}>OU</Divider>

      <Typography variant="h5">Choisissez votre modèle</Typography>
      <Grid container spacing={4} justifyContent="center">
        {imagesVideosFiltered.map((src, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            onClick={() => handleTest(src.chemin_video_ex, src.nom_modele_video)}
            sx={{ textAlign: "center", cursor: "pointer" }}
          >
            <Typography sx={{ mb: 1 }}>{src.nom_modele_video || "Modèle inconnu"}</Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
                overflow: "hidden",
                borderRadius: 2,
                "&:hover .overlay": { opacity: 1 },
              }}
            >
              <Box
                component="video"
                src={src.chemin_video_ex}
                ref={(el) => (videoRefs.current[index] = el)}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 60, color: "#fff" }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {openModal && (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={6}>
            <Box
              component="video"
              src={currentVideoSrc}
              controls
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ overflowY: "auto", maxHeight: "60vh" }}>
              <Typography variant="h6">Paramétrage du Template</Typography>
              <Typography variant="subtitle1">Une fois le modèle configuré, il est possible de modifier tous les textes et images (les photos étant au format paysage), ou bien de les laisser tels quels, selon vos envies.</Typography>
              {/* {console.log(tabParseTextesVideo)}  */}
              {/* {isClicked && tabParseTextesVideo.map((field, index) => { */}
              {/* {tabParseTextesVideo.map((field, index) => {
                // console.log(field);
                // const match = field.name.match(/^S(\d+)-txt$/);
                const match = field.name.match(/^S(\d+)-txt$/i);

                const dynamicLabel = match ? `Texte ${match[1]}` : field.name;
                return (
                  <Box key={index} sx={{ mt: 2 }}>
                        <Typography>{dynamicLabel}</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={field.defaultText || ""}
                            value={variables[field.name] || ""}
                            onChange={(e) => handleVariableChange(field.name, e.target.value)}
                            />
                    </Box>
                )
                
              })} */}
              {tabParseTextesVideo.map((field, index) => {
    // Expression régulière pour extraire uniquement le numéro
    const match = field.name.match(/^[Ss](\d+)-/); 
    const dynamicLabel = match ? `Texte ${match[1]}` : field.name;
    
    return (
      <Box key={index} sx={{ mt: 2 }}>
        <Typography>{dynamicLabel}</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder={field.defaultText || ""}
          value={variables[field.name] || ""}
          onChange={(e) => handleVariableChange(field.name, e.target.value)}
        />
      </Box>
    );
})}


              <Typography variant="h6" sx={{ mt: 4 }}>
                Paramétrage des Médias
              </Typography>
              {/* {console.log(tabParseMediasVideo)}  */}
              {tabParseMediasVideo.map((field, index) => {
                
                // field.name = `Media ${index + 1}`;
                // console.log(field.name);
                

                const match = field.name.match(/^s\d+-img(\d+)$/);
                const dynamicLabel = match ? `Media ${match[1]}` : field.name;

                return (
                    <Box
                      key={index}
                      sx={{ 
                        mt: 2, 
                        display: "flex", 
                        justifyContent: "center", 
                        // justifyContent: "flex-end", 
                        alignItems: "center", 
                        width: "100%"
                      }}
                      >
                        {/* Label dynamique pour le champ média */}
                        {/* <Typography sx={{ mr: "30px" }}>{dynamicLabel}</Typography> */}
                        {/* <Typography sx={{ mr: "30px" }}>{field.name}</Typography> */}
                        <Typography sx={{ mr: "30px" }}>Media {index + 1}</Typography>

                          {/* Bouton pour importer un média */}
                          <Button component="label" variant="contained" sx={{ mr: "10px" }}>
                            Importer votre média
                            <input
                              type="file"
                              hidden
                              // accept="image/*,video/*"
                              accept={field.type === "image" ? "image/*" : field.type === "video" ? "video/*" : "*/*"}
                              onChange={(e) => handleFileUpload(e, field.name)}
                              // onChange={(e) => handleVariableChange(field.name, e.target.value)}
                            />
                          </Button>
                          {/* {check && (
                            <CheckCircleRoundedIcon  sx={{ color: 'green' }} />
                          )} */}
                          {checkedFields[field.name] && (
                            <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                          )}

                          {/* Nouveau bouton pour envoyer le (1)média */}
                          {/* <Button
                            variant="contained"
                            color="primary"
                            sx={{ mr: "10px" }}
                            onClick={() => handleSendMedia(field.name)}
                            className="test-modificationButton"
                          >
                            Test
                          </Button> */}

                          {/* Tooltip avec informations supplémentaires */}
                          <div style={{ padding: "10px" }}>
                            {/* <Tooltip text="Ici les infos correspondant au prérequis du média attendu"> */}
                            <Tooltip text={field.comment}>
      <InfoIcon sx={{ color: "black" }} />
                            </Tooltip>
                          </div>
                        </Box>



)
                
                })}
                {/* <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: "10px" }}
                  onClick={handleSendAllMedia}
                  className="test-modificationButton"
                >
                  Enregistrement des medias
              </Button> */}
              <Box sx={{display: "flex", flexDirection: "column", gap: 3, alignItems: "center"}}>
              <Button
                variant="contained"
                // disabled={!isMediaSaved}
                sx={{ 
                  mt: 3,
                  padding: 0, 
                }}
                // onClick={handleVideoSendWithTemplate}
                onClick={handleSendAllMediaAndCreateVideo}
              >
                Envoyer les données
              </Button>
              {modalVideoGenere && 
               (
                <Box>
                  <CircularProgress disableShrink sx={{marginBottom: "10px"}}/>
                  <SendDataToServer />
                </Box>
               )
              }
              {/* {reponseJ2VOK && (
                <Button onClick={handleOpenPrevisu}>Prévisualisation</Button>
              )} */}
              {/* <Modal
                open={openPrevisu}
                onClose={handleClosePrevisu}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{position: "relative", zIndex: 10000, width: "100%", height: "100%"}}
              >
                <Box sx={stylePrevisu}>
                  <Typography id="modal-modal-title" variant="h5" component="h2">
                            Envoi des données au serveur...
                  </Typography>
                </Box>
              </Modal> */}
              </Box>
            </Box>
          </Grid>
          <span>
            {/* {reponseJ2VOK && (
              <SendDataToServer />
            )} */}
                    {/* <Button
                      type="button"
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 4, mr: "1rem" }}
                    >
                      Vers le panier
                    </Button> */}
            </span>
        </Grid>
      )}
      <Button
        disabled={activeStep === 0}
        // disabled={activeStep === 0 || !isGenerate}
        onClick={handleBack}
        sx={{ mr: 1, position: "absolute", bottom: 0, left: 0 }}
      >
        Retour
      </Button>
      <style>{StylesTest}</style>
    </Box>
  );
};

export default EtapeVideo;
