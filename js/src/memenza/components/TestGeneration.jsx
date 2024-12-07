import React, { useState } from "react";
import { TextField, Button, Typography, Box, CardMedia } from "@mui/material";
import { useSousCat } from "../../componentsMemenza/SousCatContext.jsx";

function ImageForm() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null); 
  const {selectedSousCatId, navigationId, outputFilePathContext, setOutputFilePathContext } = useSousCat();
  const [imagesVisuels, setImagesVisuels] = React.useState([]);
  const [visuelsCadres, setVisuelsCadres] = React.useState([]);
  
  
  
  const [error, setError] = useState(null);
  // const [formData, setFormData] = useState({
    //   image1: null,
    //   image2: null,
    //   // text1: "Alexandre",
    //   text1: "Test",
    //   text2: "12 janvier 2025",
  // });
  const [variablesText1, setVariablesText1] = React.useState([]);
  const [formData, setFormData] = useState({
    image1: null,
      image2: null,
      // text1: "Alexandre",
      text1: variablesText1,
      text2: "12 janvier 2025",
    });

//     const imagesVisuelsFitred =  imagesVisuels.filter((item) => {
//       return item.id_ss_cat === selectedSousCatId;
//     })
//     console.log("CONTENU DU TABLEAU FILTRER : " + JSON.stringify(imagesVisuelsFitred));
// setVariablesText1(imagesVisuelsFitred.name)

console.log("CHECK RESULTAT : " + JSON.stringify(imagesVisuels));
console.log("CHECK RESULTAT CHARLES : " + JSON.stringify(imagesVisuels[1]));




// React.useEffect(() => {
//   if (imagesVisuels.length > 0) {
//     const filtered = imagesVisuels.filter((item) => item.id_modele_cadre === selectedSousCatId);
//     console.log("CHECK FILLTREDD : " + JSON.stringify(filtered));
//     const parsedTextesCadre = JSON.parse(filtered.textes_cadres);
//     console.log("TEST PARSEEEEE : " + JSON.stringify(filtered.textes_cadres));

//     const names = filtered.map((item) => item.name); // Suppose que chaque item a une propriété `name`
//     setVariablesText1(names);
//   }
// }, [imagesVisuels, selectedSousCatId]);
  
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/wp-json/plugin_memenza/v1/images_visuel",
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setImagesVisuels(result);
        
      } catch (error) {
        setError(error.message);
      } 
    };

    fetchData();
  }, [])

  
  
  

  
  


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      console.log("Fichier sélectionné : ", files[0]);  
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

 
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const outputFilePath = `/home/memenzj/www/visuels/cmd/${navigationId}.png`;
    const outputFolder = `/home/memenzj/www/visuels/uploads/${navigationId}`;

