/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Divider,
//   Button,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import styled from "styled-components";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
// import ChoixPropreVisuel from "../componentsMemenza/ChoixPropreVisuel.jsx";
// import ImageUploader from "../componentsMemenza/ImageUploader.jsx";

// // Styled Components
// const FormGrid = styled(Grid)({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "space-between",
// });

// const StyleEtapeVisuel = `
// .etape-visuel-intro {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     margin-bottom: 50px;
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }  
//      .etape-visuel-intro-txt {
// //     // background-color: green;
//      width: 100%;
//      color: #333;
//      font-size: 16px;
//      display: flex;
//      flex-direction: column;
//      justify-content: center;
//      align-items: flex-start;
//      text-align: left;
//    }

//   .selected-card {
//     position: relative;
//     overflow: hidden;

//     &::after {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: rgba(255, 105, 180, 0.6);
//       border-radius: 8px;
//       opacity: 0;
//       transition: opacity 0.3s ease-in-out;
//       z-index: 1;
//     }

//     &.selected::after {
//       opacity: 1;
//       z-index: 0;
//     }

//     .check-icon {
//       position: absolute;
//       bottom: 10px;
//       right: 10px;
//       color: green;
//       font-size: 2rem;
//       z-index: 3;
//     }
//   }
// `;

// // Composant VisuelCard
// const VisuelCard = ({ item, isSelected, onClick }) => (
//   <Grid item xs={12} sm={6} md={4} lg={3}>
//     <Card
//       className={`selected-card ${isSelected ? "selected" : ""}`}
//       onClick={onClick}
//       sx={{
//         transform: 'scale(1.1)',
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//         padding: '20px',
//         '&:hover': {
//           transform: 'scale(1.15)',
//           boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         image={item.img_modele}
//         alt={item.nom_modele}
//       />
//       <CardContent>
//         <Typography>{item.nom_modele}</Typography>
//         {isSelected && (
//           <CheckCircleIcon className="check-icon" sx={{color: 'green'}}/>
//         )}
//       </CardContent>
//     </Card>
//   </Grid>
// );

// const TestVisuelFusion = () => {
// const EtapeVisuel = ({ activeStep, setActiveStep }) => {
//   const { 
//     visuelGeneratedImageUrl, 
//     setVisuelGeneratedImageUrl,
//     visuelChampText1,
//     setVisuelChampText1,
//     visuelDataVignetteClique,
//     setVisuelDataVignetteClique,
//     visuelTextesCadres, 
//     setVisuelTextesCadres, 
//     visuelIdVignetteSelectionner, 
//     setVisuelIdVignetteSelectionner, 
//     pathImageGenerate, 
//     setPathImageGenerate, 
//     setImageVisuelPath, 
//     previsuOwnVisu, 
//     isGenerate, 
//     setIsGenerate, 
//     selectedSousCatId, 
//     navigationId, 
//     outputFilePathContext, 
//     setOutputFilePathContext } = useSousCat();

//     const [previousBlobUrl, setPreviousBlobUrl] = useState(null);
//   const [testAvecFile, setTestAvecFile] = useState();
  
//   const [fichierPersoDetect, setFichierPersoDetect] = React.useState(false);
//   const [filePerso, setFilePerso] = React.useState(false);
  
//   const [mediaFiles, setMediaFiles] = React.useState([]);
//   // console.log("CONTENU DE MEDIA FILE : " + JSON.stringify(mediaFiles));
  
//   const [imageCustimzation, setImageCustimzation] = useState(null);
//   // console.log("INITIAL ImageCustom :  : " + imageCustimzation);

//   const handleNext = () => {
//     setActiveStep(prevStep => prevStep + 1); // Incrémenter l'étape
//   };
//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     window.scrollTo(0, 0);
//   };

//   const [selectedVisuelId, setSelectedVisuelId] = useState(null);
//   const [imagesVisuels, setImagesVisuels] = useState([]);
//   const [dataVignettesClique, setDataVignettesClique] = useState([]);
//   const [formData, setFormData] = useState({
//     text1: '',
//     text2: '',
//     // image1: '',
//     // image2: '',
//   });
  
//   const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  
//   const [error, setError] = useState(null);
//   const [isFocused, setIsFocused] = useState(false); 

//   const handleFocus = () => setIsFocused(true);
//   const handleBlur = () => setIsFocused(false);

//   const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);

//   // const textesCadres = dataVignettesClique.length
//   //  ? JSON.parse(dataVignettesClique[0].textes_cadres)
//   // : null;
//   const textesCadres = visuelDataVignetteClique.length
//     ? JSON.parse(visuelDataVignetteClique[0].textes_cadres)
//     : null;  
    
//     if (textesCadres && Array.isArray(textesCadres.fields)) {
//       textesCadres.fields.forEach((field, index) => {
//           // console.log(`Champ ${index + 1} - customizable : ${field.customizable}`);
//           // console.log(`Champ test`);
//       });
//   } 
//   // else {
//   //     console.log("Aucune donnée dans textesCadres ou le format est invalide.");
//   // }
    
//     // const visuelsCadres = useMemo(() => {
//     //   return dataVignettesClique.length
//     //     ? JSON.parse(dataVignettesClique[0].visuels_cadres)
//     //     : null;
//     // }, [dataVignettesClique]);
//     const visuelsCadres = useMemo(() => {
//       return visuelDataVignetteClique.length
//         ? JSON.parse(visuelDataVignetteClique[0].visuels_cadres)
//         : null;
//     }, [visuelDataVignetteClique]);
//     // console.log("ETAT DE VISUELCADRES : " + JSON.stringify(visuelsCadres));

//     if (visuelsCadres && Array.isArray(visuelsCadres.imageFields)) {
//       visuelsCadres.imageFields.forEach((field, index) => {
//           // console.log(`Champ ${index + 1} - customizable IMAGEFIELDS : ${field.customizable}`);
//       });
//   } 
    
    
//   useEffect(() => {
//     if (textesCadres) {
//       // Extraire les champs pour text1 et text2
//       const text1Field = textesCadres.fields.find(field => field.name === "text1");
//       const text2Field = textesCadres.fields.find(field => field.name === "text2");
//       // console.log("Verif text2Field : " + JSON.stringify(text2Field));
//       const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
//       const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
//       // console.log("Verif image2Field : " + JSON.stringify(image2Field));
      
      
//       // Définir les constantes pour text1
//       const text1_fontfamily = text1Field?.font.family || "";
//       const image1_defaultFile = image1Field?.defaultFile || "";
//       const image2_defaultFile = image2Field?.defaultFile || "";
    
//       const text1_size = text1Field?.font.size || 0;
//       const text1_x = text1Field?.x_percent || 0;
//       const text1_y = text1Field?.y_percent || 0;
//       const text1_colorR = text1Field?.color?.R || 0;      
//       const text1_colorV = text1Field?.color?.V || 0;
//       const text1_colorB = text1Field?.color?.B || 0;
  
//       // Définir les constantes pour text2
//       const text2_fontfamily = text2Field?.font.family || "";
//       const text2_size = text2Field?.font.size || 0;
//       const text2_x = text2Field?.x_percent || 0;
//       const text2_y = text2Field?.y_percent || 0;
//       const text2_colorR = text2Field?.color?.R || 0;
//       const text2_colorV = text2Field?.color?.V || 0;
//       const text2_colorB = text2Field?.color?.B || 0;
  
