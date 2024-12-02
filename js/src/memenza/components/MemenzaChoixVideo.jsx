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

const videos = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
];

export default function MemenzaChoixVideo() {
  const [formData, setFormData] = useState({
    template_id: "RdLlSO4FUmAV6fPHvKT1",
    desc: "",
    variables: {},
  });

  const [visuelsVideos, setVisuelsVideos] = useState([]);
  const [tabParseTextesVideo, setTabParseTextesVideo] = useState([]);
  const [tabParseMediasVideo, setTabParseMediasVideo] = useState([]);
  // console.log("TEST FINAL MEDIA : " + JSON.stringify(tabParseMediasVideo));
  
  
  const [isPlaying, setIsPlaying] = useState(Array(videos.length).fill(false));
  const [apparitionParametrage, setApparitionParametrage] = useState(false);

  const videoRefs = useRef([]);
  const { selectedSousCatId } = useSousCat();

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

    console.log("TABLEAU COMPLET" + JSON.stringify(selectedTemplate));

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

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Choisissez votre template
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        (Explication du pourquoi du choix du template)
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {imagesVideosFiltered.map((src, index) => (
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
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleVideoClickCustom}
            >
              Je choisis ce template
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
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Affichage des médias vidéo */}
      {apparitionParametrage && tabParseMediasVideo.length > 0 && (
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
      )}
    </Box>
  );
}
