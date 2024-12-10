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
  const [openModal, setOpenModal] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [variables, setVariables] = useState({});
  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
  const [tabParseMediasVideo, setTabParseMediasVideo] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const { selectedSousCatId, navigationId } = useSousCat();
  const videoRefs = useRef([]);

  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITH_TPL = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";

  const variablesParse = JSON.stringify(variables);
  console.log("ICI LES DATAS DU JSON : " + variablesParse);

  const imagesVideosFiltered = visuelsVideos.filter(
    (item) => item.id_ss_cat === selectedSousCatId
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/videos_visuel");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setVisuelsVideos(result);
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

  // const handleFileUpload = (event, fieldName) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const fileName = `${fieldName}_${file.name.split("\\").pop().split(" ").join("_")}`;
  //     console.log("VERIFICATION DE FILENAME POUR ENVOI DANS DOSSIER DISTANT : " + fileName);
  //     console.log("VERIFICATION DE FILENAME POUR ENVOI DANS DOSSIER DISTANT : " + JSON.stringify(fileName));
      
  //     const newUrl = `/visuels/upload/${navigationId}/${fileName}`;
  //     setVariables((prevVariables) => ({
  //       ...prevVariables,
  //       [fieldName]: newUrl,
  //     }));
  //     console.log(`Media URL ajouté : ${newUrl}`);
  //   }
  // };

  const handleFileUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      // Construire le nom de fichier et le chemin cible
      const fileName = `${fieldName}_${file.name.split("\\").pop().split(" ").join("_")}`;
      const newUrl = `/visuels/upload/${navigationId}/${fileName}`;
      console.log("VERIFICATION DE FILENAME POUR ENVOI DANS DOSSIER DISTANT : ", fileName);
      console.log("Media URL ajouté : ", newUrl);
  
      // Mettre à jour les variables pour le frontend
      setVariables((prevVariables) => ({
        ...prevVariables,
        [fieldName]: newUrl,
      }));
  
      // Créer un objet FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append("file", file); // Ajouter le fichier
      formData.append("destination", newUrl); // Ajouter la destination cible (facultatif)
  
      try {
        // Envoi du fichier vers le serveur avec Axios
        const response = await axios.post("https://memenza.fr/visuels/uploads/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 200) {
          console.log("Fichier uploadé avec succès :", response.data);
        } else {
          console.error("Erreur lors de l'upload :", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier :", error);
      }
    }
  };
  

  const handleTest = (srcVid) => {
    setOpenModal(true);
    setCurrentVideoSrc(srcVid);

    const selectedTemplate = visuelsVideos.find(
      (item) => item.textes_video && item.medias_video
    );
    if (!selectedTemplate) {
      console.error("Aucun template sélectionné");
      return;
    }

    try {
      const parsedTemplateTextesVideo = JSON.parse(selectedTemplate.textes_video);
      const parsedTemplateMediasVideo = JSON.parse(selectedTemplate.medias_video);

      setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields || []);
      setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields || []);
    } catch (error) {
      console.error("Erreur lors du parsing JSON :", error);
    }
  };

  const handleVideoSendWithTemplate = async () => {
    console.log("SIMULATION ENVOI CHLES");
    
    const formData = {
      template_id: "RdLlSO4FUmAV6fPHvKT1",
      desc: "test tom desc",
      variables,
    };

    try {
      const response = await axios.post(API_URL_WITH_TPL, formData, {
        headers: {
          "WP-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Données envoyées avec succès :", response.data);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Étape Vidéo
      </Typography>
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
            onClick={() => handleTest(src.chemin_video_ex)}
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
              {tabParseTextesVideo.map((field, index) => {
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

                const match = field.name.match(/^s\d+-img(\d+)$/);
                const dynamicLabel = match ? `Media ${match[1]}` : field.name;

                return (
                    <Box key={index} sx={{ 
                        mt: 2, 
                        display: "flex", 
                        justifyContent:"center", 
                        alignItems: "center" ,
                        width: "100%"
                        }}>
                        {/* <Typography sx={{ flex: 1 }}>{dynamicLabel}</Typography> */}
                        <Typography sx={{mr: "30px"}}>{dynamicLabel}</Typography>
                        <Button component="label" variant="contained" sx={{mr: "10px"}}>
                        Importer votre média
                            <input
                            type="file"
                            hidden
                            accept="image/*,video/*"
                            onChange={(e) => handleFileUpload(e, field.name)}
                            />
                        </Button>
                        <div style={{ padding: "50px" }}>
                            <Tooltip text="ici les infos correspondant au prérequis du média attendu">
                                <InfoIcon sx={{color: "black"}} />
                            </Tooltip>
                        </div>


                    </Box>
)
                
                })}
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleVideoSendWithTemplate}
              >
                Envoyer les données
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EtapeVideo;