//       // Mettre à jour formData avec les nouvelles constantes
//       setFormData(prevFormData => {
//         const updatedFormData = {
//           ...prevFormData,
//           text1: prevFormData.text1 || text1Field?.defaultValue || "",
//           text2: prevFormData.text2 || text2Field?.defaultValue || "",
//           "text1-fontfamily": text1_fontfamily,
//           "image1": "https://memenza.fr/" + image1_defaultFile,
//           "image2": "https://memenza.fr/" + image2_defaultFile,
//           // "image2": "https://memenza.fr/" + image2_defaultFile,
//           // "image2": fichierPersoDetect ? 
//           //   "https://memenza.fr/visuels/uploads/" + navigationId + "/" + "mediaPerso.jpg" :
//           //   "https://memenza.fr/" + image2_defaultFile,
//           "text1-size": text1_size,
//           "text1-x": text1_x,
//           "text1-y": text1_y,
//           "text1-colorR": text1_colorR,
//           "text1-colorV": text1_colorV,
//           "text1-colorB": text1_colorB,
//           "text2-fontfamily": text2_fontfamily,
//           "text2-size": text2_size,
//           "text2-x": text2_x,
//           "text2-y": text2_y,
//           "text2-colorR": text2_colorR,
//           "text2-colorV": text2_colorV,
//           "text2-colorB": text2_colorB,
//         };
  
//         // Ne pas mettre à jour si les valeurs sont identiques
//         return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
//           ? prevFormData
//           : updatedFormData;
//       });
//     }
//   }, [textesCadres]);
   
//   useEffect(() => {
//     if (visuelsCadres?.imageFields?.length) {
//       setFormData((prevFormData) => {
//         const updatedFormData = {
//           ...prevFormData,
//           // image1: prevFormData.image1 || visuelsCadres.imageFields[0]?.defaultFile || null,
//           // image2: prevFormData.image2 || visuelsCadres.imageFields[1]?.defaultFile || null,
//           // image1: prevFormData.image1 || "/home/memenzj/www/" + visuelsCadres.imageFields[0]?.defaultFile || null,
//           // image2: prevFormData.image2 || "/home/memenzj/www/" + visuelsCadres.imageFields[1]?.defaultFile || null,
//         };
        
//         // Retourne l'ancien formData si rien n'a changé pour éviter les re-rendus inutiles
//         return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
//           ? prevFormData
//           : updatedFormData;
//       });
//     }
//   }, [visuelsCadres]);
    
// // Récupération des données de images_visuel
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/wp-json/plugin_memenza/v1/images_visuel");
//         if (!response.ok) throw new Error("Erreur lors de la récupération des données");
//         const result = await response.json();
//         setImagesVisuels(result);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);
//   if (!imagesVisuels.length) {
//     return <Typography>Chargement des visuels...</Typography>;
//   }

//   const handleVisuelClickCustom = (id) => {
//     setSelectedVisuelId(id);
//     setVisuelIdVignetteSelectionner(id);
    
//     console.log("contenu de formdata à l'instant T : " + JSON.stringify(formData));
    

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       text1: "", // Effacer la valeur saisie pour text1
//       text2: "", // Effacer la valeur saisie pour text2
//     }));
  
//     const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
//     setDataVignettesClique(filtreSelonVignetteSelectionne);
//     setVisuelDataVignetteClique(filtreSelonVignetteSelectionne)
  
//     // Récupération des valeurs par défaut pour les champs texte
//     if (filtreSelonVignetteSelectionne.length) {
//       const textesCadres = JSON.parse(filtreSelonVignetteSelectionne[0].textes_cadres);
//       const text1Field = textesCadres.fields.find(field => field.name === "text1");
//       const text2Field = textesCadres.fields.find(field => field.name === "text2");
//       const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
//       const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
  
//       setFormData({
//         text1: text1Field?.defaultValue || "", // Valeur par défaut ou chaîne vide
//         text2: text2Field?.defaultValue || "", // Valeur par défaut ou chaîne vide
//         // image1: image1Field?.defaultFile || "", // Réinitialisation des images si nécessaire
//         // image2: image2Field?.defaultFile || "", // Réinitialisation des images si nécessaire
//       });
//     } else {
//       // Si aucun cadre n'est trouvé, réinitialisez simplement les champs
//       setFormData({
//         text1: "",
//         text2: "",
//         image1: null,
//         image2: null,
//       });
//     }
    
//   };
//   const handleChange = (e) => {
//     // console.log("HANDLECHANGE contenu e : " + JSON.stringify(e.target));
    
//     const { name, value, files } = e.target;
  
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value === "" ? "" : value, // Si le champ est effacé, on garde une chaîne vide
//     }));
//     // console.log("Données envoyées à process : " + JSON.stringify(formData));
    
//   };

  
// const handleVisuelTemplatePerso2 = async (event) => {
//   console.log("FONCTION ACTIVE");
//   const file = event.target.files[0];
  
//   const fileBlob = new Blob([file], { type: file.type });
//   // console.log("Blob généré :", fileBlob);
  
//   // Met à jour l'état pour utilisation dans handleSubmit
//   setTestAvecFile(fileBlob);
//   setFichierPersoDetect(true);

// };
// const handleSubmit2 = async (e) => {
//   e.preventDefault();

//   const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
//   const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;
//   setOutputFilePathContext(outputFilePath);

//   const convertToBlob = async (imageFileOrURL) => {
//     if (typeof imageFileOrURL === "string") {
//       const response = await fetch(imageFileOrURL);
//       if (!response.ok) {
//         throw new Error(`Erreur lors du téléchargement de l'image : ${imageFileOrURL}`);
//       }
//       return await response.blob();
//     } else if (imageFileOrURL instanceof File || imageFileOrURL instanceof Blob) {
//       return imageFileOrURL;
//     } else {
//       throw new Error("Type d'image non valide. Attendu : URL, File ou Blob.");
//     }
//   };

//   let image1Blob = await convertToBlob(formData["image1"]);
//   let image2Blob;

//   // Utilisation du fichier personnalisé détecté, ou fallback vers le chemin image2 du formData
//   if (fichierPersoDetect && testAvecFile) {
//     console.log("Utilisation du fichier personnalisé détecté");
//     image2Blob = testAvecFile; 
//     // console.log("IMAGE2BLOB avec file direct : " + image2Blob);
//   } else {
//     image2Blob = await convertToBlob(formData["image2"]);
//   }

//   const qrCode = `"https://memenza.fr/wp-content/plugins/ProductImageCustomizer/js/qrcode.png"`;
//   const formPayload = new FormData();
//   formPayload.append("text1", formData.text1);
//   formPayload.append("text2", formData.text2);
//   formPayload.append("output_file", outputFilePath);
//   formPayload.append("dossier", outputFolder);
//   formPayload.append("image1", image1Blob, "image1.jpg");
//   formPayload.append("image2", image2Blob, `${navigationId}.jpg`);
//   // formPayload.append("qrcode", qrCode);
//   // formPayload.append("imagecmd", outputFilePath);

//   // Ajouter les nouveaux champs pour text1 et text2...
//   formPayload.append("text1-fontfamily", formData["text1-fontfamily"]);
//   formPayload.append("text1-size", formData["text1-size"]);
//   formPayload.append("text1-x", formData["text1-x"]);
//   formPayload.append("text1-y", formData["text1-y"]);
//   formPayload.append("text1-colorR", formData["text1-colorR"]);
//   formPayload.append("text1-colorV", formData["text1-colorV"]);
//   formPayload.append("text1-colorB", formData["text1-colorB"]);
  
