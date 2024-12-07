import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  Tab,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
// import { useSousCat } from "./SousCatContext.jsx";
import { useSousCat } from "../../componentsMemenza/GestionEtat.jsx";
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip, IconButton } from '@mui/material';

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Add, KeyboardArrowRight } from "@mui/icons-material";
import styled from "styled-components";

const videos = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
];

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


// export default function MemenzaChoixVideo() {
//   const [sticky, setSticky] = React.useState('top');
//   const [testApparitionParametre, seTestParametre] = React.useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentVideoSrc, setCurrentVideoSrc] = useState("");
//   const { selectedSousCatId } = useSousCat();

//   const initialVariables = {
//     // "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
//     // "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
//     // "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
//     // "scene3_image3": "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg",
//   };
//   const [variables, setVariables] = useState(initialVariables);
//   const handleVariableChange = (key, value) => {
//     setVariables((prevVariables) => ({
//       ...prevVariables,
//       [key]: value, 
//     }));

//   };
// const variablesParse = JSON.stringify(variables)
// console.log("ICI LES DATAS DU JSON : "+ variablesParse);


//   const [formData, setFormData] = useState({
//     "template_id": "RdLlSO4FUmAV6fPHvKT1",
//     "desc": "test tom desc",
//     "variables": variablesParse
//   });

  

//   const [visuelsVideos, setVisuelsVideos] = useState([]);
//   const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
//   const [tabParseMediasVideo, setTabParseMediasVideo] = useState([
//     { name: "Video 1", restrictions: "Max 10MB, format .mp4" },
//     { name: "Video 2", restrictions: "Max 5MB, format .avi" },
//     { name: "Video 3", restrictions: "Max 20MB, format .mov" },
//   ]);
 
  
  
//   const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));
//   const [apparitionParametrage, setApparitionParametrage] = useState(false);
// // console.log("APPARITION PARAMETRAGES : " + apparitionParametrage);


//   const videoRefs = useRef([]);

//   const imagesVideosFiltered = visuelsVideos.filter(
//     (item) => item.id_ss_cat === selectedSousCatId
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/wp-json/plugin_memenza/v1/videos_visuel");
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des données");
//         }
//         const result = await response.json();
//         setVisuelsVideos(result);
//         // console.log("OBSERVATION DES REULTATS DU FETCHDATA : " + JSON.stringify(result));
        
//       } catch (error) {
//         console.error("Erreur :", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleVideoClick = (index) => {
//     const video = videoRefs.current[index];
//     const playingStatus = [...isPlaying];

//     if (video.paused) {
//       video.play();
//       playingStatus[index] = true;
//     } else {
//       video.pause();
//       playingStatus[index] = false;
//     }

//     setIsPlaying(playingStatus);

//     ////////////////////////////
//     ////////////////////////////
//     // Basculer l'affichage des paramètres pour la vidéo cliquée
//     // if (selectedParam === index) {
//     //   setSelectedParam(null); // Si déjà sélectionné, cacher les paramètres
//     // } else {
//     //   setSelectedParam(index); // Afficher les paramètres pour cette vidéo
//     // }
//     ////////////////////////////
//     ////////////////////////////

//   };

//   const handleVideoClickCustom = () => {
//     const selectedTemplate = imagesVideosFiltered.find(
//       (item) => item.textes_video && item.medias_video // Vérifie que `medias_video` existe également
//     );
//     if (!selectedTemplate) {
//       console.error("Aucun template sélectionné");
//       return;
//     }
//     try {
//       // Parsing des textes_video et medias_video en un seul bloc try
//       const parsedTemplateTextesVideo = JSON.parse(selectedTemplate.textes_video);
//       const parsedTemplateMediasVideo = JSON.parse(selectedTemplate.medias_video);
      
//       // Vérifier si videoTextFields existe et est valide
//       if (Array.isArray(parsedTemplateTextesVideo.videoTextFields)) {
//         setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields);
//       } else {
//         console.error("Le champ `videoTextFields` n'est pas un tableau valide.");
//       }
//       // Vérifier si mediaFields existe et est valide
//       if (Array.isArray(parsedTemplateMediasVideo.mediaFields)) {
//         setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields);
//         setApparitionParametrage(true); // Afficher le paramétrage si les deux sont valides
//       } else {
//         console.error("Le champ `mediaFields` n'est pas un tableau valide.");
//       }

//     } catch (error) {
//       console.error("Erreur lors du parsing JSON des textes_video ou medias_video :", error);       
//     }
//   }; 

//   const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
//   const API_URL_WITH_TPL = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";
  
//   const handleVideoSendWithTemplate = async () => {
//     try {
//       const response = await axios.post(
//         API_URL_WITH_TPL , 
//         formData ,
//         {
//           headers: {
//             'WP-API-KEY': API_KEY,
//             'Content-Type': 'application/json',
//             },
//         }
//       );
//   console.log("LIGNE 167 REPONSE : "+ response.data);
  
