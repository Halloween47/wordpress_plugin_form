// import React, { useState, useEffect } from "react";
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
// } from "@mui/material";
// import styled from "styled-components";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

// // Styled Components
// const FormGrid = styled(Grid)({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "space-between",
// });

// const StyleEtapeVisuel = styled.div`
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
//           <CheckCircleIcon className="check-icon" />
//         )}
//       </CardContent>
//     </Card>
//   </Grid>
// );

// const TestVisuelFusion = () => {
//     console.log("ICI COMPOSANT VISUEL FUSION POUR TEST");
    
//     const { selectedSousCatId, navigationId, outputFilePathContext, setOutputFilePathContext } = useSousCat();
//     const [selectedVisuelId, setSelectedVisuelId] = useState(null);
//     const [imagesVisuels, setImagesVisuels] = useState([]);
//     const [dataVignettesClique, setDataVignettesClique] = useState([]);
//     console.log("LES DATA DE LA VIGNETTES SONT : " + JSON.stringify(dataVignettesClique));
//     const textesCadres = dataVignettesClique.map(item => JSON.parse(item.textes_cadres));
//     console.log("LES DATA TEXTES_CADRES PARSE SONT : " + JSON.stringify(textesCadres));
    
//     // console.log("LES DATA POUR LE CHAMPS 1 SONT : " + JSON.stringify(fields.name)); 
//     // const test = textesCadres.map(item => JSON.parse(item.t));

//     // const dataTextesCadresParse = JSON.parse(dataVignettesClique.textes_cadres);
//     // console.log("LES DATA TEXTES_CADRES PARSE SONT : " + JSON.stringify(dataTextesCadresParse));
//   const [formData, setFormData] = useState({
//     text1: '',
//     text2: '12 janvier 2025',
//     image1: null,
//     image2: null,
//   });
//   const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
//   const [error, setError] = useState(null);
  
//   const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);

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

//   const handleVisuelClickCustom = (id) => {
//     setSelectedVisuelId(id);
//     console.log("RESULTAT DU MODELE CADRE CLIQUE : " + id);
//     const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
//     console.log("RESULTAT DU CLIC VIGNETTES : " + selectedVisuelId + " " + id + " " +
//       JSON.stringify(filtreSelonVignetteSelectionne));
//   setDataVignettesClique(filtreSelonVignetteSelectionne)
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
//     const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;

//     setOutputFilePathContext(outputFilePath);

//     const formPayload = new FormData();
//     formPayload.append("text1", formData.text1);
//     formPayload.append("text2", formData.text2);
//     formPayload.append("output_file", outputFilePath);
//     formPayload.append("dossier", outputFolder);
//     if (formData.image1) formPayload.append("image1", formData.image1);
//     if (formData.image2) formPayload.append("image2", formData.image2);

//     try {
//       const response = await fetch("../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php", {
//         method: "POST",
//         body: formPayload,
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de la soumission du formulaire");
//       }

//       const result = await response.blob();
//       const url = URL.createObjectURL(result);
//       setGeneratedImageUrl(url);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Box sx={{ textAlign: "center", p: 4, bgcolor: "#f5f5f5" }}>
//       <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
//         <Typography variant="h5" color="textSecondary">Choisissez votre modèle</Typography>
//       </Box>

//       <Grid container spacing={3} justifyContent="center">
//         {tableauFiltrePourVignette.map((item, index) => (
//           <VisuelCard
//             key={index}
//             item={item}
//             isSelected={selectedVisuelId === item.id_modele_cadre}
//             onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
//           />
//         ))}
//       </Grid>

//       {selectedVisuelId && (
//         <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, maxWidth: 400, margin: "auto" }}>
//           {error && <Typography color="error">{error}</Typography>}
//           <TextField
//             label="Texte 1 (max. 15 caractères)"
//             name="text1"
//             // value={formData.text1}
//             value={textesCadres.text1}
//             onChange={handleChange}
//             inputProps={{ maxLength: 15 }}
//             required
//             sx={{ paddingTop: 1.2, marginBottom: 1.2 }}
//           />
//           <TextField
//             label="Texte 2 (max. 17 caractères)"
//             name="text2"
//             value={formData.text2}
//             onChange={handleChange}
//             inputProps={{ maxLength: 17 }}
//             required
//             sx={{ paddingTop: 1.2, marginBottom: 1.2 }}
//           />
//           <Button variant="contained" component="label" sx={{ width: "100%" }}>
//             Télécharger Image 1
//             <input type="file" name="image1" accept="image/*" onChange={handleChange} hidden />
//           </Button>
//           {formData.image1 && <Typography variant="body2">{formData.image1.name}</Typography>}
//           <Button variant="contained" component="label" sx={{ width: "100%" }}>
//             Télécharger Image 2
//             <input type="file" name="image2" accept="image/*" onChange={handleChange} hidden />
//           </Button>
//           {formData.image2 && <Typography variant="body2">{formData.image2.name}</Typography>}
//           <Button type="submit" variant="contained">Prévisualiser votre cadre</Button>
//         </Box>
//       )}