//    // Ajouter les nouveaux champs pour text2
//    formPayload.append("text2-fontfamily", formData["text2-fontfamily"]);
//    formPayload.append("text2-size", formData["text2-size"]);
//    formPayload.append("text2-x", formData["text2-x"]);
//    formPayload.append("text2-y", formData["text2-y"]);
//    formPayload.append("text2-colorR", formData["text2-colorR"]);
//    formPayload.append("text2-colorV", formData["text2-colorV"]);
//    formPayload.append("text2-colorB", formData["text2-colorB"]);

//    // A NE PAS EFFECER - Code pour verification des datas passé en payload
//   // formPayload.forEach((value, key) => {
//   //   console.log("VERIFICATION DU FORMPAYLOAD POUR ENVOI DES BONNES DATA : " + key, value);
//   // });

//   try {
//     const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
//       method: "POST",
//       body: formPayload,
//     });

//     // A NE PAS EFFECER - Code pour verification des response retour
//     // console.log("Statut de la réponse :", response.status);
//     // console.log("En-têtes de la réponse :", [...response.headers]);
    
//     if (!response.ok) {
//       throw new Error("Erreur lors de la soumission du formulaire");
//     }
    
//     const result = await response.blob();    
//     const url = URL.createObjectURL(result);
//     // A NE PAS EFFECER - Verification retour
//     // console.log("Blob reçu :", result);
//     // console.log("URL générée :", url);

    


//     setGeneratedImageUrl(url);
//     setPathImageGenerate(url);
//     setIsGenerate(true);

//     setVisuelGeneratedImageUrl(url);


//   } catch (error) {
//     setError(error.message);
//   }
// };

//   return (
//     <Box sx={{ textAlign: "center", bgcolor: "#f5f5f5" }}>
//       <Box className="etape-visuel-intro">
//            <Box className="etape-visuel-intro-img">
//              <img
//               // src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
//               src="https://memenza.fr/visuels/personnaliser.png"
//               alt=""
//               style={{ 
//                 // width: "100%",
//                 // height: "100%",
//                 width: "100px", 
//                 height: "100px",
//                 borderRadius: "8px",
//                 objectFit: "cover", }}
//             />
//           </Box>
//           <Box className="etape-visuel-intro-txt" sx={{ p: 4 }}>
//           <Typography variant="h4" color="textPrimary"sx={(theme) => ({
//     mb: 1,
//     fontSize: {
//       xs: '1.5rem',
//       sm: '2rem',    
//       md: '2.5rem',  
//       lg: '3rem',   
//     },
//   })}>
//             Personnaliser le visuel 
//             </Typography>
//             <Typography variant="body1" color="textPrimary" sx={(theme) => ({
//     pr: 3,
//     fontSize: {
//       xs: '0.875rem', // petite taille d'écran
//       sm: '1rem',     // taille intermédiaire
//       md: '1.125rem', // écran moyen
//       lg: '1.5rem',  // grand écran
//     },
//   })}>
//             Vous pouvez utiliser les modèles Memenza ou directement télécharger votre visuel (créé par exemple avec Canva). La taille d’image attendue est de 1086x1086px.
//             </Typography> 
//           </Box>
//       </Box>
//       <ChoixPropreVisuel />
//       { previsuOwnVisu && (
//         <Box sx={{ mt: 2 }}>
//         <CardMedia
//           component="img"
//           image={previsuOwnVisu}
//           alt="Image générée"
//           sx={{
//             maxWidth: '70%',  // L'image occupe toute la largeur du conteneur, sans dépasser
//             height: 'auto',    // La hauteur de l'image s'ajuste proportionnellement
//             maxHeight: '200px',  // Hauteur maximale pour ne pas déborder
//             objectFit: 'contain', // Assure que l'image est bien ajustée sans déformation
//           }}
//         />
//       </Box>
//       )
//       }
//       <Divider sx={{ mt: 2 }}> OU </Divider>
//       <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
//         <Typography variant="h5" color="textSecondary">Choisissez votre modèle</Typography>
//       </Box>

//       <Grid container spacing={3} justifyContent="center">
//         {tableauFiltrePourVignette.map((item, index) => (
//           <VisuelCard
//             key={index}
//             item={item}
//             // isSelected={selectedVisuelId === item.id_modele_cadre}
//             isSelected={visuelIdVignetteSelectionner === item.id_modele_cadre}
//             onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
//           />
//         ))}
//       </Grid>
//       {/* {selectedVisuelId && ( */}
//       {visuelIdVignetteSelectionner && (
//         <Box
//           component="form"
//           onSubmit={handleSubmit2}
//           encType="multipart/form-data"
//           sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, maxWidth: 400, margin: "auto", mt:"100px" }}
//         >
          
//           <Typography variant="h6">Générer une image</Typography>
//           {error && <Typography color="error">{error}</Typography>}
// {/* {visuelTextesCadres.fields.map((field, index) =>  */}
// {textesCadres.fields.map((field, index) => 
//   field.customizable && (
//     <TextField
//       key={index}
//       label={isFocused ? "max. 17 caractères" : formData[`text${index + 1}`]}
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//       name={`text${index + 1}`}
//       onChange={handleChange}
//       inputProps={{ maxLength: field.length || 17 }} // Utilise la longueur si définie
//       required
//       sx={{ paddingTop: 1.2, marginBottom: 1.2 }}
//       InputLabelProps={{
//         sx: {
//           paddingTop: 1.2,
//           marginBottom: 1,
//           "&.MuiInputLabel-shrink": {
//             transform: "translate(0, -16px) scale(0.75)",
//           },
//         },
//       }}
//     />
//   )
// )}
// <Box>
// {visuelsCadres.imageFields.map((field, index) => 
//   field.customizable && (
//     <Button component="label" variant="contained" sx={{ mr: "10px" }} key={index}>
//         Envoyer mon image
//         <input
//         name={field.name}
//           type="file"
//           hidden
//           accept="image/*" // Limite les fichiers à des images
//           onChange={(e) => handleVisuelTemplatePerso2(e)}
//         />
//       </Button>
//     // <ImageUploader />
//   )
// )}
// </Box>



//           <Button type="success" variant="contained">
//             Prévisualiser votre cadre
//           </Button>
//           {/* {generatedImageUrl && ( */}
//           {visuelGeneratedImageUrl && (
//             <Box sx={{ mt: 2 }}>
//               {/* <CardMedia component="img" image={generatedImageUrl} alt="Image générée" /> */}
//               <CardMedia component="img" image={visuelGeneratedImageUrl} alt="Image générée" />
//             </Box>
//           )}
//         </Box>
//       )}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        
//                         <Button
//                           disabled={activeStep === 0}
//                           // disabled={activeStep === 0 || !isGenerate}
//                           onClick={handleBack}
//                           sx={{ mr: 1 }}
//                         >
//                           Retour
//                         </Button>
                    
