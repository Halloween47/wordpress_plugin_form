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
import { Box, Typography, Grid, TextField, Button, Checkbox } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";

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
    templateId: '1',
    descr: '',
    variables: {
      scene1_texte1: "Test écriture variable",
      scene2_image1: "https://img.freepik.com/photos-gratuite/nuages-stylefantastique_23-2151057680.jpg",
      scene2_image2: "https://i.pinimg.com/736x/7a/c6/91/7ac69100e88a63a14b9cbe8ba260721f.jpg",
      scene2_texte1: "Ceci est un message varible postman",
      scene3_image2: "https://archzine.fr/wp-content/uploads/2020/03/wallpaperordinateur-pc-fond-ecran-kawaii-dessin-cactus-vert-fleurs-roses.webp",
      scene3_texte1: "Cela fonctionne bien ?",
      scene3_image3: "https://cdn.futura-sciences.com/cdncgi/image/width=1024,quality=60,format=auto/sources/images/screen/EVENEMENT/Hiver/965-hiver-43.jpg"
    },
  });
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));
  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const videoRefs = useRef([]);

  // Fonction pour gérer le changement dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction de soumission du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  const apiUrl = 'https://core-api.memenza.fr/api/wp-media/create-with-tpl';
  const apiKey = process.env.REACT_APP_MEMENZA_API_KEY;

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'WP-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      withCredentials: true,  // Ajouter cette option pour inclure les credentials
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
        const response = await fetch("/wp-json/plugin_memenza/v1/videos_visuel");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setVisuelsVideos(result);
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

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Choisissez votre template
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        (Explication du pourquoi du choix du template)
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {visuelsVideos.map((src, index) => (
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
            <Checkbox />
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
                name="descr"
                value={formData.descr}
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