//       {generatedImageUrl && (
//         <Box sx={{ mt: 2 }}>
//           <CardMedia component="img" image={generatedImageUrl} alt="Image générée" />
//         </Box>
//       )}

//       <StyleEtapeVisuel />
//     </Box>
//   );
// };

// export default TestVisuelFusion;

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";


// Styled Components
const FormGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
});

const StyleEtapeVisuel = styled.div`
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
          <CheckCircleIcon className="check-icon" />
        )}
      </CardContent>
    </Card>
  </Grid>
);



const TestVisuelFusion = () => {
  const { selectedSousCatId, navigationId, outputFilePathContext, setOutputFilePathContext } = useSousCat();
  const [selectedVisuelId, setSelectedVisuelId] = useState(null);
  const [imagesVisuels, setImagesVisuels] = useState([]);
  const [dataVignettesClique, setDataVignettesClique] = useState([]);
  const [formData, setFormData] = useState({
    text1: '',
    text2: '',
    image1: null,
    image2: null,
  });
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);

  const textesCadres = dataVignettesClique.length
    ? JSON.parse(dataVignettesClique[0].textes_cadres)
    : null;

  // Initialisation des champs de texte à partir de `textesCadres`
  useEffect(() => {
    if (textesCadres) {
      const text1Field = textesCadres.fields.find(field => field.name === "text1");
      const text2Field = textesCadres.fields.find(field => field.name === "text2");
      setFormData({
        ...formData,
        text1: text1Field?.defaultValue || "",
        text2: text2Field?.defaultValue || "",
      });
    }
  }, [textesCadres]);

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

  const handleVisuelClickCustom = (id) => {
    setSelectedVisuelId(id);
    const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
    setDataVignettesClique(filtreSelonVignetteSelectionne);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
    const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;

    setOutputFilePathContext(outputFilePath);
    console.log("VERIFICATION DU LIEN DE DESTINATION DE LIMAGE GENERE : " + JSON.stringify(outputFilePath));
    

    const formPayload = new FormData();
    formPayload.append("text1", formData.text1);
    formPayload.append("text2", formData.text2);
    formPayload.append("output_file", outputFilePath);
    formPayload.append("dossier", outputFolder);
    if (formData.image1) formPayload.append("image1", formData.image1);
    if (formData.image2) formPayload.append("image2", formData.image2);

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

      const result = await response.blob();
      const url = URL.createObjectURL(result);
      setGeneratedImageUrl(url);
      console.log("TEST PREVISU VOICI LE RESULT DE LA REPONSE : " + JSON.stringify(result));
      console.log("TEST PREVISU VOICI LERESULTAT DE LID : " + JSON.stringify(url));
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 4, bgcolor: "#f5f5f5" }}>
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
          <TextField
            label="Texte 1 (max. 15 caractères)"
            name="text1"
            value={formData.text1}
            onChange={handleChange}
            inputProps={{ maxLength: 15 }}
            required
            sx={{ paddingTop: 1.2, marginBottom: 1.2 }}
          />
          <TextField
            label="Texte 2 (max. 17 caractères)"
            name="text2"
            value={formData.text2}
            onChange={handleChange}
            inputProps={{ maxLength: 17 }}
            required
            sx={{ paddingTop: 1.2, marginBottom: 1.2 }}
          />
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

{/* <Button type="success" variant="contained">
      Prévisualiser votre cadre 
      </Button>
      {generatedImageUrl && (
        <Box sx={{ mt: 2 }}>
          <CardMedia component="img" image={generatedImageUrl} alt="Image générée" />
        </Box>
      )} */}
    </Box>
  );
};

export default TestVisuelFusion;

