import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  Divider,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { useSousCat } from "./SousCatContext.jsx";
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, IconButton } from '@mui/material';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const videos = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
];

export default function MemenzaChoixVideo() {
  const { selectedSousCatId } = useSousCat();
//   const [formData, setFormData] = useState({
//     "template_id": "RdLlSO4FUmAV6fPHvKT1",
//     // "template_id": selectedSousCatId,
//     "desc": "test tom pour champs description",
//     "variables": {}
// //     "variables": {
// //       "scene1_texte1": "Test écriture variable",
// //       "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
// //       "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
// //       "scene2_texte1": "Ceci est un message varible postman",
// //       "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
// //       "scene3_texte1": "Cela fonctionne bien ? ",
// //       "scene3_image3": "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"
// // },
//   });

//   const [formData, setFormData] = useState({
//     "template_id": "RdLlSO4FUmAV6fPHvKT1",
//     "desc": "test tom desc",
//     "variables": {
//       "scene1_texte1": "Test écriture variable",
//       "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
//       "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
//       "scene2_texte1": "Ceci est un message varible postman",
//       "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
//       "scene3_texte1": "Cela fonctionne bien ? ",
//       "scene3_image3": "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"
// }
//   });
// const variables = {
  //         "scene1_texte1": "Test écriture variable",
  //         "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
  //         "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
  //         "scene2_texte1": "Ceci est un message varible postman",
  //         "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
  //         "scene3_texte1": "Cela fonctionne bien ? ",
  //         "scene3_image3": "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"
  //   }

  // const variables = {};

  ///////////////////////////////
  ///////////////////////////////
  const initialVariables = {
    "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
    "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
    "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
    "scene3_image3": "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg",
  };
  // const [variables, setVariables] = useState({});
  const [variables, setVariables] = useState(initialVariables);
  const handleVariableChange = (key, value) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [key]: value, 
    }));
  };
  ///////////////////////////////
  ///////////////////////////////
  // console.log("VARIABLES SANS PARSE VERIFICATION : "+ JSON.stringify(variables));
