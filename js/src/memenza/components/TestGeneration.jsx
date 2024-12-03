import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function ImageForm() {
  const [formData, setFormData] = useState({
    image1: null,
    image2: null,
    text1: "Alexandre",
    text2: "12 janvier 2025",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
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

    try {
      //   const response = await fetch("/generate", {
      const response = await fetch(
        "../wp-content/plugins/memenza-form-test/js/src/memenza/test/process-simplifie.php",
        // "../wp-content/plugins/memenza-form-test/js/src/memenza/test/process.php",
        {
          method: "POST",
          body: formPayload,
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission du formulaire");
      } else {
        console.log("OKKKKKKKKKKK");
      }

      const result = await response.blob(); // Récupérer l'image générée
      const url = URL.createObjectURL(result);
      window.open(url, "_blank"); // Afficher dans un nouvel onglet
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
      />

      <TextField
        label="Texte 2 (max. 17 caractères)"
        name="text2"
        value={formData.text2}
        onChange={handleChange}
        inputProps={{ maxLength: 17 }}
        required
      />

      <Button type="submit" variant="contained">
        Générer l'image
      </Button>
    </Box>
  );
}

export default ImageForm;