//         <Tooltip
//           // title={!generatedImageUrl ? "Veuillez générer l'image d'abord" : "Veuillez générer l'image d'abord"}
//           title={!previsuOwnVisu && !generatedImageUrl ? "Veuillez télécharger  ou générer une image d'abord" : ""}
//           arrow
//           sx={{ zIndex: "9999 !important" }} 
//         >
//         <span>
//         {/* Le bouton est encapsulé dans un span pour que Tooltip fonctionne aussi quand le bouton est désactivé */}
//           <Button
//             type="button"
//             variant="contained"
//             // disabled={!generatedImageUrl} // Le bouton est désactivé si `generatedImageUrl` est null
//             disabled={!previsuOwnVisu && !generatedImageUrl}
//             onClick={handleNext}
//             sx={{ mt: 4, mr: "1rem" }}
//           >
//             Suivant
//           </Button>
//         </span>
//         </Tooltip>
//       </Box>

//     <style>{StyleEtapeVisuel}</style>
//     </Box>
//   );
// };

// export default EtapeVisuel;

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/**
 * Fichier : EtapeVisuel.jsx
 * Description : Composant React pour la personnalisation d'images avec étapes guidées.
 * Navigation rapide (utilisez CTRL+F + les mots-clés) :
 * - [01] IMPORTS : "CTRL+F IMPORTS"
 * - [02] STYLES : "CTRL+F STYLES"
 * - [03] COMPOSANT PRINCIPAL : "CTRL+F COMPOSANT PRINCIPAL"
 * - [04] ÉTATS (useState) : "CTRL+F ÉTATS"
 * - [05] useEffect : "CTRL+F useEffect"
 * - [06] FONCTIONS (Gestion des fichiers, formulaire, navigation) : "CTRL+F FONCTIONS"
 * - [07] APPELS API (Génération preview & Soumission) : "CTRL+F APPELS API"
 * - [08] RENDU FINAL : "CTRL+F RENDU FINAL"
 */

// [01] IMPORTS : "CTRL+F IMPORTS"
import React, { useState, useEffect, useMemo, useRef } from "react";
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
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
import ChoixPropreVisuel from "../componentsMemenza/ChoixPropreVisuel.jsx";
import LoadingUpload from "../componentsMemenza/LoadingUpload.jsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// [02] STYLES : "CTRL+F STYLES"
const StyleEtapeVisuel = `
.etape-visuel-intro {
    display: flex;
    align-items: center;
    // gap: 20px;
    margin-bottom: 50px;
    background-color: #fff;
    // padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }  
  //    .etape-visuel-intro-txt {
  //    width: 100%;
  //    color: #333;
  //    font-size: 16px;
  //    display: flex;
  //    flex-direction: column;
  //    justify-content: center;
  //    align-items: flex-start;
  //    text-align: left;
  //    padding : 0px !important;
  //  }

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

    @media (max-width: 600px) {
      .etape-visuel-intro-txt {
        background-color: orange;
        display: flex;
        flex-direction: column !important;
        align-items: center !important;
      }
      .visuel-intro-img {
        height: 100% !important;
width: 60px !important;
        }
    }

  }
`;

