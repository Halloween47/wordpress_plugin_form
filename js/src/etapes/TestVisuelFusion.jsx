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
  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1); // Incrémenter l'étape
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };
  const { setPathImageGenerate, setImageVisuelPath, previsuOwnVisu, isGenerate, setIsGenerate, selectedSousCatId, navigationId, outputFilePathContext, setOutputFilePathContext } = useSousCat();
  // console.log(isGenerate);
  const [selectedVisuelId, setSelectedVisuelId] = useState(null);
  const [imagesVisuels, setImagesVisuels] = useState([]);
  const [dataVignettesClique, setDataVignettesClique] = useState([]);
  const [formData, setFormData] = useState({
    text1: '',
    text2: '',
    image1: '',
    image2: '',
    // image1: null,
    // image1: '',
    // image2: null,
  });
  // console.log("CONTENU DE FORMADATA : " + JSON.stringify(formData));
  
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); 

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);

  const textesCadres = dataVignettesClique.length
    ? JSON.parse(dataVignettesClique[0].textes_cadres)
    : null;
    // console.log("VALEURS DE TEXTE_CADRES : " + JSON.stringify(textesCadres));
    
    if (textesCadres && Array.isArray(textesCadres.fields)) {
      textesCadres.fields.forEach((field, index) => {
          // console.log(`Champ ${index + 1} - customizable : ${field.customizable}`);
          // console.log(`Champ test`);
      });
  } else {
      console.log("Aucune donnée dans textesCadres ou le format est invalide.");
  }
    
    const visuelsCadres = useMemo(() => {
      return dataVignettesClique.length
        ? JSON.parse(dataVignettesClique[0].visuels_cadres)
        : null;
    }, [dataVignettesClique]);
    // console.log("ETAT DE VISUELCADRES : " + JSON.stringify(visuelsCadres));

    if (visuelsCadres && Array.isArray(visuelsCadres.imageFields)) {
      visuelsCadres.imageFields.forEach((field, index) => {
          // console.log(`Champ ${index + 1} - customizable IMAGEFIELDS : ${field.customizable}`);
      });
  } else {
      console.log("Aucune donnée dans textesCadres ou le format est invalide.");
  }
    
    const defaultFiles = visuelsCadres?.imageFields.map(field => field.defaultFile) || [];
    
  useEffect(() => {
    if (textesCadres) {
      // Extraire les champs pour text1 et text2
      const text1Field = textesCadres.fields.find(field => field.name === "text1");
      const text2Field = textesCadres.fields.find(field => field.name === "text2");
      // console.log("Verif text2Field : " + JSON.stringify(text2Field));
      const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
      // console.log("Verif image2Field : " + JSON.stringify(image2Field));
      
      
      // Définir les constantes pour text1
      const text1_fontfamily = text1Field?.font.family || "";
      // const image2_defaultFile = image2Field?.defaultFile || "";
      // console.log("Verif image2_defaultFile : " + JSON.stringify(image2_defaultFile));
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
          // "image2": image2_defaultFile,
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      text1: "", // Effacer la valeur saisie pour text1
      text2: "", // Effacer la valeur saisie pour text2
    }));
  
    const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
    setDataVignettesClique(filtreSelonVignetteSelectionne);
  
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
    console.log("HANDLECHANGE contenu e : " + JSON.stringify(e.target));
    
    const { name, value, files } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value === "" ? "" : value, // Si le champ est effacé, on garde une chaîne vide
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
    const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;

    setOutputFilePathContext(outputFilePath);
    const formPayload = new FormData();
    formPayload.append("text1", formData.text1);
    formPayload.append("text2", formData.text2);
    formPayload.append("output_file", outputFilePath);
    // console.log("VERIF DUPLICA DOSSIER (outpufilepath) : " + JSON.stringify(outputFilePath));
    formPayload.append("dossier", outputFolder);
    // console.log("VERIF DUPLICA DOSSIER (outputFolder) : " + JSON.stringify(outputFolder));
    formPayload.append("image1", generatedImageUrl);
    // console.log("VERIF DUPLICA DOSSIER (image1) : " + JSON.stringify(formData.image1));
    formPayload.append("image2", generatedImageUrl);
    console.log("VERIF DUPLICA DOSSIER (image2) : " + JSON.stringify(formData.image2));
    
    // Ajouter les nouveaux champs pour text1
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

    for (const [key, value] of formPayload.entries()) {
      // console.log(" TEST VERIF PAYLOAD AVEC LISTE KEYS : " + key, value);
    }
    // if (formData.image1) formPayload.append("image1", formData.image1);
    // if (formData.image2) formPayload.append("image2", formData.image2);
    // console.log("VERIFICATION DU FORMPAYLOAD POUR ENVOI DES BONNES DATA : " + JSON.stringify(formPayload));
    
    try {
      const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
        method: "POST",
        body: formPayload,
        // Pour test sans envoi de data
        // body: "",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission du formulaire");
      }


      // const responseJson = await response.json();
      const result = await response.blob();
      // const data = await response.json();
      const url = URL.createObjectURL(result);
      // console.log("LIENDE responseJson : " + JSON.stringify(responseJson));
      setGeneratedImageUrl(url);
      setPathImageGenerate(url)

      // console.log("LIENDE DATA !!!E : " + JSON.stringify(response));
      // setImageVisuelPath(result.imageUrl);
      
      setIsGenerate(true)
      // console.log("TEST PREVISU VOICI LE RESULT DE LA REPONSE : " + JSON.stringify(result));
      // console.log("TEST PREVISU VOICI LERESULTAT DE LID : " + JSON.stringify(url));
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileUpload = (event, fieldName) => {
    const { name, value, files } = event.target;
    if (files) {
      console.log("Fichier sélectionné : ", files[0]);  
      console.log("Fichier name : ", name);  
      console.log("Fichier value : ", value);  
    }
    setFormData((prevData) => ({
      ...prevData,
      // [fieldName]: files ? files[0] : value,
      [fieldName]: value,
    }));
    console.log("Fichier formadata : ", formData);  
    // console.log("Contenu de formdata FIELDNAME :" + JSON.stringify(fieldName));
    // const file = event.target.files[0];
    // if (file) {
    //   const imageUrl = URL.createObjectURL(file); // Crée une URL temporaire pour prévisualiser l'image
    //   console.log("Lien temporaire de l'image : " + imageUrl);
  
    //   // Met à jour l'URL générée avec le fichier sélectionné
    //   setGeneratedImageUrl(imageUrl);
    //   console.log("Contenu de generatedimageurl :" + JSON.stringify(generatedImageUrl));
      
    //   // Si vous souhaitez ajouter le fichier au formData
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [fieldName]: file, // Enregistre le fichier pour une soumission ultérieure
    //     // [fieldName]: imageUrl, // Enregistre le fichier pour une soumission ultérieure
    //   }));
    //   console.log("Contenu de formdata après chargement fichier :" + JSON.stringify(formData));
    // }
  };

  const handleFileUpload2 = (event, fieldName) => {
    console.log("Fichier fieldname : ", fieldName);
    const { files } = event.target;
  
    if (files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file); // Crée une URL temporaire pour la prévisualisation
  
      console.log("Fichier sélectionné : ", file);
      console.log("Lien temporaire de l'image : ", imageUrl);
  
      // Met à jour le formData avec le fichier et l'URL temporaire
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file, // Stocke le fichier pour l'upload final
        [`${fieldName}Preview`]: imageUrl, // Stocke l'URL temporaire pour la prévisualisation
      }));
    } else {
      console.error("Aucun fichier sélectionné.");
    }
  
    // Affiche le formData actuel dans la console
    setTimeout(() => {
      console.log("Contenu actuel de formData :", formData);
    }, 0); // Utilisation d'un timeout pour s'assurer que le state est mis à jour avant l'affichage
  };
  const handleFileUpload3 = (event, fieldName) => {
    const file = event.target.files[0];
    console.log("handleFileUpload3 (file\"string\") : " + JSON.stringify(file));
    console.log("handleFileUpload3 (file) : " + file);
    // console.log("handleFileUpload3 (file\"parse\") : " + fileParse);
    
    // if (file) {
      //   setCheck(true);      
      // }
      setFormData((prevFiles) => [
        ...(Array.isArray(prevFiles) ? prevFiles : []),
        { fieldName, file },
      ]);
      
      console.log("handleFileUpload3 (formadata) : " + JSON.stringify(formData));
    // if (file) {
    //   if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    //     console.error("Seuls les fichiers d'image ou de vidéo sont autorisés.");
    //     return;
    //   }
    //   const fileExtension = file.name.split('.').pop(); // Récupère la partie après le dernier "."
    //   const validExtension = fileExtension && fileExtension.length <= 5 ? fileExtension : 'unknown';
    //   const mediaName = `media${mediaCounter}.${validExtension}`;
    //   console.log("Nom de fichier généré : ", mediaName);
    //   setVariables((prevState) => ({
    //     ...prevState, 
    //     [fieldName]: `https://memenza.fr/visuels/uploads/${navigationId}/${mediaName}`, 
    //   }));
    //   setCheckedFields((prevChecked) => ({
    //     ...prevChecked,
    //     [fieldName]: true,
    //   }));
    //   setMediaCounter((prevCount) => prevCount + 1);
    // }
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
      lg: '1.25rem',  // grand écran
    },
  })}>
            Vous pouvez utiliser les modèles Memenza ou directement uploader votre visuel (créé par exemple avec Canva). La taille d’image attendue est de 1086x1086px.
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
            isSelected={selectedVisuelId === item.id_modele_cadre}
            onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
          />
        ))}
      </Grid>
      {selectedVisuelId && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, maxWidth: 400, margin: "auto", mt:"100px" }}
        >
          
          <Typography variant="h6">Générer une image</Typography>
          {error && <Typography color="error">{error}</Typography>}
          {/* <TextField
            label={isFocused ? "max. 15 caractères" : formData.text1}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="text1"
            // value={formData.text1}
            onChange={handleChange}
            inputProps={{ maxLength: 15 }}
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
          <TextField
            label={isFocused ? "max. 17 caractères" : formData.text2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="text2"
            // value={formData.text2}
            // placeholder={formData.text2}
            onChange={handleChange}
            inputProps={{ maxLength: 17 }}
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
          /> */}
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
          // onChange={(e) => handleFileUpload3(e, field.name)} // Appelle le gestionnaire avec le nom du champ
          onChange={handleChange} // Appelle le gestionnaire avec le nom du champ
        />
      </Button>
    // <ImageUploader />
  )
)}
</Box>



          <Button type="success" variant="contained">
            Prévisualiser votre cadre
          </Button>
          {generatedImageUrl && (
            <Box sx={{ mt: 2 }}>
              <CardMedia component="img" image={generatedImageUrl} alt="Image générée" />
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
          title={!previsuOwnVisu && !generatedImageUrl ? "Veuillez uploader ou générer une image d'abord" : ""}
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

