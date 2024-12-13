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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import styled from "styled-components";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

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
const StylesTest = `
.test-modificationButton {
  background-color: red !important;
  margin: 0 !important;
  padding: 0 !important;
  font-size: inherit !mportant;
}

.etape-video-intro {
    display: flex;
    gap: 20px;
    margin-bottom: 50px;
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

const EtapeVideo = () => {
  // const [isClicked, setIsClicked] = useState(false);
  const [isMediaSaved, setIsMediaSaved] = useState(false);
  const { selectedSousCatId, navigationId } = useSousCat();
  const [openModal, setOpenModal] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [nomTemplate, setNomTemplate] = useState("");
  const [variables, setVariables] = useState({});
  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
  const [tabParseMediasVideo, setTabParseMediasVideo] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [mediaCounter, setMediaCounter] = useState(1);
  const [mediaFiles, setMediaFiles] = React.useState([]);  
  const [fileCounter, setFileCounter] = React.useState(1);
  const videoRefs = useRef([]);
  
  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITH_TPL = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";
  
  const variablesString = JSON.stringify(variables);
  
  const imagesVideosFiltered = visuelsVideos.filter(
    (item) => item.id_ss_cat === selectedSousCatId
  );
  const imagesVideosFilteredParNomTemplate = visuelsVideos.filter(
    (item) => item.nom_modele_video === nomTemplate
  );
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

  const handleVariableChange = (key, value) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [key]: value,
    }));
  };
  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    setMediaFiles((prevFiles) => [
      ...prevFiles,
      { fieldName, file }, // Ajouter le fichier avec le nom du champ
    ]);
  
    // console.log("Mise à jour des fichiers :", mediaFiles);

    // console.log("Contenu du file : ", file.name)
    if (file) {

      if (!file.type.startsWith("image/")) {
        console.error("Seuls les fichiers d'image sont autorisés.");
        return;
      }

      const mediaName = `media${mediaCounter}.jpg`;
      // console.log("Nom généré dans handleFileUpload : ", mediaName)

      // setMediaName(mediaName);
      setVariables((prevState) => ({
        ...prevState,
        // [fieldName]: 'https://memenza.fr/visuels/uploads/' + navigationId + "/" + file.name, 
        [fieldName]: `https://memenza.fr/visuels/uploads/${navigationId}/${mediaName}`, 
      }));
      // console.log("Fichier sélectionné :", file.name);
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
    if (!file) {
      console.error("Aucun fichier sélectionné.");
      return;
    }
    // Vérifie les informations sur le fichier
    // console.log("Nom du fichier :", file.name);
    // console.log("Type du fichier :", file.type);
    // console.log("Taille du fichier :", file.size);
    // Génère un nom dynamique basé sur le compteur actuel
    const dynamicName = `media${fileCounter}${file.name.substring(file.name.lastIndexOf("."))}`;
    // console.log("Nom dynamique généré :", dynamicName);
    // Prépare les données pour l'envoi
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("destinationName", dynamicName);
    ///////////////////////////////////
    ///////////////////////////////////
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
    ///////////////////////////////////
    ///////////////////////////////////

    formData.append("destinationFolder", navigationId);
  
    // Incrémente le compteur pour le prochain fichier
    setFileCounter((prevCounter) => prevCounter + 1);
  
    // console.log("CONTENU DE FORMDATA POUR TIM : ", formData);
  
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

    console.log("Dans la console, personne ne vous entendra crier : "  + JSON.stringify(visuelsVideos));
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
    // console.log("SIMULATION ENVOI CHLES");

    const variablesTest = {
      "S1-txt": "9 mois que nous l'attendions",
      "S2-txt": "Nous avons d'abord attendus ça sœur",
      "S3-txt": "Senti ses petites mains",
      "S4-txt": "Pas encore là, nous l'aimions déjà",
      "S5-txt": "... et maintenant, il illumine notre vie",
      "S6-txt": "Alexandre est né le 12 janvier 2025",
      "s1-img1": "https://memenza.fr/visuels/uploads/cmd48320/media1.jpg",
      "s1-img2": "https://memenza.fr/visuels/uploads/cmd48320/media2.jpg",
      "s2-img1": "https://memenza.fr/visuels/uploads/cmd48320/media3.jpg",
      "s2-img2": "https://memenza.fr/visuels/uploads/cmd48320/media4.jpg",
      "s3-img1": "https://memenza.fr/visuels/uploads/cmd48320/media5.jpg",
      "s4-img1": "https://memenza.fr/visuels/uploads/cmd48320/media6.jpg",
      "s4-img2": "https://memenza.fr/visuels/uploads/cmd48320/media7.jpg",
      "s5-img1": "https://memenza.fr/visuels/uploads/cmd48320/media8.jpg",
      "s5-img2": "https://memenza.fr/visuels/uploads/cmd48320/media9.jpg",
      "s6-img1": "https://memenza.fr/visuels/uploads/cmd48320/media10.jpg"
    };

    const formData = {
      "template_id": "g7Jhb10BQEGbDK5wO8l8",
      "desc": "test tom desc",
      "variables": JSON.stringify(variables),
      // "variables": JSON.stringify(variablesTest),
    };