// Composant VisuelCard
const VisuelCard = ({ item, isSelected, onClick }) => (
  // <Grid item xs={12} sm={6} md={4} lg={3}>
  <Grid item xs={10} sm={6} md={4} lg={3} sx={{mt:2, pt: 5, gap: '20px'}}>
    <Card
      className={`selected-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      sx={{
        transform: 'scale(1.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        padding: '15px !important',
        margin: '30px !important',
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

const buttonStyles = {
  width: '300px', // Largeur fixe
  height: '50px', // Hauteur fixe
  fontSize: '16px', // Taille du texte uniforme
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// [03] COMPOSANT PRINCIPAL : "CTRL+F COMPOSANT PRINCIPAL"
const EtapeVisuel = ({ activeStep, setActiveStep }) => {
  // [04] ÉTATS (useState) : "CTRL+F ÉTATS"
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

  const [testAvecFile, setTestAvecFile] = useState();
  const [fichierPersoDetect, setFichierPersoDetect] = React.useState(false);
  const [selectedVisuelId, setSelectedVisuelId] = useState(null);
  const [imagesVisuels, setImagesVisuels] = useState([]);
  const [dataVignettesClique, setDataVignettesClique] = useState([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false); 
  const [loadingImage, setLoadingImage] = useState(false); 
  const parametresContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    text1: '',
    text2: '',
    // image1: '',
    // image1: '',
    // image2: '',
  });
  // console.log("FORMDATA : " + JSON.stringify(formData));
  
  const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);
  const textesCadres = visuelDataVignetteClique.length
    ? JSON.parse(visuelDataVignetteClique[0].textes_cadres)
    : null;  
    
  const visuelsCadres = useMemo(() => {
      return visuelDataVignetteClique.length
        ? JSON.parse(visuelDataVignetteClique[0].visuels_cadres)
        : null;
  }, [visuelDataVignetteClique]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1); // Incrémenter l'étape
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };  
  // useEffect(() => {
  //   if (textesCadres) {
  //     // Extraire les champs pour text1 et text2
  //     const text1Field = textesCadres.fields.find(field => field.name === "text1");
  //     const text2Field = textesCadres.fields.find(field => field.name === "text2");
  //     // console.log("Verif text2Field : " + JSON.stringify(text2Field));
  //     const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
  //     const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
  //     // console.log("Verif image2Field : " + JSON.stringify(image2Field));    

  //     // Définir les constantes pour text1
  //     const text1_fontfamily = text1Field?.font.family || "";
  //     const image1_defaultFile = image1Field?.defaultFile || "";
  //     const image2_defaultFile = image2Field?.defaultFile || "";
  //     const text1_size = text1Field?.font.size || 0;
  //     const text1_x = text1Field?.x_percent || 0;
  //     const text1_y = text1Field?.y_percent || 0;
  //     const text1_colorR = text1Field?.color?.R || 0;      
  //     const text1_colorV = text1Field?.color?.V || 0;
  //     const text1_colorB = text1Field?.color?.B || 0;
  
  //     // Définir les constantes pour text2
  //     const text2_fontfamily = text2Field?.font.family || "";
  //     const text2_size = text2Field?.font.size || 0;
  //     const text2_x = text2Field?.x_percent || 0;
  //     const text2_y = text2Field?.y_percent || 0;
  //     const text2_colorR = text2Field?.color?.R || 0;
  //     const text2_colorV = text2Field?.color?.V || 0;
  //     const text2_colorB = text2Field?.color?.B || 0;
  
  //     // Mettre à jour formData avec les nouvelles constantes
  //     setFormData(prevFormData => {
  //       const updatedFormData = {
  //         ...prevFormData,
  //         text1: prevFormData.text1 || text1Field?.defaultValue || "",
  //         text2: prevFormData.text2 || text2Field?.defaultValue || "",
  //         "text1-fontfamily": text1_fontfamily,
  //         "image1": "https://memenza.fr/" + image1_defaultFile,
  //         "image2": "https://memenza.fr/" + image2_defaultFile,
  //         // "image2": "https://memenza.fr/" + image2_defaultFile,
  //         // "image2": fichierPersoDetect ? 
  //         //   "https://memenza.fr/visuels/uploads/" + navigationId + "/" + "mediaPerso.jpg" :
  //         //   "https://memenza.fr/" + image2_defaultFile,
  //         "text1-size": text1_size,
  //         "text1-x": text1_x,
  //         "text1-y": text1_y,
  //         "text1-colorR": text1_colorR,
  //         "text1-colorV": text1_colorV,
  //         "text1-colorB": text1_colorB,
  //         "text2-fontfamily": text2_fontfamily,
  //         "text2-size": text2_size,
  //         "text2-x": text2_x,
  //         "text2-y": text2_y,
  //         "text2-colorR": text2_colorR,
  //         "text2-colorV": text2_colorV,
  //         "text2-colorB": text2_colorB,
  //       };
  
  //       // Ne pas mettre à jour si les valeurs sont identiques
  //       return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
  //         ? prevFormData
  //         : updatedFormData;
  //     });
  //   }
  // }, [textesCadres]);
   
  // useEffect(() => {
  //   if (visuelsCadres?.imageFields?.length) {
  //     setFormData((prevFormData) => {
  //       const updatedFormData = {
  //         ...prevFormData,
  //         // image1: prevFormData.image1 || visuelsCadres.imageFields[0]?.defaultFile || null,
  //         // image2: prevFormData.image2 || visuelsCadres.imageFields[1]?.defaultFile || null,
  //         // image1: prevFormData.image1 || "/home/memenzj/www/" + visuelsCadres.imageFields[0]?.defaultFile || null,
  //         // image2: prevFormData.image2 || "/home/memenzj/www/" + visuelsCadres.imageFields[1]?.defaultFile || null,
  //       };
        
  //       // Retourne l'ancien formData si rien n'a changé pour éviter les re-rendus inutiles
  //       return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
  //         ? prevFormData
  //         : updatedFormData;
  //     });
  //   }
  // }, [visuelsCadres]);

  

////////////////////////////
////////////////////////////
////////////////////////////
// [05] useEffect : "CTRL+F useEffect"
  // Fusion des deux useEffect ci dessus
  // useEffect(() => {
  //   if (textesCadres && visuelsCadres) {
  //     // Extraire les champs pour text1 et text2
  //     const text1Field = textesCadres.fields.find(field => field.name === "text1");
  //     const text2Field = textesCadres.fields.find(field => field.name === "text2");
      
  //     const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
  //     // console.log("Verif de imageField 1 : " + JSON.stringify(image1Field));
      
  //     const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");
  //     // console.log("Verif de imageField 2 : " + JSON.stringify(image2Field));
      
  //     // Définir les constantes pour text1
  //     const text1_fontfamily = text1Field?.font.family || "";
  //     // const image1_defaultFile = image1Field?.defaultFile || "";
  //     const image1_defaultFile = image1Field?.defaultFile;
  //     const image2_defaultFile = image2Field?.defaultFile || "";
  //     const text1_size = text1Field?.font.size || 0;
  //     const text1_x = text1Field?.x_percent || 0;
  //     const text1_y = text1Field?.y_percent || 0;
  //     const text1_colorR = text1Field?.color?.R || 0;      
  //     const text1_colorV = text1Field?.color?.V || 0;
  //     const text1_colorB = text1Field?.color?.B || 0;
  
  //     // Définir les constantes pour text2
  //     const text2_fontfamily = text2Field?.font.family || "";
  //     const text2_size = text2Field?.font.size || 0;
  //     const text2_x = text2Field?.x_percent || 0;
  //     const text2_y = text2Field?.y_percent || 0;
  //     const text2_colorR = text2Field?.color?.R || 0;
  //     const text2_colorV = text2Field?.color?.V || 0;
  //     const text2_colorB = text2Field?.color?.B || 0;
  
  //     // Mettre à jour formData avec les nouvelles constantes
  //     setFormData(prevFormData => {
  //       const updatedFormData = {
  //         ...prevFormData,
  //         text1: prevFormData.text1 || text1Field?.defaultValue || "",
  //         text2: prevFormData.text2 || text2Field?.defaultValue || "",
  //         "text1-fontfamily": text1_fontfamily,
  //         "image1": "https://memenza.fr/" + image1_defaultFile,
  //         "image2": "https://memenza.fr/" + image2_defaultFile,
  //         "text1-size": text1_size,
  //         "text1-x": text1_x,
  //         "text1-y": text1_y,
  //         "text1-colorR": text1_colorR,
  //         "text1-colorV": text1_colorV,
  //         "text1-colorB": text1_colorB,
  //         "text2-fontfamily": text2_fontfamily,
  //         "text2-size": text2_size,
  //         "text2-x": text2_x,
  //         "text2-y": text2_y,
  //         "text2-colorR": text2_colorR,
  //         "text2-colorV": text2_colorV,
  //         "text2-colorB": text2_colorB,
  //       };
  
  //       // Ne pas mettre à jour si les valeurs sont identiques
  //       return JSON.stringify(prevFormData) === JSON.stringify(updatedFormData)
  //         ? prevFormData
  //         : updatedFormData;
  //     });
  //   }
  // }, [textesCadres, visuelsCadres, setFormData]); 

useEffect(() => {
  if (textesCadres && visuelsCadres) {
    // Récupérer les champs dynamiques pour text1, text2, image1 et image2
    const text1Field = textesCadres.fields.find(field => field.name === "text1");
    const text2Field = textesCadres.fields.find(field => field.name === "text2");
    const image1Field = visuelsCadres.imageFields.find(field => field.name === "image1");
    const image2Field = visuelsCadres.imageFields.find(field => field.name === "image2");

    // console.log("usEffect avec les nouvelles datas !");
    
    // Mettre à jour le formData en fonction des nouvelles données
    setFormData((currentFormData) => {
      const updatedFormData = {
        ...currentFormData, // Utiliser l'état actuel comme base
        text1: currentFormData.text1 || text1Field?.defaultValue || "", // Prioriser la valeur actuelle
        text2: currentFormData.text2 || text2Field?.defaultValue || "", // Prioriser la valeur actuelle
        "text1-fontfamily": text1Field?.font.family || "",
        "text1-size": text1Field?.font.size || 0,
        "text1-x": text1Field?.x_percent || 0,
        "text1-y": text1Field?.y_percent || 0,
        "text1-colorR": text1Field?.color?.R || 0,
        "text1-colorV": text1Field?.color?.V || 0,
        "text1-colorB": text1Field?.color?.B || 0,
        "text2-fontfamily": text2Field?.font.family || "",
        "text2-size": text2Field?.font.size || 0,
        "text2-x": text2Field?.x_percent || 0,
        "text2-y": text2Field?.y_percent || 0,
        "text2-colorR": text2Field?.color?.R || 0,
        "text2-colorV": text2Field?.color?.V || 0,
        "text2-colorB": text2Field?.color?.B || 0,
        image1: image1Field?.defaultFile ? `https://memenza.fr/${image1Field.defaultFile}` : "",
        image2: image2Field?.defaultFile ? `https://memenza.fr/${image2Field.defaultFile}` : "",
      };

      // Comparer les données actuelles et mises à jour pour éviter des mises à jour inutiles
      return JSON.stringify(currentFormData) === JSON.stringify(updatedFormData)
        ? currentFormData
        : updatedFormData;
    });
    // console.log("Relance le usEffect avec les nouvelles datas !" + JSON.stringify(formData));
  }
}, [textesCadres, visuelsCadres, setFormData]);

////////////////////////////
////////////////////////////
////////////////////////////

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

  // [06] FONCTIONS (Gestion des fichiers, formulaire, navigation) : "CTRL+F FONCTIONS"
