import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import ChoixPropreVisuel from "../componentsMemenza/ChoixPropreVisuel.jsx";
import ImageUploader from "../componentsMemenza/ImageUploader.jsx";

// Styled Components
const FormGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
});

const StyleEtapeVisuel = `
.etape-visuel-intro {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }  
     .etape-visuel-intro-txt {
//     // background-color: green;
     width: 100%;
     color: #333;
     font-size: 16px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: flex-start;
     text-align: left;
   }

  .selected-card {
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 105, 180, 0.6);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 1;
    }

    &.selected::after {
      opacity: 1;
      z-index: 0;
    }

    .check-icon {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: green;
      font-size: 2rem;
      z-index: 3;
    }
  }
`;

// Composant VisuelCard
const VisuelCard = ({ item, isSelected, onClick }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card
      className={`selected-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      sx={{
        transform: 'scale(1.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        padding: '20px',
        '&:hover': {
          transform: 'scale(1.15)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={item.img_modele}
        alt={item.nom_modele}
      />
      <CardContent>
        <Typography>{item.nom_modele}</Typography>
        {isSelected && (
          <CheckCircleIcon className="check-icon" sx={{color: 'green'}}/>
        )}
      </CardContent>
    </Card>
  </Grid>
);

// const TestVisuelFusion = () => {
const TestVisuelFusion = ({ activeStep, setActiveStep }) => {
  const { 
    visuelGeneratedImageUrl, 
    setVisuelGeneratedImageUrl,
    visuelChampText1,
    setVisuelChampText1,
    visuelDataVignetteClique,
    setVisuelDataVignetteClique,
    visuelTextesCadres, 
    setVisuelTextesCadres, 
    visuelIdVignetteSelectionner, 
    setVisuelIdVignetteSelectionner, 
    pathImageGenerate, 
    setPathImageGenerate, 
    setImageVisuelPath, 
    previsuOwnVisu, 
    isGenerate, 
    setIsGenerate, 
    selectedSousCatId, 
    navigationId, 
    outputFilePathContext, 
    setOutputFilePathContext } = useSousCat();

    const [previousBlobUrl, setPreviousBlobUrl] = useState(null);
  const [testAvecFile, setTestAvecFile] = useState();
  
  const [fichierPersoDetect, setFichierPersoDetect] = React.useState(false);
  const [filePerso, setFilePerso] = React.useState(false);
  
  const [mediaFiles, setMediaFiles] = React.useState([]);
  // console.log("CONTENU DE MEDIA FILE : " + JSON.stringify(mediaFiles));
  
  const [imageCustimzation, setImageCustimzation] = useState(null);
  // console.log("INITIAL ImageCustom :  : " + imageCustimzation);

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1); // Incrémenter l'étape
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const [selectedVisuelId, setSelectedVisuelId] = useState(null);
  const [imagesVisuels, setImagesVisuels] = useState([]);
  const [dataVignettesClique, setDataVignettesClique] = useState([]);
  const [formData, setFormData] = useState({
    text1: '',
    text2: '',
    // image1: '',
    // image2: '',
  });
  
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); 

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);

  // const textesCadres = dataVignettesClique.length
  //  ? JSON.parse(dataVignettesClique[0].textes_cadres)
  // : null;
  const textesCadres = visuelDataVignetteClique.length
    ? JSON.parse(visuelDataVignetteClique[0].textes_cadres)
    : null;
    // console.log("VALEURS DE TEXTE_CADRES : " + JSON.stringify(textesCadres));
  //   useEffect(() => {
  //     setVisuelTextesCadres(textesCadres);
  //     console.log("TEXTESCADRES DANS CONTEXTE : " + visuelTextesCadres);
      
  // }, [textesCadres]);
  
    
    if (textesCadres && Array.isArray(textesCadres.fields)) {
      textesCadres.fields.forEach((field, index) => {
          // console.log(`Champ ${index + 1} - customizable : ${field.customizable}`);
          // console.log(`Champ test`);
      });
  } 
  // else {
  //     console.log("Aucune donnée dans textesCadres ou le format est invalide.");
  // }
    
    // const visuelsCadres = useMemo(() => {
    //   return dataVignettesClique.length
    //     ? JSON.parse(dataVignettesClique[0].visuels_cadres)
    //     : null;
    // }, [dataVignettesClique]);
    const visuelsCadres = useMemo(() => {
      return visuelDataVignetteClique.length
        ? JSON.parse(visuelDataVignetteClique[0].visuels_cadres)
        : null;
    }, [visuelDataVignetteClique]);
    // console.log("ETAT DE VISUELCADRES : " + JSON.stringify(visuelsCadres));

    if (visuelsCadres && Array.isArray(visuelsCadres.imageFields)) {
      visuelsCadres.imageFields.forEach((field, index) => {
          // console.log(`Champ ${index + 1} - customizable IMAGEFIELDS : ${field.customizable}`);
      });
  } 
    
    
  useEffect(() => {
    if (textesCadres) {
      // Extraire les champs pour text1 et text2
      const text1Field = textesCadres.fields.find(field => field.name === "text1");
      const text2Field = textesCadres.fields.find(field => field.name === "text2");
      // console.log("Verif text2Field : " + JSON.stringify(text2Field));
      const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
      const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
      // console.log("Verif image2Field : " + JSON.stringify(image2Field));
      
      
      // Définir les constantes pour text1
      const text1_fontfamily = text1Field?.font.family || "";
      const image1_defaultFile = image1Field?.defaultFile || "";
      const image2_defaultFile = image2Field?.defaultFile || "";
    
      const text1_size = text1Field?.font.size || 0;
      const text1_x = text1Field?.x_percent || 0;
      const text1_y = text1Field?.y_percent || 0;
      const text1_colorR = text1Field?.color?.R || 0;      
      const text1_colorV = text1Field?.color?.V || 0;
      const text1_colorB = text1Field?.color?.B || 0;
  
      // Définir les constantes pour text2
      const text2_fontfamily = text2Field?.font.family || "";
      const text2_size = text2Field?.font.size || 0;
      const text2_x = text2Field?.x_percent || 0;
      const text2_y = text2Field?.y_percent || 0;
      const text2_colorR = text2Field?.color?.R || 0;
      const text2_colorV = text2Field?.color?.V || 0;
      const text2_colorB = text2Field?.color?.B || 0;
  
      // Mettre à jour formData avec les nouvelles constantes
      setFormData(prevFormData => {
        const updatedFormData = {
          ...prevFormData,
          text1: prevFormData.text1 || text1Field?.defaultValue || "",
          text2: prevFormData.text2 || text2Field?.defaultValue || "",
          "text1-fontfamily": text1_fontfamily,
          "image1": "https://memenza.fr/" + image1_defaultFile,
          "image2": "https://memenza.fr/" + image2_defaultFile,
          // "image2": "https://memenza.fr/" + image2_defaultFile,
          // "image2": fichierPersoDetect ? 
          //   "https://memenza.fr/visuels/uploads/" + navigationId + "/" + "mediaPerso.jpg" :
          //   "https://memenza.fr/" + image2_defaultFile,
          "text1-size": text1_size,
          "text1-x": text1_x,
          "text1-y": text1_y,
          "text1-colorR": text1_colorR,
          "text1-colorV": text1_colorV,
          "text1-colorB": text1_colorB,
          "text2-fontfamily": text2_fontfamily,
          "text2-size": text2_size,
          "text2-x": text2_x,
          "text2-y": text2_y,
          "text2-colorR": text2_colorR,
          "text2-colorV": text2_colorV,
          "text2-colorB": text2_colorB,
        };
  
        // Ne pas mettre à jour si les valeurs sont identiques
        return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
          ? prevFormData
          : updatedFormData;
      });
    }
  }, [textesCadres]);
   
  useEffect(() => {
    if (visuelsCadres?.imageFields?.length) {
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          // image1: prevFormData.image1 || visuelsCadres.imageFields[0]?.defaultFile || null,
          // image2: prevFormData.image2 || visuelsCadres.imageFields[1]?.defaultFile || null,
          // image1: prevFormData.image1 || "/home/memenzj/www/" + visuelsCadres.imageFields[0]?.defaultFile || null,
          // image2: prevFormData.image2 || "/home/memenzj/www/" + visuelsCadres.imageFields[1]?.defaultFile || null,
        };
        
        // Retourne l'ancien formData si rien n'a changé pour éviter les re-rendus inutiles
        return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
          ? prevFormData
          : updatedFormData;
      });
    }
  }, [visuelsCadres]);
    
// Récupération des données de images_visuel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/images_visuel");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        const result = await response.json();
        setImagesVisuels(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  if (!imagesVisuels.length) {
    return <Typography>Chargement des visuels...</Typography>;
  }

  const handleVisuelClickCustom = (id) => {
    setSelectedVisuelId(id);
    setVisuelIdVignetteSelectionner(id);
    
    console.log("contenu de formdata à l'instant T : " + JSON.stringify(formData));
    

    setFormData((prevFormData) => ({
      ...prevFormData,
      text1: "", // Effacer la valeur saisie pour text1
      text2: "", // Effacer la valeur saisie pour text2
    }));
  
    const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
    setDataVignettesClique(filtreSelonVignetteSelectionne);
    setVisuelDataVignetteClique(filtreSelonVignetteSelectionne)
  
    // Récupération des valeurs par défaut pour les champs texte
    if (filtreSelonVignetteSelectionne.length) {
      const textesCadres = JSON.parse(filtreSelonVignetteSelectionne[0].textes_cadres);
      const text1Field = textesCadres.fields.find(field => field.name === "text1");
      const text2Field = textesCadres.fields.find(field => field.name === "text2");
      const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
      const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
  
      setFormData({
        text1: text1Field?.defaultValue || "", // Valeur par défaut ou chaîne vide
        text2: text2Field?.defaultValue || "", // Valeur par défaut ou chaîne vide
        // image1: image1Field?.defaultFile || "", // Réinitialisation des images si nécessaire
        // image2: image2Field?.defaultFile || "", // Réinitialisation des images si nécessaire
      });
    } else {
      // Si aucun cadre n'est trouvé, réinitialisez simplement les champs
      setFormData({
        text1: "",
        text2: "",
        image1: null,
        image2: null,
      });
    }
    
  };
  const handleChange = (e) => {
    // console.log("HANDLECHANGE contenu e : " + JSON.stringify(e.target));
    
    const { name, value, files } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value === "" ? "" : value, // Si le champ est effacé, on garde une chaîne vide
    }));
    console.log("formdata dans le handleChange : " + JSON.stringify(formData));
    
  };

  
const handleVisuelTemplatePerso2 = async (event) => {
  console.log("FONCTION ACTIVE");
  const file = event.target.files[0];
  
  const fileBlob = new Blob([file], { type: file.type });
  console.log("Blob généré :", fileBlob);
  
  // Met à jour l'état pour utilisation dans handleSubmit
  setTestAvecFile(fileBlob);
  setFichierPersoDetect(true);

};
const handleSubmit2 = async (e) => {
  e.preventDefault();

  const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
  const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;
  setOutputFilePathContext(outputFilePath);

  const convertToBlob = async (imageFileOrURL) => {
    if (typeof imageFileOrURL === "string") {
      const response = await fetch(imageFileOrURL);
      if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image : ${imageFileOrURL}`);
      }
      return await response.blob();
    } else if (imageFileOrURL instanceof File || imageFileOrURL instanceof Blob) {
      return imageFileOrURL;
    } else {
      throw new Error("Type d'image non valide. Attendu : URL, File ou Blob.");
    }
  };

  let image1Blob = await convertToBlob(formData["image1"]);
  let image2Blob;

  // Utilisation du fichier personnalisé détecté, ou fallback vers le chemin image2 du formData
  if (fichierPersoDetect && testAvecFile) {
    console.log("Utilisation du fichier personnalisé détecté");
    image2Blob = testAvecFile; // Le Blob est passé depuis handleVisuelTemplatePerso2 via setTestAvecFile
    console.log("IMAGE2BLOB avec file direct : " + image2Blob);
  } else {
    image2Blob = await convertToBlob(formData["image2"]);
  }

  const qrCode = `"https://memenza.fr/wp-content/plugins/ProductImageCustomizer/js/qrcode.png"`;
  const formPayload = new FormData();
  formPayload.append("text1", formData.text1);
  formPayload.append("text2", formData.text2);
  formPayload.append("output_file", outputFilePath);
  formPayload.append("dossier", outputFolder);
  formPayload.append("image1", image1Blob, "image1.jpg");
  formPayload.append("image2", image2Blob, `${navigationId}.jpg`);
  // formPayload.append("qrcode", qrCode);
  // formPayload.append("imagecmd", outputFilePath);

  // Ajouter les nouveaux champs pour text1 et text2...
  formPayload.append("text1-fontfamily", formData["text1-fontfamily"]);
  formPayload.append("text1-size", formData["text1-size"]);
  formPayload.append("text1-x", formData["text1-x"]);
  formPayload.append("text1-y", formData["text1-y"]);
  formPayload.append("text1-colorR", formData["text1-colorR"]);
  formPayload.append("text1-colorV", formData["text1-colorV"]);
  formPayload.append("text1-colorB", formData["text1-colorB"]);
  
   // Ajouter les nouveaux champs pour text2
   formPayload.append("text2-fontfamily", formData["text2-fontfamily"]);
   formPayload.append("text2-size", formData["text2-size"]);
   formPayload.append("text2-x", formData["text2-x"]);
   formPayload.append("text2-y", formData["text2-y"]);
   formPayload.append("text2-colorR", formData["text2-colorR"]);
   formPayload.append("text2-colorV", formData["text2-colorV"]);
   formPayload.append("text2-colorB", formData["text2-colorB"]);

   // A NE PAS EFFECER - Code pour verification des datas passé en payload
  // formPayload.forEach((value, key) => {
  //   console.log("VERIFICATION DU FORMPAYLOAD POUR ENVOI DES BONNES DATA : " + key, value);
  // });

  try {
    const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
      method: "POST",
      body: formPayload,
    });

    // A NE PAS EFFECER - Code pour verification des response retour
    // console.log("Statut de la réponse :", response.status);
    // console.log("En-têtes de la réponse :", [...response.headers]);
    
    if (!response.ok) {
      throw new Error("Erreur lors de la soumission du formulaire");
    }
    
    const result = await response.blob();    
    const url = URL.createObjectURL(result);
    // A NE PAS EFFECER - Verification retour
    // console.log("Blob reçu :", result);
    // console.log("URL générée :", url);

    


    setGeneratedImageUrl(url);
    setPathImageGenerate(url);
    setIsGenerate(true);

    setVisuelGeneratedImageUrl(url);


  } catch (error) {
    setError(error.message);
  }
};

