// import React, { useState, useRef } from "react";
// import { Box, Typography, Grid, TextField, Button} from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import Checkbox from '@mui/material/Checkbox';

// const videos = [
//   "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
//   "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
//   "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
// ];

// export default function MemenzaChoixVideo() {

//   const [formData, setFormData] = useState({
//     // templateId: '',
//     descr: '',
//     // variables: {
//     //   scene1_texte1: "Test écriture variable",
//     //   scene2_image1: "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
//     //   scene2_image2: "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
//     //   scene2_texte1: "Ceci est un message varible postman",
//     //   scene3_image2: "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
//     //   scene3_texte1: "Cela fonctionne bien ?",
//     //   scene3_image3: "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"
//     // },
//   });
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleSubmit = (e) => {
//   //   console.log(formData);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const apiUrl = 'https://core-api.memenza.fr/api/wp-media/create-with-tpl';
//     const apiKey = process.env.REACT_APP_MEMENZA_API_KEY;

//     try {
//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           'WP-API-KEY': apiKey,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         console.log(response.data);
//         console.log(formData);
//         console.log(responseData);
//       } else {
//         console.log("Probleme pas de reponse");

//       }

//       setResponseData(response.data);
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data || 'Une erreur est survenue.');
//       setResponseData(null);
//       console.log(error);
//     }
//   };

//   const videoRefs = useRef([]);
//   const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));

//   const [visuelsVideos, setvisuelsVideos] = React.useState([]);
//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "/wp-json/plugin_memenza/v1/videos_visuel",
//         );
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des données");
//         }
//         const result = await response.json();
//         setvisuelsVideos(result);
//         console.log(formData);

//       } catch (error) {
//         setError(error.message);
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
//   };

//   return (
//     <Box sx={{ textAlign: "center", p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Choisissez votre template
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
//         (Explication du pourquoi du choix du template)
//       </Typography>
//       <Grid container spacing={2} justifyContent="center">
//         {/* {videos.map((src, index) => ( */}
//         {visuelsVideos.map((src, index) => (
//           <Grid item key={index} xs={6} sm={4} md={3}>
//             <Box
//               sx={{
//                 position: "relative",
//                 width: "100%",
//                 height: 200,
//                 cursor: "pointer",
//                 borderRadius: 2,
//                 overflow: "hidden",
//                 "&:hover .overlay": {
//                   opacity: isPlaying[index] ? 0 : 1,
//                 },
//               }}
//               onClick={() => handleVideoClick(index)}
//             >
//               <Box
//                 component="video"
//                 src={src.chemin_video_ex}
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 sx={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//               {!isPlaying[index] && (
//                 <Box
//                   className="overlay"
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "rgba(0, 0, 0, 0.4)",
//                     transition: "opacity 0.3s",
//                     opacity: 1,
//                   }}
//                 >
//                   <PlayArrowIcon sx={{ fontSize: 60, color: "#fff" }} />
//                 </Box>
//               )}
//             </Box>
//             <Checkbox />
//             <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2,
//         width: '100%',
//         margin: 'auto',
//         mt: 5,
//       }}
//     >
//             <TextField
//         label="Votre description"
//         name="descr"
//         value={formData.descr}
//         onChange={handleChange}
//         fullWidth
//         required
//         sx={{ }}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Envoyer
//       </Button>
//       </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { useSousCat } from "./SousCatContext.jsx";
import styled from "styled-components";
import VideoCustomParam from "./VideoCustomParam.jsx";

// Liste des vidéos par défaut
const videos = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
];



export default function MemenzaChoixVideo() {
  // Déclaration des états
  // const [formData, setFormData] = useState({ descr: "" });
  const [formData, setFormData] = useState({
    template_id: "RdLlSO4FUmAV6fPHvKT1",
    desc: "",
    variables: {"scene1_texte1": "Thomas test 3",
      "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-style-fantastique_23-2151057680.jpg",
      "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
      "scene2_texte1": "Ceci est un message variable postman",
      "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaper-ordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
      "scene3_texte1": "Cela fonctionne bien ? ",
      "scene3_image3": "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"},
  });
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));
  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabApresClicSurChoixTemplate, setTabApresClicSurChoixTemplate] = useState();
  
  
  const videoRefs = useRef([]);

  const { selectedSousCatId } = useSousCat();
  console.log(selectedSousCatId);
  const imagesVideosFitred =  visuelsVideos.filter((item) => {
    return item.id_ss_cat === selectedSousCatId;
  })
  

  // Fonction pour gérer le changement dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://core-api.memenza.fr/api/wp-media/create-with-tpl";
    // const apiUrl =
    //   "https://core-api.memenza.fr/api/wp-media/create-without-tpl";
    const apiKey = process.env.REACT_APP_MEMENZA_API_KEY;

    try {
      const response = await axios.post(apiUrl,formData, {
        headers: {
          "WP-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        // data: {
        //   template_id: "RdLlSO4FUmAV6fPHvKT1",
        //   desc: "",
        //   variables: {"scene1_texte1": "Test écriture variable",
        //     "scene2_image1": "https://img.freepik.com/photos-gratuite/nuages-style-fantastique_23-2151057680.jpg",
        //     "scene2_image2": "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
        //     "scene2_texte1": "Ceci est un message variable postman",
        //     "scene3_image2": "https://archzine.fr/wp-content/uploads/2020/03/wallpaper-ordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
        //     "scene3_texte1": "Cela fonctionne bien ? ",
        //     "scene3_image3": "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"} ,
        // },
      });

      setResponseData(response.data);
      setError(null); // Réinitialiser les erreurs en cas de succès
    } catch (err) {
      setError(err.response?.data || "Une erreur est survenue.");
      setResponseData(null);
    }
  };

  // Récupération des données des vidéos visuelles depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/wp-json/plugin_memenza/v1/videos_visuel",
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setVisuelsVideos(result);
        console.log("RESULTAT REPONSE " + result);
        console.log("RESULTAT REPONSE " + JSON.stringify(result));
        
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Fonction pour gérer le clic sur une vidéo (lecture/pause)
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

  // const handleVideoClickCustom = () => {
  //   const test = imagesVideosFitred.filter((item) => {
  //     console.log("ICI premier filtre : "+item.textes_video);
  //     setTabApresClicSurChoixTemplate(item.texte_video)
  //   })
  //   console.log("SITUATION : "+ tabApresClicSurChoixTemplate);
  // }
 