const affichageChampsParametrages = (id) => {
    setSelectedVisuelId(id);
    setVisuelIdVignetteSelectionner(id);
    // console.log("contenu de formdata à l'instant T : " + JSON.stringify(formData));
    
    // Réinitialisation des champs texte
    setFormData((prevFormData) => ({
      ...prevFormData,
      text1: "",
      text2: "",
    }));
  
    // Filtrer les vignettes
    const selectedVignette = tableauFiltrePourVignette.find(item => item.id_modele_cadre === id);
    setDataVignettesClique(selectedVignette ? [selectedVignette] : []);
    setVisuelDataVignetteClique(selectedVignette ? [selectedVignette] : []);
  
    // Mettre à jour les valeurs par défaut des champs texte
    if (selectedVignette) {
      const { textes_cadres } = selectedVignette;
      const parsedTextes = JSON.parse(textes_cadres);
      const defaultValues = parsedTextes.fields.reduce((acc, field) => {
        if (field.name === 'text1' || field.name === 'text2') {
          acc[field.name] = field.defaultValue || "";
        }
        return acc;
      }, {});
  
      setFormData(prevFormData => ({
        ...prevFormData,
        ...defaultValues,
      }));
    } else {
      setFormData({
        text1: "",
        text2: "",
        image1: null,
        image2: null,
      });
    }
  };
const alimenterLeTabDataAvecLeContenuDesChamps = (e) => {
  const { name, value, files } = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: files ? files[0] : value || "",  // Utilisation de '||' pour simplifier la gestion des champs vides
  }));
};
const envoiVisuelPerso = (event) => {
  const file = event.target.files[0];
  if (file) {
    setTestAvecFile(file);
    setFichierPersoDetect(true);
  }
  setLoadingImage(true);
  creationDuVisuelAvecTemplate3();
};

// [07] APPELS API (Génération preview & Soumission) : "CTRL+F APPELS API"
// let image1Blob;
// console.log("Contenu de image1Blob : " + image1Blob);

const creationDuVisuelAvecTemplate = async (e) => {
  e.preventDefault();

  // const uniqueId = Date.now();
  // const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}_${uniqueId}.png`;

  const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
  const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;
  const imagePath = "visuels/cmd/" + navigationId + '.png';
  setOutputFilePathContext(outputFilePath);


  ///////////////////////////////
  ///////////////////////////////
  // Vérification de l'existence du fichier sur le serveur
const checkFileExists = async (filePath) => {
  try {
    const response = await fetch(`../../wp-content/plugins/ProductImageCustomizer/js/delete-media.php?filePath=${filePath}`);
    const data = await response.text();
    if (data === "Coucou") {
      console.log(data); // Affiche "Coucou" si le fichier existe
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erreur lors de la vérification du fichier :", error);
    return false;
  }
};

// Vérifier si le fichier existe avant de procéder
const fileExists = await checkFileExists(outputFilePath);

// Si le fichier existe, afficher "Coucou" et arrêter le processus
if (fileExists) {
  console.log("Le fichier existe déjà. Aucune nouvelle génération nécessaire.");
  return;
}

  ///////////////////////////////
  ///////////////////////////////

  const convertToBlob = async (imageFileOrURL) => {
    if (typeof imageFileOrURL === "string") {
      const response = await fetch(imageFileOrURL);
      if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image : ${imageFileOrURL}`);
      }
      console.log("Avant convertion, image1 est une URL");
      
      return await response.blob();
    } else if (imageFileOrURL instanceof File || imageFileOrURL instanceof Blob) {
      console.log("ICI Verification si image1 est un BLOB OU un fichier");
      return imageFileOrURL;
    } else {
      throw new Error("Type d'image non valide. Attendu : URL, File ou Blob.");
    }
  };

  let image1Blob = await convertToBlob(formData["image1"]);
  // if (!image1Blob) {
  //   image1Blob = await convertToBlob(formData["image1"]);    
  // }
  let image2Blob;

  // console.log("FORMDATA image 1 : " + JSON.stringify(formData["image1"]));
  // console.log("FORMDATA image 2 : " + JSON.stringify(formData["image2"]));
  

  // Utilisation du fichier personnalisé détecté, ou fallback vers le chemin image2 du formData
  if (fichierPersoDetect && testAvecFile) {
    console.log("Utilisation du fichier personnalisé détecté");
    image2Blob = testAvecFile; 
    // console.log("IMAGE2BLOB avec file direct : " + image2Blob);
  } else {
    image2Blob = await convertToBlob(formData["image2"]);
  }

  const qrCode = `"https://memenza.fr/wp-content/plugins/ProductImageCustomizer/js/qrcode.png"`;
  const formPayload = new FormData();
  formPayload.append("text1", formData.text1);
  formPayload.append("text2", formData.text2);
  formPayload.append("output_file", outputFilePath); // Destination de la crea cadre
  formPayload.append("dossier", outputFolder); // Créa du dossier pour les medias video
  // formPayload.append("imagecmd", imagePath);
  
  
  console.log("AVANT ENVOI Blob taille de iamge1Blob : ", image1Blob.size);

  formPayload.append("image1", image1Blob, formData["image1"]);
  formPayload.append("image2", image2Blob, `${navigationId}.png`);

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

  //////////////////////////////////////////
  //////////////////////////////////////////
  try {
    // const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
    // const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-gencadre.php", {
    const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-test.php", {
      method: "POST",
      body: formPayload,
    });

    // Vérification des informations de la réponse
    console.log("Réponse Brute :", response);
    console.log("Statut de la réponse :", response.status);
    console.log("En-têtes de la réponse :", [...response.headers]);
   
    if (!response.ok) {
      throw new Error("Erreur lors de la soumission du formulaire");
    }
    
//     if (response.headers.get("content-type") === "image/png") {
//       console.log("la reponse est bien de type image/png !");
//       const result = await response.blob();    
//       const url = URL.createObjectURL(result);
//       // A NE PAS EFFECER - Verification retour
//       console.log("APRES ENVOI Blob reçu :", result);
//       console.log("URL générée :", url);
//       setGeneratedImageUrl(url);
//       setPathImageGenerate(url);
//       setIsGenerate(true);
//       setVisuelGeneratedImageUrl(url);
//   } else {
//     // Gérer une réponse inattendue
//     console.error("Réponse inattendue :", await response.text());
//     // throw new Error(`Réponse inattendue : ${response.status}`);
// }
    
    const result = await response.blob();    
    const url = URL.createObjectURL(result);
    // A NE PAS EFFECER - Verification retour
    console.log("APRES ENVOI Blob reçu :", result);
    console.log("URL générée :", url);
    setGeneratedImageUrl(url);
    setPathImageGenerate(url);
    setIsGenerate(true);
    setVisuelGeneratedImageUrl(url);

  } catch (error) {
    setError(error.message);
  }
  //////////////////////////////////////////
  //////////////////////////////////////////



};

const creationDuVisuelAvecTemplate2 = async (e) => {
  e.preventDefault();

  const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
  const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;
  const imagePath = "visuels/cmd/" + navigationId + '.png';
  setOutputFilePathContext(outputFilePath);

  ///////////////////////////////
  // Vérification et suppression du fichier existant
  const deleteExistingFile = async (filePath) => {
    try {
      const response = await fetch(`../../wp-content/plugins/ProductImageCustomizer/js/delete-media.php?filePath=${filePath}`);
      const data = await response.text();
      console.log(data); // Log du message de retour du serveur
      return data.includes("Fichier supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du fichier :", error);
      return false;
    }
  };

  const fileDeleted = await deleteExistingFile(outputFilePath);

  if (fileDeleted) {
    console.log("Fichier existant supprimé. Procédure de génération en cours.");
  } else {
    console.log("Aucun fichier à supprimer ou problème rencontré.");
  }

  ///////////////////////////////

  const convertToBlob = async (imageFileOrURL) => {
    if (typeof imageFileOrURL === "string") {
      const response = await fetch(imageFileOrURL);
      if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image : ${imageFileOrURL}`);
      }
      console.log("Avant conversion, image1 est une URL");
      return await response.blob();
    } else if (imageFileOrURL instanceof File || imageFileOrURL instanceof Blob) {
      console.log("ICI Vérification si image1 est un BLOB ou un fichier");
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
    image2Blob = testAvecFile;
  } else {
    image2Blob = await convertToBlob(formData["image2"]);
  }

  const formPayload = new FormData();
  formPayload.append("text1", formData.text1);
  formPayload.append("text2", formData.text2);
  formPayload.append("output_file", outputFilePath); // Destination de la création du visuel
  formPayload.append("dossier", outputFolder); // Création du dossier pour les médias
  formPayload.append("image1", image1Blob, formData["image1"]);
  formPayload.append("image2", image2Blob, `${navigationId}.png`);

  // Ajouter les champs pour text1 et text2
  formPayload.append("text1-fontfamily", formData["text1-fontfamily"]);
  formPayload.append("text1-size", formData["text1-size"]);
  formPayload.append("text1-x", formData["text1-x"]);
  formPayload.append("text1-y", formData["text1-y"]);
  formPayload.append("text1-colorR", formData["text1-colorR"]);
  formPayload.append("text1-colorV", formData["text1-colorV"]);
  formPayload.append("text1-colorB", formData["text1-colorB"]);
  formPayload.append("text2-fontfamily", formData["text2-fontfamily"]);
  formPayload.append("text2-size", formData["text2-size"]);
  formPayload.append("text2-x", formData["text2-x"]);
  formPayload.append("text2-y", formData["text2-y"]);
  formPayload.append("text2-colorR", formData["text2-colorR"]);
  formPayload.append("text2-colorV", formData["text2-colorV"]);
  formPayload.append("text2-colorB", formData["text2-colorB"]);

  try {
    const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
      method: "POST",
      body: formPayload,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la soumission du formulaire");
    }

    const result = await response.blob();
    const url = URL.createObjectURL(result);
    console.log("APRES ENVOI Blob reçu :", result);
    console.log("URL générée :", url);
    setGeneratedImageUrl(url);
    setPathImageGenerate(url);
    setIsGenerate(true);
    setVisuelGeneratedImageUrl(url);
  } catch (error) {
    setError(error.message);
  }
};