const handleSubmit3 = async (e) => {
  e.preventDefault();
  
  const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
  const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;

  const convertToBlob = async (imageFileOrURL) => {
    if (typeof imageFileOrURL === "string") {
      const response = await fetch(imageFileOrURL);
      if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image : ${imageFileOrURL}`);
      }
      return await response.blob();
    } else if (imageFileOrURL instanceof File || imageFileOrURL instanceof Blob) {
      return imageFileOrURL;
    } else {
      throw new Error("Type d'image non valide. Attendu : URL, File ou Blob.");
    }
  };

  let image1Blob = await convertToBlob(formData["image1"]);
  let image2Blob;

  // Utilisation du fichier personnalisé détecté, ou fallback vers le chemin image2 du formData
  if (fichierPersoDetect && testAvecFile) {
    console.log("Utilisation du fichier personnalisé détecté");
    image2Blob = testAvecFile; // Le Blob est passé depuis handleVisuelTemplatePerso2 via setTestAvecFile
    console.log("IMAGE2BLOB avec file direct : " + image2Blob);
  } else {
    console.log("Conversion normale de image2 en Blob");
    image2Blob = await convertToBlob(formData["image2"]);
  }

  const formPayload = new FormData();
  formPayload.append("text1", formData.text1);
  formPayload.append("text2", formData.text2);
  formPayload.append("output_file", outputFilePath);
  formPayload.append("dossier", outputFolder);
  formPayload.append("image1", image1Blob, "image1.jpg");
  formPayload.append("image2", image2Blob, `${navigationId}.jpg`);
  // formPayload.append("qrcode", qrCode);
  // formPayload.append("imagecmd", outputFilePath);

  // Ajouter les nouveaux champs pour text1 et text2...
  formPayload.append("text1-fontfamily", formData["text1-fontfamily"]);
  formPayload.append("text1-size", formData["text1-size"]);
  formPayload.append("text1-x", formData["text1-x"]);
  formPayload.append("text1-y", formData["text1-y"]);
  formPayload.append("text1-colorR", formData["text1-colorR"]);
  formPayload.append("text1-colorV", formData["text1-colorV"]);
  formPayload.append("text1-colorB", formData["text1-colorB"]);
  
   // Ajouter les nouveaux champs pour text2
   formPayload.append("text2-fontfamily", formData["text2-fontfamily"]);
   formPayload.append("text2-size", formData["text2-size"]);
   formPayload.append("text2-x", formData["text2-x"]);
   formPayload.append("text2-y", formData["text2-y"]);
   formPayload.append("text2-colorR", formData["text2-colorR"]);
   formPayload.append("text2-colorV", formData["text2-colorV"]);
   formPayload.append("text2-colorB", formData["text2-colorB"]);

  formPayload.forEach((value, key) => {
    console.log("VERIFICATION DU FORMPAYLOAD POUR ENVOI DES BONNES DATA : " + key, value);
  });

  try {
    const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
      method: "POST",
      body: formPayload,
    });

    console.log("Réponse brute du serveur :", response);
  
    if (!response.ok) {
      throw new Error("Erreur lors de la soumission du formulaire");
    }
  
    // Vérification du type MIME
    const contentType = response.headers.get("Content-Type");
    console.log("Type de contenu de la réponse : ", contentType);
  
    if (!contentType || !contentType.startsWith("image")) {
      throw new Error("Le serveur n'a pas renvoyé une image.");
    }
  
    const result = await response.blob();
  
    // Vérifier que le Blob est valide
    console.log("Résultat Blob reçu : ", result);
  
    if (previousBlobUrl) {
      URL.revokeObjectURL(previousBlobUrl);
    }
  
    // Créer une nouvelle URL pour le Blob
    const newBlobUrl = URL.createObjectURL(result);
    console.log("Nouvelle URL générée :", newBlobUrl);

    // Tester si l'URL Blob est accessible
const img = new Image();
img.onload = () => console.log("L'image est accessible !");
img.onerror = () => console.error("Erreur : l'image n'est pas accessible !");
img.src = newBlobUrl;
  
    // Mettre à jour l'état avec la nouvelle URL
    setPreviousBlobUrl(newBlobUrl); // Stocker la nouvelle URL
    setVisuelGeneratedImageUrl(newBlobUrl); // Mettre à jour l'image à afficher
    setIsGenerate(true); // Indiquer que la génération est terminée
  } catch (error) {
    console.error("Erreur lors de la génération de l'image :", error);
    setError(error.message);
  }
  
};

  return (
    <Box sx={{ textAlign: "center", bgcolor: "#f5f5f5" }}>
      <Box className="etape-visuel-intro">
           <Box className="etape-visuel-intro-img">
             <img
              // src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
              src="https://memenza.fr/visuels/personnaliser.png"
              alt=""
              style={{ 
                // width: "100%",
                // height: "100%",
                width: "100px", 
                height: "100px",
                borderRadius: "8px",
                objectFit: "cover", }}
            />
          </Box>
          <Box className="etape-visuel-intro-txt" sx={{ p: 4 }}>
          <Typography variant="h4" color="textPrimary"sx={(theme) => ({
    mb: 1,
    fontSize: {
      xs: '1.5rem',
      sm: '2rem',    
      md: '2.5rem',  
      lg: '3rem',   
    },
  })}>
            Personnaliser le visuel 
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={(theme) => ({
    pr: 3,
    fontSize: {
      xs: '0.875rem', // petite taille d'écran
      sm: '1rem',     // taille intermédiaire
      md: '1.125rem', // écran moyen
      lg: '1.5rem',  // grand écran
    },
  })}>
            Vous pouvez utiliser les modèles Memenza ou directement télécharger votre visuel (créé par exemple avec Canva). La taille d’image attendue est de 1086x1086px.
            </Typography> 
          </Box>
      </Box>
      <ChoixPropreVisuel />
      { previsuOwnVisu && (
        <Box sx={{ mt: 2 }}>
        <CardMedia
          component="img"
          image={previsuOwnVisu}
          alt="Image générée"
          sx={{
            maxWidth: '70%',  // L'image occupe toute la largeur du conteneur, sans dépasser
            height: 'auto',    // La hauteur de l'image s'ajuste proportionnellement
            maxHeight: '200px',  // Hauteur maximale pour ne pas déborder
            objectFit: 'contain', // Assure que l'image est bien ajustée sans déformation
          }}
        />
      </Box>
      )
      }
      <Divider sx={{ mt: 2 }}> OU </Divider>
      <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
        <Typography variant="h5" color="textSecondary">Choisissez votre modèle</Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {tableauFiltrePourVignette.map((item, index) => (
          <VisuelCard
            key={index}
            item={item}
            // isSelected={selectedVisuelId === item.id_modele_cadre}
            isSelected={visuelIdVignetteSelectionner === item.id_modele_cadre}
            onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
          />
        ))}
      </Grid>
      {/* {selectedVisuelId && ( */}
      {visuelIdVignetteSelectionner && (
        <Box
          component="form"
          onSubmit={handleSubmit2}
          encType="multipart/form-data"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, maxWidth: 400, margin: "auto", mt:"100px" }}
        >
          
          <Typography variant="h6">Générer une image</Typography>
          {error && <Typography color="error">{error}</Typography>}
{/* {visuelTextesCadres.fields.map((field, index) =>  */}
{textesCadres.fields.map((field, index) => 
  field.customizable && (
    <TextField
      key={index}
      label={isFocused ? "max. 17 caractères" : formData[`text${index + 1}`]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      name={`text${index + 1}`}
      onChange={handleChange}
      inputProps={{ maxLength: field.length || 17 }} // Utilise la longueur si définie
      required
      sx={{ paddingTop: 1.2, marginBottom: 1.2 }}
      InputLabelProps={{
        sx: {
          paddingTop: 1.2,
          marginBottom: 1,
          "&.MuiInputLabel-shrink": {
            transform: "translate(0, -16px) scale(0.75)",
          },
        },
      }}
    />
  )
)}
<Box>
{visuelsCadres.imageFields.map((field, index) => 
  field.customizable && (
    <Button component="label" variant="contained" sx={{ mr: "10px" }} key={index}>
        Envoyer mon image
        <input
        name={field.name}
          type="file"
          hidden
          accept="image/*" // Limite les fichiers à des images
          onChange={(e) => handleVisuelTemplatePerso2(e)}
        />
      </Button>
    // <ImageUploader />
  )
)}
</Box>



          <Button type="success" variant="contained">
            Prévisualiser votre cadre
          </Button>
          {/* {generatedImageUrl && ( */}
          {visuelGeneratedImageUrl && (
            <Box sx={{ mt: 2 }}>
              {/* <CardMedia component="img" image={generatedImageUrl} alt="Image générée" /> */}
              <CardMedia component="img" image={visuelGeneratedImageUrl} alt="Image générée" />
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        
                        <Button
                          disabled={activeStep === 0}
                          // disabled={activeStep === 0 || !isGenerate}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Retour
                        </Button>
                    
        <Tooltip
          // title={!generatedImageUrl ? "Veuillez générer l'image d'abord" : "Veuillez générer l'image d'abord"}
          title={!previsuOwnVisu && !generatedImageUrl ? "Veuillez télécharger  ou générer une image d'abord" : ""}
          arrow
          sx={{ zIndex: "9999 !important" }} 
        >
        <span>
        {/* Le bouton est encapsulé dans un span pour que Tooltip fonctionne aussi quand le bouton est désactivé */}
          <Button
            type="button"
            variant="contained"
            // disabled={!generatedImageUrl} // Le bouton est désactivé si `generatedImageUrl` est null
            disabled={!previsuOwnVisu && !generatedImageUrl}
            onClick={handleNext}
            sx={{ mt: 4, mr: "1rem" }}
          >
            Suivant
          </Button>
        </span>
        </Tooltip>
      </Box>

    <style>{StyleEtapeVisuel}</style>
    </Box>
  );
};

export default TestVisuelFusion;