//       if (response.status === 200) {
//         console.log("Données envoyées avec succès :", response.data);
//       } else {
//         console.error("ICI ERREUR CATCH STATUS Erreur lors de l'envoi des données :", response.statusText);
//       }
//     } catch (error) {
//       console.error("ICI ERREUR CATCH Erreur lors de l'envoi des données :", error);
//       if (error.response) {
//         console.error("Erreur API :", error.response.data);
//         console.error("Statut HTTP :", error.response.status);
//         console.error("Headers :", error.response.headers);
//       } else if (error.request) {
//         console.error("Aucune réponse reçue du serveur :", error.request);
//       } else {
//         console.error("Erreur lors de la configuration de la requête :", error.message);
//       }
//     }
//   };
  
//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setCurrentVideoSrc(""); 
//   };

//   const handleVideoPopUp = (videoSrc) => {
//     setCurrentVideoSrc(videoSrc); 
//     setOpenModal(true); 
//   };


// // Fonction pour gérer l'upload de vidéo
// const handleFileUpload = (event) => {
//   const file = event.target.files[0]; 
//   if (file) {
//     const videoURL = URL.createObjectURL(file); 
//     console.log("ICI LE LIEN DE LA VIDEO OU IMAGE : " + videoURL);
    
//     setFormData((prevData) => ({
//       ...prevData,
//       video_path: videoURL, 
//     }));
//     console.log("Lien local de la vidéo :", videoURL);
//   }
// };

// // const handleTest = (srcVid) => {
// //   console.log("Test");
// //   seTestParametre(true);
// //   setCurrentVideoSrc(srcVid);
// // }
// const handleTest = (srcVid) => {
//   console.log("Test");
//   if (!testApparitionParametre) { // Ne changez l'état que si nécessaire
//     seTestParametre(true);
//   }
//   setCurrentVideoSrc(srcVid);

// ////////////////////////////
// ////////////////////////////
// const selectedTemplate = imagesVideosFiltered.find(
//   (item) => item.textes_video && item.medias_video // Vérifie que `medias_video` existe également
// );
// if (!selectedTemplate) {
//   console.error("Aucun template sélectionné");
//   return; 
// }
// try {
//   // Parsing des textes_video et medias_video en un seul bloc try
//   const parsedTemplateTextesVideo = JSON.parse(selectedTemplate.textes_video);
//   const parsedTemplateMediasVideo = JSON.parse(selectedTemplate.medias_video);
  
//   // Vérifier si videoTextFields existe et est valide
//   if (Array.isArray(parsedTemplateTextesVideo.videoTextFields)) {
//     setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields);
//   } else {
//     console.error("Le champ `videoTextFields` n'est pas un tableau valide.");
//   }
//   // Vérifier si mediaFields existe et est valide
//   if (Array.isArray(parsedTemplateMediasVideo.mediaFields)) {
//     setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields);
//     setApparitionParametrage(true); // Afficher le paramétrage si les deux sont valides
//   } else {
//     console.error("Le champ `mediaFields` n'est pas un tableau valide.");
//   }

// } catch (error) {
//   console.error("Erreur lors du parsing JSON des textes_video ou medias_video :", error);       
// }
// ////////////////////////////
// ////////////////////////////

// };




export default function MemenzaChoixVideo() {
  const [testApparitionParametre, seTestParametre] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [variables, setVariables] = useState({});
  const { selectedSousCatId, navigationId } = useSousCat();
  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
  const [tabParseMediasVideo, setTabParseMediasVideo] = useState([]);
  // const [navigationId, setNavigationId] = useState("default_id"); // Exemples d'ID de navigation.

  const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));