// console.log("AVANT ENVOI, VERIF FORMDATA : " + JSON.stringify(variables));


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

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Box className="etape-video-intro">
              <Box className="etape-video-intro-img">
                <img
                  // src={imgIntroVideo}
                  src="https://memenza.fr/visuels/personnaliservideo.png"
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
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 2 }}
      >
        Uploader sa propre Vidéo
        <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileUpload} />
      </Button>
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
              {console.log(tabParseTextesVideo)} 
              {/* {isClicked && tabParseTextesVideo.map((field, index) => { */}
              {tabParseTextesVideo.map((field, index) => {
                console.log(field);
                const match = field.name.match(/^S(\d+)-txt$/);
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
                
})}

              <Typography variant="h6" sx={{ mt: 4 }}>
                Paramétrage des Médias
              </Typography>
              {tabParseMediasVideo.map((field, index) => {

                // field.name = `Media ${index + 1}`;
                // console.log(field.name);

                const match = field.name.match(/^s\d+-img(\d+)$/);
                const dynamicLabel = match ? `Media ${match[1]}` : field.name;
                // console.log("VERIFICATIONS dynamiclabel pour MEDIA : " + JSON.stringify(dynamicLabel));
                
                // tabParseMediasVideo.forEach((item, index) => {
                //   item.name = `Media ${index + 1}`;
                //     console.log(item.name);
                // });

                return (
                    // <Box key={index} sx={{ 
                    //     mt: 2, 
                    //     display: "flex", 
                    //     justifyContent:"center", 
                    //     alignItems: "center" ,
                    //     width: "100%"
                    //     }}>
                    //     {/* <Typography sx={{ flex: 1 }}>{dynamicLabel}</Typography> */}
                    //     <Typography sx={{mr: "30px"}}>{dynamicLabel}</Typography>
                    //     <Button component="label" variant="contained" sx={{mr: "10px"}}>
                    //     Importer votre média
                    //         <input
                    //         type="file"
                    //         hidden
                    //         accept="image/*,video/*"
                    //         onChange={(e) => handleFileUpload(e, field.name)}
                    //         />
                    //     </Button>
                    //     <div style={{ padding: "50px" }}>
                    //         <Tooltip text="ici les infos correspondant au prérequis du média attendu">
                    //             <InfoIcon sx={{color: "black"}} />
                    //         </Tooltip>
                    //     </div>


                    // </Box>
                    <Box
                      key={index}
                      sx={{ 
                        mt: 2, 
                        display: "flex", 
                        // justifyContent: "center", 
                        justifyContent: "flex-end", 
                        alignItems: "center", 
                        width: "100%"
                      }}
                      >
                        {/* Label dynamique pour le champ média */}
                        <Typography sx={{ mr: "30px" }}>{dynamicLabel}</Typography>

                          {/* Bouton pour importer un média */}
                          <Button component="label" variant="contained" sx={{ mr: "10px" }}>
                            Importer votre média
                            <input
                              type="file"
                              hidden
                              accept="image/*,video/*"
                              onChange={(e) => handleFileUpload(e, field.name)}
                              // onChange={(e) => handleVariableChange(field.name, e.target.value)}
                            />
                          </Button>

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
                            <Tooltip text="Ici les infos correspondant au prérequis du média attendu">
      <InfoIcon sx={{ color: "black" }} />
                            </Tooltip>
                          </div>
                        </Box>



)
                
                })}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: "10px" }}
                  onClick={handleSendAllMedia}
                  className="test-modificationButton"
                >
                  Enregistrement des medias
              </Button>
              <Button
                variant="contained"
                disabled={!isMediaSaved}
                sx={{ 
                  mt: 3,
                  padding: 0, 
                }}
                onClick={handleVideoSendWithTemplate}
              >
                Envoyer les données
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      <style>{StylesTest}</style>
    </Box>
  );
};

export default EtapeVideo;