const variablesParse = JSON.stringify(variables)
console.log("VARIABLES PARSE VERIFICATION : "+ variablesParse);


  const [formData, setFormData] = useState({
    "template_id": "RdLlSO4FUmAV6fPHvKT1",
    "desc": "test tom desc",
    "variables": variablesParse
  });

  // console.log(formData);
  

  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
  // const [tabParseMediasVideo, setTabParseMediasVideo] = useState([]);
  const [tabParseMediasVideo, setTabParseMediasVideo] = useState([
    { name: "Video 1", restrictions: "Max 10MB, format .mp4" },
    { name: "Video 2", restrictions: "Max 5MB, format .avi" },
    { name: "Video 3", restrictions: "Max 20MB, format .mov" },
  ]);

  // console.log("TEST FINAL MEDIA : " + JSON.stringify(tabParseMediasVideo));
  
  
  const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));
  const [apparitionParametrage, setApparitionParametrage] = useState(false);

  ////////////////////////////
  const [textValues, setTextValues] = useState({});
  ////////////////////////////

  const videoRefs = useRef([]);

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

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    const playingStatus = [...isPlaying];

    if (video.paused) {
      video.play();
      playingStatus[index] = true;
    } else {
      video.pause();
      playingStatus[index] = false;
    }

    setIsPlaying(playingStatus);
  };

  const handleVideoClickCustom = () => {
    const selectedTemplate = imagesVideosFiltered.find(
      (item) => item.textes_video && item.medias_video // Vérifie que `medias_video` existe également
    );

    if (!selectedTemplate) {
      console.error("Aucun template sélectionné");
      return;
    }

    // console.log("TABLEAU COMPLET" + JSON.stringify(selectedTemplate));

    try {
      // Parsing des textes_video et medias_video en un seul bloc try
      const parsedTemplateTextesVideo = JSON.parse(selectedTemplate.textes_video);
      // console.log("LIGNE PARSE TEXTE VIDEO : " + JSON.stringify(parsedTemplateTextesVideo));

      const parsedTemplateMediasVideo = JSON.parse(selectedTemplate.medias_video);
      // console.log("LIGNE 121 test media video " + selectedTemplate.medias_video);
      
      // Vérifier si videoTextFields existe et est valide
      if (Array.isArray(parsedTemplateTextesVideo.videoTextFields)) {
        setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields);
      } else {
        console.error("Le champ `videoTextFields` n'est pas un tableau valide.");
      }

      // Vérifier si mediaFields existe et est valide
      if (Array.isArray(parsedTemplateMediasVideo.mediaFields)) {
        setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields);
        setApparitionParametrage(true); // Afficher le paramétrage si les deux sont valides
      } else {
        console.error("Le champ `mediaFields` n'est pas un tableau valide.");
      }

    } catch (error) {
      console.error("Erreur lors du parsing JSON des textes_video ou medias_video :", error);
    }
  };

  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";
  
  const handleVideoSend = async () => {
    try {
      const response = await axios.post(
        API_URL , 
        formData ,
        // JSON.stringify(formData) ,
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
  

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Choisissez votre template
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        (Explication du pourquoi du choix du template)
      </Typography>

      {/* <Grid  spacing={2} justifyContent="center"> */}
      <Grid justifyContent="center">
        {imagesVideosFiltered.map((src, index) => (
          <Grid item key={index} xs={6} sm={4} md={3}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
                // height: 400,
                cursor: "pointer",
                borderRadius: 2,
                overflow: "hidden",
                "&:hover .overlay": {
                  opacity: isPlaying[index] ? 0 : 1,
                },
              }}
              onClick={() => handleVideoClick(index)}
            >
              <Box
                component="video"
                src={src.chemin_video_ex}
                ref={(el) => (videoRefs.current[index] = el)}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {!isPlaying[index] && (
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
                    transition: "opacity 0.3s",
                    opacity: 1,
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 60, color: "#fff" }} />
                </Box>
              )}
            </Box>
            <Typography sx={{my: 2}}>Nom du tempate : {src.nom_modele_video || "pas d'info"}</Typography>
            <Checkbox />
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleVideoClickCustom}
            >
              Je choisis le template sélectionné
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Affichage des textes vidéo */}
      {apparitionParametrage && tabParseTextesVideo.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Paramétrage du Template</Typography>
          {tabParseTextesVideo.map((field, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
              <Typography variant="body1" style={{ whiteSpace: 'nowrap' }}>
                {field.name}
              </Typography>
              <TextField
                placeholder={field.defaultText || ''}
                inputProps={{ maxLength: field.maxCharacters }}
                variant="outlined"
                size="small"
                ////////////////////////////
                value={variables[field.name] || ''}
                onChange={(e) => handleVariableChange(field.name, e.target.value)} // Met à jour la clé avec la valeur saisie
                ////////////////////////////

              />
            </Box>
          ))}
        </Box>
      )}

      {/* Affichage des médias vidéo */}
      {/* {apparitionParametrage && tabParseMediasVideo.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Paramétrage des Médias</Typography>
          {tabParseMediasVideo.map((field, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
              <Typography variant="body1" style={{ whiteSpace: 'nowrap' }}>
                {field.name}
              </Typography>
              <Button variant="contained" component="label">
                Importer votre média
                <input
                  type="file"
                  hidden
                  accept="image/*,video/*"
                  onChange={(e) => console.log(e.target.files)}
                />
              </Button>
            </Box>
          ))}
        </Box>
      )} */}

<Box>
      {/* Affichage des médias vidéo */}
      {apparitionParametrage && tabParseMediasVideo.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          </Box>

          {tabParseMediasVideo.map((field, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
              {/* <Button variant="contained" component="label">
                Importer votre média
                <input
                  type="file"
                  hidden
                  accept="image/*,video/*"
                  onChange={(e) => console.log(e.target.files)}
                />
              </Button> */}
              <Box>
      {/* Affichage des médias vidéo */}
      {tabParseMediasVideo.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5">Paramétrage des Médias</Typography>
          </Box>

          {tabParseMediasVideo.map((field, index) => (
              <Box key={index} display="flex" alignItems="center" gap={2} sx={{ mt: 4 }}>
                <Typography variant="body1" style={{ whiteSpace: 'nowrap' }}>
                  {field.name}
                </Typography>

                

<Button variant="contained" component="label">
Importer votre média
<input
type="file"
hidden
accept="image/*,video/*"
onChange={(e) => console.log(e.target.files)}
/>
</Button>
{/* Tooltip pour restrictions spécifiques à côté du bouton */}
<Tooltip title={`Les dimensions de ce média doivent respecter : les dimensions suivantes : ${field.comment}`} arrow>
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
</Box>
))}
</Box>
)}
    </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={handleVideoSend}
            // onClick={handleTestCompleteJsonTab}
          >
J'envoie mes données de paramétrage.
          </Button>
    </Box>


    </Box>
  );
}

/////////////////////////
/////////////////////////
/////////////////////////