const variablesParse = JSON.stringify(variables)
console.log("ICI LES DATAS DU JSON : "+ variablesParse)

  const API_KEY = process.env.REACT_APP_MEMENZA_API_KEY || "simulation lecture clé API";
  const API_URL_WITH_TPL = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";

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

  const handleVariableChange = (key, value) => {
    setVariables((prevVariables) => ({
      ...prevVariables,
      [key]: value,
    }));
  };

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {

      const fileName = `${fieldName}_${file.name.split("\\").pop().split(" ").join("_")}`;
const newUrl = `/visuels/upload/${navigationId}/${fileName}`
console.log("URL NOUVEAUT22 : " + newUrl);


      setVariables((prevVariables) => ({
        ...prevVariables,
        [fieldName]: newUrl,
      }));
      console.log(`Media URL ajouté : ${newUrl}`);
    }
  };

  const handleTest = (srcVid) => {
    seTestParametre(true);
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

      if (Array.isArray(parsedTemplateTextesVideo.videoTextFields)) {
        setTabParseTextesVideo(parsedTemplateTextesVideo.videoTextFields);
      } else {
        console.error("Le champ `videoTextFields` n'est pas un tableau valide.");
      }
      if (Array.isArray(parsedTemplateMediasVideo.mediaFields)) {
        setTabParseMediasVideo(parsedTemplateMediasVideo.mediaFields);
      } else {
        console.error("Le champ `mediaFields` n'est pas un tableau valide.");
      }
    } catch (error) {
      console.error("Erreur lors du parsing JSON des textes_video ou medias_video :", error);
    }
  };

  const handleVideoSendWithTemplate = async () => {
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
    <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Uploader sa propre Video
              <VisuallyHiddenInput
            type="file"
            accept="video/*" 
            onChange={handleFileUpload} 
          />
            </Button>
            <Divider sx={{color: "black", opacity: 0.6, margin: "10px"}}> OU </Divider>
    <Typography variant="h4" gutterBottom>
      Choisissez votre modèle
    </Typography>

    {/* Liste des vidéos */}
    {/* <Grid justifyContent="center"> */}
    <Grid container 
    spacing={4} 
    justifyContent="center"
    // sx={{ flexGrow: 1 }}
    >
      {imagesVideosFiltered.map((src, index) => (
        <Grid
        size={6}
          item
          key={index}
          xs={12}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          // onClick={handleTest(src.chemin_video_ex)}
          onClick={() => handleTest(src.chemin_video_ex)}
        >
          {/* <Button onClick={() => handleTest(src.chemin_video_ex)}>
    Sélectionner
  </Button> */}
          <Typography sx={{ my: 2 }}>
            Modèle : {src.nom_modele_video || "pas d'info"}
          </Typography>
          <Box
            sx={{
              position: "relative",
              // width: "30%",
              width: "100%",
              maxWidth: "300px",
              height: 200,
              cursor: "pointer",
              borderRadius: 2,
              overflow: "hidden",
              "&:hover .overlay": {
                opacity: isPlaying[index] ? 0 : 1,
              },
            }}
            // onClick={() => handleVideoClick(index)}
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
          {/* <Button
            variant="outlined"
            size="sm"
            sx={{ m: 2 }}
            onClick={() => handleVideoPopUp(src.chemin_video_ex)}
          >
            Prévisualiser le modèle
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleVideoClickCustom}
            endDecorator={<KeyboardArrowRight />}
          >
            Sélectionner
          </Button> */}
        </Grid>
      ))}
    </Grid>
    {testApparitionParametre && (
      <>
      <Grid container spacing={2} sx={{ flexGrow: 1, marginTop: 3 }}>
        <Grid item size={12} xs={6}>
          <Box sx={{ position: "relative", width: "100%", height: "60vh", overflow: 'hidden' }}>
          <Box
            component="video"
            // src={currentVideoSrc}
            src={currentVideoSrc}
            controls
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
          top: 0, 
          zIndex: 10,
            }}
          />
        </Box>
        </Grid>
       
        <Grid item xs={6}>

    {/* Box avec barre de défilement pour la partie droite */}
    <Box
      sx={{
        mt: 4,
        mx: 5,
        maxHeight: "60vh", 
        overflowY: "auto", 
        paddingRight: 2,
      }}
    >
      <Typography variant="h6">Paramétrage du Template</Typography>
      {tabParseTextesVideo.map((field, index) => {
        // Vérifier si le nom correspond au format S<number>-txt
        const match = field.name.match(/^S(\d+)-txt$/);
        const dynamicLabel = match ? `Texte ${match[1]}` : field.name;

        return (
          <Box key={index} gap={1} sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" style={{ whiteSpace: "wrap" }}>
              {dynamicLabel}
            </Typography>
            <TextField
              placeholder={field.defaultText || ""}
              inputProps={{ maxLength: field.maxCharacters }}
              variant="outlined"
              size="small"
              value={variables[field.name] || ""}
              onChange={(e) => handleVariableChange(field.name, e.target.value)}
            />
          </Box>
        );
      })}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Paramétrage des Médias</Typography>
        {tabParseMediasVideo.map((field, index) => {
          // Vérifier si le nom correspond au format S<number>-img<number>
          const match = field.name.match(/^s\d+-img(\d+)$/);
          const dynamicLabel = match ? `Media ${match[1]}` : field.name;

          return (
            <Box key={index} display="flex" justifyContent="flex-end" alignItems="center" gap={2} sx={{ mt: 4 }}>
              <Typography variant="body1" style={{ whiteSpace: "wrap", textAlign: "end" }}>
                {dynamicLabel}
              </Typography>
              <Button variant="contained" component="label">
                Importer votre média
                <input
                  type="file"
                  hidden
                  accept="image/*,video/*"
                  // onChange={(e) => console.log("ICI NOM FICHIER : " + JSON.stringify(e.target.files))}
                  value={variables[field.default] || ""}
                  // onChange={(e) => handleVariableChange(field.name, e.target.value)}
                  onChange={(e) => handleVariableChange(field.name, e.target.value)
                  // onChange={(e) => handleFileUpload("media", e)
                    
                  }                  />
              </Button>
              <Tooltip
                title={`Les dimensions de ce média doivent respecter : ${field.comment}`}
                arrow
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={handleVideoSendWithTemplate}
          >
            J'envoie mes données pour paramétrage.
          </Button>
        </Box>
      </Box>
    </Box>
  </Grid>
</Grid>
    </>
      )}


    


  </Box>
);


}