const creationDuVisuelAvecTemplate3 = async (e) => {
  // e.preventDefault();
  if (e?.preventDefault) {
    e.preventDefault();
  }

//   const uniqueId = Date.now();
// const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}_${uniqueId}.png`;
  const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
  const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;
  const imagePath = "visuels/cmd/" + navigationId + '.png';
  setOutputFilePathContext(outputFilePath);

  ///////////////////////////////
  // Vérification et suppression complète des fichiers existants
  // const deleteExistingFileAndTraces = async (filePath) => {
  //   try {
  //     const response = await fetch(`../../wp-content/plugins/ProductImageCustomizer/js/delete-media.php?filePath=${filePath}`);
  //     const data = await response.text();
  //     console.log("Résultat de la suppression :", data); // Log des messages du serveur
  //     return data.includes("Fichier supprimé avec succès.");
  //   } catch (error) {
  //     console.error("Erreur lors de la suppression du fichier et de ses traces :", error);
  //     return false;
  //   }
  // };

  // const fileDeleted = await deleteExistingFileAndTraces(outputFilePath);

  // if (fileDeleted) {
  //   console.log("Fichier et ses traces supprimés. Procédure de génération en cours.");
  // } else {
  //   console.log("Aucun fichier à supprimer ou problème rencontré lors de la suppression.");
  // }
  ///////////////////////////////

  const convertToBlob = async (imageFileOrURL) => {
    if (typeof imageFileOrURL === "string") {
      const response = await fetch(imageFileOrURL);
      if (!response.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image : ${imageFileOrURL}`);
      }
      console.log("Avant conversion, image1 est une URL");
      return await response.blob();
    } else if (imageFileOrURL instanceof File || imageFileOrURL instanceof Blob) {
      console.log("ICI Vérification si image1 est un BLOB ou un fichier");
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
    image2Blob = testAvecFile;
  } else {
    image2Blob = await convertToBlob(formData["image2"]);
  }

  const formPayload = new FormData();
  formPayload.append("text1", formData.text1);
  formPayload.append("text2", formData.text2);
  formPayload.append("output_file", outputFilePath); // Destination de la création du visuel
  formPayload.append("dossier", outputFolder); // Création du dossier pour les médias
  formPayload.append("image1", image1Blob, formData["image1"]);
  formPayload.append("image2", image2Blob, `${navigationId}.png`);

  // Ajouter les champs pour text1 et text2
  formPayload.append("text1-fontfamily", formData["text1-fontfamily"]);
  formPayload.append("text1-size", formData["text1-size"]);
  formPayload.append("text1-x", formData["text1-x"]);
  formPayload.append("text1-y", formData["text1-y"]);
  formPayload.append("text1-colorR", formData["text1-colorR"]);
  formPayload.append("text1-colorV", formData["text1-colorV"]);
  formPayload.append("text1-colorB", formData["text1-colorB"]);
  formPayload.append("text2-fontfamily", formData["text2-fontfamily"]);
  formPayload.append("text2-size", formData["text2-size"]);
  formPayload.append("text2-x", formData["text2-x"]);
  formPayload.append("text2-y", formData["text2-y"]);
  formPayload.append("text2-colorR", formData["text2-colorR"]);
  formPayload.append("text2-colorV", formData["text2-colorV"]);
  formPayload.append("text2-colorB", formData["text2-colorB"]);

  try {
    // const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
    const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-test.php", {
      method: "POST",
      body: formPayload,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la soumission du formulaire");
    }

    const result = await response.blob();
    const url = URL.createObjectURL(result);
    console.log("APRES ENVOI Blob reçu :", result);
    console.log("URL générée :", url);
    setGeneratedImageUrl(url);
    setPathImageGenerate(url);
    setIsGenerate(true);
    setVisuelGeneratedImageUrl(url);
  } catch (error) {
    setError(error.message);
  }
};



if (!imagesVisuels.length) {
  return (
    <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5}}>
      <Typography variant="h6">Chargement des visuels...</Typography>
    </Box>
  )
}

// Fonction pour scroller vers les parametres
// const scrollToPrametres = () => {
//   if (parametresContainerRef.current) {
//     parametresContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// };
const scrollToPrametres = () => { 
  if (parametresContainerRef.current) {
    // Scroller jusqu'au conteneur après un court délai
    setTimeout(() => {
      parametresContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // Délai de 300 ms (ajustez selon vos besoins)
  }

  // Scroller tout en haut de la page après un délai supplémentaire
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 600); // Délai total avant de scroller en haut (ajustez selon vos besoins)
};

// [08] RENDU FINAL : "CTRL+F RENDU FINAL"
return (
  <Box sx={{ textAlign: "center",  }}>
    <Box className="etape-visuel-intro" sx={{width: {xs: "100%"}, height:{xs: "25vh", sm: "50%",}, flexDirection: { xs: "column", sm: "row" }, mt:{xs: "50px"}, mb:{xs: "50px"}, p: {xs: "0px"}}}>
      <Box className="etape-visuel-intro-img" sx={{width: {xs: "100%"}, height: {xs: "60% !important"}, position: {xs: "relative"},}}>
        <CardMedia
        component="img"
        image="https://memenza.fr/visuels/personnaliser.png"
        alt="Visuel personnalisé"
        sx={{
          width: {xs: "100%", sm: "200px"},
          height: {xs: "100% !important", sm: "200px !important"},
          objectFit: "cover !important",
        }}
      />
      </Box>
      {/* <Box className="etape-visuel-intro-txt" sx={{ p: 3, display: "flex", flexDirection: {xs : "column", sm: "column",}, alignItems: {xs: "center",sm: "center", } }}> */}
      <Box className="etape-visuel-intro-txt" 
        sx={{ 
          pt: 3, 
          p: {sm: 3},
          backgroundColor: {xs: "white", sm: "transparent"}, 
          width: {xs: "100%"},
          height: {xs: "50%"},
          display: "flex", 
          flexDirection: {xs: "column", sm: "column"}, 
          justifyContent: {xs: "center"},
          alignItems:{xs: "center", sm: "flex-start", }, 
          zIndex: {xs: 2},
        }}
      >
        <Box sx={{display: "flex"}}>
          <Typography
            variant="h4"
            color="textPrimary"
            sx={{
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
            }}
          >
            Personnaliser le cadre
          </Typography>
        </Box>
        {/* Tooltip pour mobile */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const tooltip = e.currentTarget.querySelector(".tooltip");
            if (tooltip) tooltip.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.querySelector(".tooltip");
            if (tooltip) tooltip.style.opacity = "0";
          }}
        >
          <Box
            sx={{
              // bgcolor: "text.disabled",
              // color: "background.paper",
              // bgcolor: "text.disabled",
              color: "black",
              // p: 2,
              borderRadius: "8px",
            }}
          >
            ?
          </Box>
          <Box
            className="tooltip"
            sx={{
              position: "absolute",
              bottom: "110%",
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "black",
              color: "white",
              p: 1,
              borderRadius: "4px",
              whiteSpace: "nowrap",
              opacity: "0",
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            Vous pouvez utiliser les modèles Memenza <br/>ou directement télécharger votre visuel <br/>(créé par exemple avec Canva). <br/>La taille d’image attendue est de 1086x1086px.

          </Box>
        </Box>
        <Typography
          variant="body1"
          color="textPrimary"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.5rem' },
            display: { xs: "none", sm: "flex" },
            justifyContent: {sm: "flex-start"},
            textAlign: "left"
          }}
        >
          Vous pouvez utiliser les modèles Memenza ou directement télécharger votre visuel (créé par exemple avec Canva). La taille d’image attendue est de 1086x1086px.
        </Typography>
      </Box>
    </Box>

    <ChoixPropreVisuel />

    {previsuOwnVisu && (
      <Box sx={{ mt: 2 }}>
        <CardMedia
          component="img"
          image={previsuOwnVisu}
          alt="Image générée"
          sx={{
            maxWidth: '70%',
            height: 'auto',
            maxHeight: '200px',
            objectFit: 'contain',
          }}
        />
      </Box>
    )}

    <Divider sx={{ mt: 2 }}> OU </Divider>

    <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
      <Typography variant="h5" color="textSecondary">
        Choisissez votre modèle
      </Typography>
    </Box>

    <Grid container spacing={3} justifyContent="center" sx={{mb: 4}}>
      {tableauFiltrePourVignette.map((item, index) => (
        <VisuelCard
          key={item.id_modele_cadre}
          item={item}
          isSelected={visuelIdVignetteSelectionner === item.id_modele_cadre}
          onClick={() => {
            affichageChampsParametrages(item.id_modele_cadre);
            scrollToPrametres();
          } 
        }
        />
      ))}
    </Grid>
    <Box  ref={parametresContainerRef}>
      {visuelIdVignetteSelectionner && (
        <Box
          component="form"
          // onSubmit={creationDuVisuelAvecTemplate}
          // onSubmit={creationDuVisuelAvecTemplate2}
          onSubmit={creationDuVisuelAvecTemplate3}
          encType="multipart/form-data"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            maxWidth: 400,
            margin: "auto",
            mt: "100px",
            mb: "100px",
          }}
        >
          <Typography variant="h6">Générer une image</Typography>
          {error && <Typography color="error">{error}</Typography>}

          {textesCadres.fields.map((field, index) =>
            field.customizable ? (
              <TextField
              key={field.name}
                // label={isFocused ? "max. 17 caractères" : formData[`text${index + 1}`]}
                label={isFocused ? "max."+`${field.length}` + " caractères" : formData[`text${index + 1}`]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name={`text${index + 1}`}
                onChange={alimenterLeTabDataAvecLeContenuDesChamps}
                inputProps={{ maxLength: field.length || 17 }}
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
            ) : null
          )}

          <Box>
            {/* {visuelsCadres.imageFields.map((field, key) => */}
            {visuelsCadres.imageFields.map((field, index) =>
              field.customizable ? (
                <Box>
                  <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" sx={buttonStyles} key={field.name} onClick={() => setLoadingImage(false)}>
                    Envoyer mon image
                    <input
                      name={field.name}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => envoiVisuelPerso(e)}
                      />
                  </Button>
                  {loadingImage && (
                    <Box>
                      <LoadingUpload onSuccess={creationDuVisuelAvecTemplate3} /> 
                    </Box>
                  )}
                </Box>
              ) : null
            )}
          </Box>

          <Button type="success" variant="contained" sx={buttonStyles}>
            Prévisualiser votre cadre
          </Button>

          {visuelGeneratedImageUrl && (
            <Box sx={{ mt: 2 }}>
              <CardMedia component="img" image={visuelGeneratedImageUrl} alt="Image générée" />
            </Box>
          )}
        </Box>
      )}
    </Box>
    <Box sx={{width:{xs:"100%"}, display: "flex", justifyContent: "space-between",alignItems: "center", backgroundColor:{ xs: "grey", sm:"transparent" }, zIndex: {xs: 2}, position: {xs: "fixed", sm: "relative"},left:{xs: 0}, bottom: {xs: 0}, p: {xs: 0},m:{xs:"0 !important", sm: "1 !important" },}}>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ margin:{xs:"0 !important", sm: "0 !important"}, px: {xs: "35px !important", sm: "35px !important"}, }}
      >
        Retour
      </Button>

      <Tooltip
        title={!previsuOwnVisu && !generatedImageUrl ? "Veuillez télécharger  ou générer une image d'abord" : ""}
        arrow
        sx={{ zIndex: "9999 !important" }}
      >
        <span>
          <Button
            type="button"
            variant="contained"
            // disabled={!previsuOwnVisu && !generatedImageUrl}
            onClick={handleNext}
            sx={{  m: "0 !important" }}
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

export default EtapeVisuel;