//   const handleVideoClickCustom = () => {
//     const selectedTemplate = imagesVideosFitred.find((item) => item.textes_video);
    
//     if (selectedTemplate) {
//       console.log("Template sélectionné :", selectedTemplate.textes_video);
//       setTabApresClicSurChoixTemplate(selectedTemplate.textes_video);
//     } else {
//       console.log("Aucun template trouvé");
//     }

// // Extraction des noms uniquement
// const names = tabApresClicSurChoixTemplate.videoTextFields.map(field => field.name);

// // Affichage du résultat
// console.log(names);

//   };



const handleVideoClickCustom = () => {
  
  console.log("imagesVideosFitred:", imagesVideosFitred);

  const selectedTemplate = imagesVideosFitred.find((item) => item.textes_video);
  const test2 = selectedTemplate.textes_video;
  const test2Parse = JSON.parse(test2);
  const tabFinal = test2.videoTextFields;

  // imagesVideosFitred.map((champs) => {
  //   console.log("champs:", champs.textes_video);
  // })
  
  // console.log("tableau selectionner :  "+ JSON.stringify(selectedTemplate));
  // console.log("ligne selectionne :  "+ JSON.stringify(test));
  // console.log("TEST "+ JSON.stringify(tabFinal));
  const test = {
    "videoTextFields": [
      {
        "name": "s1-txt",
        "maxCharacters": 30,
        "defaultText": "9 mois que nous l'attendions",
        "customizable": true
      },
      {
        "name": "s2-txt",
        "maxCharacters": 35,
        "defaultText": "Nous avons d'abord entendu son cœur",
        "customizable": true
      },
      {
        "name": "s3-txt",
        "maxCharacters": 25,
        "defaultText": "Senti ses petites mains",
        "customizable": true
      },
      {
        "name": "s4-txt",
        "maxCharacters": 40,
        "defaultText": "Pas encore là, nous l'aimions déjà ...",
        "customizable": true
      },
      {
        "name": "s5-txt",
        "maxCharacters": 42,
        "defaultText": "... et maintenant, il illumine notre vie !",
        "customizable": true
      },
      {
        "name": "s6-txt",
        "maxCharacters": 45,
        "defaultText": "Alexandre est né le 12 janvier 2025",
        "customizable": true
      }
    ]
  }

  test2Parse.videoTextFields.forEach(field => {
    console.log(`Name: ${field.name}`);
  })

  console.log(test);
  console.log(test2);
  console.log(test2Parse);
  console.log(tabFinal);
  

  // console.log("TEST "+ selectedTemplate);
  // console.log("TEST "+ test);
  // console.log("TEST "+ tabFinal);



  // if (selectedTemplate) {
  //   console.log("Template sélectionné :", selectedTemplate.textes_video);
  //   setTabApresClicSurChoixTemplate(selectedTemplate.textes_video);

  //   // Vérifiez si videoTextFields existe et est un tableau
  //   if (selectedTemplate.textes_video?.videoTextFields) {
  //     const names = selectedTemplate.textes_video.videoTextFields.map(
  //       (field) => field.name
  //     );
  //     console.log("Noms des champs :", names);
  //   } else {
  //     console.log("Pas de champs videoTextFields dans le template sélectionné");
  //   }
  // } else {
  //   console.log("Aucun template trouvé");
  // }


};







  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Choisissez votre template
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        (Explication du pourquoi du choix du template)
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* {visuelsVideos.map((src, index) => ( */}
        {imagesVideosFitred.map((src, index) => (
          <Grid item key={index} xs={6} sm={4} md={3}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200,
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
            <Typography>{src.nom_modele_video || "pas d'info"}</Typography>
            <Checkbox />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleVideoClickCustom}
          >
            Je choisi ce template 2
          </Button>
          {/* {VideoCustomParam && (

          ) } */}
        </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                margin: "auto",
                mt: 5,
              }}
            >
              <TextField
                label="Votre description"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Envoyer
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