// console.log("TEST outputFilePath DE SORTI" + outputFilePath);
// console.log("TEST outputFolder DE SORTI" + outputFolder);
setOutputFilePathContext(outputFilePath);
// console.log("TEST outputFilePathContext DE SORTI" + outputFilePathContext);
    
    const formPayload = new FormData();
    formPayload.append("text1", formData.text1);
    formPayload.append("text2", formData.text2); 
    formPayload.append("output_file", outputFilePath);
    formPayload.append("dossier", outputFolder );
    // formPayload.append("image1", formData.image1); // Ajouter image1 au payload
    // formPayload.append("image2", formData.image2); // Ajouter image1 au payload
    // console.log("VERIFICATION DES DATA AVANT SOUMISSION FORMULAIRE : "+ JSON.stringify(formData.text1));
    // console.log("CONTENU DU FORMPAYLOAD"+formPayload);
    // console.log("CONTENU DU FORMPAYLOAD"+ formPayload);
    console.log("CONTENU DU FORMPAYLOAD"+ JSON.stringify(formPayload));
    if (formData.image1) {
      formPayload.append("image1", formData.image1); // Ajouter image1 au payload
    }
    if (formData.image2) {
      formPayload.append("image2", formData.image2); // Ajouter image1 au payload
    }
    

    try {     
      const response = await fetch(
         "../../wp-content/plugins/ProductImageCustomizer/js/process-simplifie.php",
        {
          method: "POST",
          body: formPayload,
        },
      );
      // console.log("VERIFICATION  FETCH DATA : " + JSON.stringify(formPayload));
      
        
      ////////////////
      ////////////////
      // const response = await fetch(process.env.MEMENZA_AJAX_URL, {
      //   method: "POST",
      //       body: formPayload,
      //   });

      //   console.log(response.data);
      ////////////////
      ////////////////

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission du formulaire");
      } else {
        console.log("soumission du formulaire OK");
      }

      // const result = await response.blob(); // Récupérer l'image générée
      const result = await response.blob(); // Récupérer l'image générée
      console.log("EN RECHERCHE DU CMD IMAGE : " + result);
      console.log("ICI ON RECUP TOUS LES RESULTATS Y COMPRIS L'URL : " + JSON.stringify(result));
      
      const url = URL.createObjectURL(result);
      console.log("RESULTAT DE LURL POUR alimenter l'image de previsualisation: " + JSON.stringify(url));
      
      setGeneratedImageUrl(url);
      
      // window.open(url, "_blank"); 

      // await sendImageToServer(result);

      
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const imagesVisuelsFitred = imagesVisuels.filter((item) => item.id_ss_cat === selectedSousCatId);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        // height: "200px"
      }}
    >
      {imagesVisuelsFitred.map((item, index) => (
    <Typography>{item.visuels_cadres.imageFields}</Typography>)
  )}
      <Typography variant="h6">Générer une image</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Texte 1 (max. 15 caractères)"
        name="text1"
        value={formData.text1}
        onChange={handleChange}
        inputProps={{ maxLength: 15 }}
        required
        InputLabelProps={{
          sx: {
            transform: 'translate(0, -8px)', 
            fontSize: '1rem', 
            // lineHeight: "2px"
          },
          
        }}
        sx={{
          // marginTop: 1.2, 
          paddingTop: 1.2, 
          marginBottom: 1.2, 
          paddingBottom: 1.2, 
        }}
      />

      <TextField
        label="Texte 2 (max. 17 caractères)"
        name="text2"
        value={formData.text2}
        onChange={handleChange}
        inputProps={{ maxLength: 17 }}
        required
        InputLabelProps={{
          sx: {
            transform: 'translate(0, -8px)', 
            fontSize: '1rem', 
            // lineHeight: "2px"
          },
          
        }}
        sx={{
          // marginTop: 1.2, 
          paddingTop: 1.2, 
          marginBottom: 1.2, 
          paddingBottom: 1.2, 
        }}
      />
      

  <>
  {/* {formData.customizable === false ? (
  <Typography>TEST</Typography>
) : (
  <Typography>ECHOUE</Typography>
)} */}
  
  </>

  {imagesVisuelsFitred.map((item, index) => {
  // Parse visuels_cadres
  const visuelsCadresParsed = JSON.parse(item.visuels_cadres);

  return (
    <Box key={index}>
      {visuelsCadresParsed.imageFields.map((field, fieldIndex) => (
          <Box>
        <Box>

        {field.customizable && (
          <Box>
          <Typography>TES APPARITION</Typography>
          <Button
        variant="contained"
        component="label"
        sx={{ width: "100%" }}
        >
        Télécharger Image 1
        <input
          type="file"
          name="image1"
          accept="image/*"
          onChange={handleChange}
          hidden
          />
      </Button>
      {formData.image1 && (
        <Typography variant="body2">
          {formData.image1.name} 
        </Typography>
      )}
      <Button
        variant="contained"
        component="label"
        sx={{ width: "100%" }}
      >
        Télécharger Image 2
        <input
          type="file"
          name="image2"
          accept="image/*"
          onChange={handleChange}
          hidden
        />
      </Button>
      {formData.image2 && (
        <Typography variant="body2">
          {formData.image2.name} 
        </Typography>
      )}
      </Box>
        )}
        </Box>
        
        </Box>
        
      ))}
    </Box>
  );
})}
      
      


      

      {/* <Button type="submit" variant="contained"> */}
      <Button type="success" variant="contained">
      Prévisualiser votre cadre 
      </Button>
      {generatedImageUrl ? (<>
        <CardMedia
          component="img"
          image={generatedImageUrl} 
          alt="Image générée"
        />
        
      </>                         
      ) : (
        <Typography></Typography>
      )}
    </Box>
  );
}

export default ImageForm;
