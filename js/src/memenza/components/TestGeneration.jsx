import React, { useState } from "react";
import { TextField, Button, Typography, Box, CardMedia } from "@mui/material";

function ImageForm() {
  const [formData, setFormData] = useState({
    image1: null,
    image2: null,
    text1: "Alexandre",
    text2: "12 janvier 2025",
  });
  console.log("VISUALISATION DE FORMDATA : " + JSON.stringify(formData));
  
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null); 


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
    
    const formPayload = new FormData();
    formPayload.append("text1", formData.text1);
    formPayload.append("text2", formData.text2); 
    // console.log("VERIFICATION DES DATA AVANT SOUMISSION FORMULAIRE : "+ JSON.stringify(formData.text1));
    // console.log("CONTENU DU FORMPAYLOAD"+formPayload);
    // console.log(JSON.stringify("CONTENU DU FORMPAYLOAD"+formPayload));
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
      console.log("VERIFICATION  FETCH DATA : " + JSON.stringify(formPayload));
      
        
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
      const url = URL.createObjectURL(result);
      setGeneratedImageUrl(url);
      // window.open(url, "_blank"); 
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

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
      <Typography variant="h6">Générer une image</Typography>

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
      {/* <CardMedia
                      component="img"
                      // image={'/home/memenzj/www/visuels/cmd/output_image_674f9aae4dd35.png'}
                      image={'https://memenza.fr/visuels/cmd/output_image_674f9aae4dd35.png'}
                    /> */}
    </Box>
  );
}

export default ImageForm;
