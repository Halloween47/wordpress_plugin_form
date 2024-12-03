import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Slider,
  TextField,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";

function ImageCustomizer({ imageData, onUpdate }) {
  const [width, setWidth] = useState(imageData.defaultSize.width);
  const [height, setHeight] = useState(imageData.defaultSize.height);
  const [x, setX] = useState(imageData.x);
  const [y, setY] = useState(imageData.y);
  const [customizable, setCustomizable] = useState(imageData.customizable);

  // Handlers for updating values
  const handleWidthChange = (event, newValue) => setWidth(newValue);
  const handleHeightChange = (event, newValue) => setHeight(newValue);
  const handleXChange = (event) => setX(event.target.value);
  const handleYChange = (event) => setY(event.target.value);
  const handleCustomizableChange = (event) => setCustomizable(event.target.checked);

  // Call onUpdate to send the updated values to the parent
  const handleSaveChanges = () => {
    onUpdate({
      ...imageData,
      defaultSize: { width, height },
      x: parseInt(x),
      y: parseInt(y),
      customizable,
    });
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personnalisation de l'image {imageData.name}
      </Typography>

      <Grid container spacing={2}>
        {/* Width */}
        <Grid item xs={6}>
          <Typography>Largeur (Width)</Typography>
          <Slider
            value={width}
            onChange={handleWidthChange}
            min={100}
            max={3000}
            step={10}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}px`}
          />
        </Grid>

        {/* Height */}
        <Grid item xs={6}>
          <Typography>Hauteur (Height)</Typography>
          <Slider
            value={height}
            onChange={handleHeightChange}
            min={100}
            max={3000}
            step={10}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}px`}
          />
        </Grid>

        {/* Position X */}
        <Grid item xs={6}>
          <TextField
            label="Position X"
            type="number"
            value={x}
            onChange={handleXChange}
            fullWidth
          />
        </Grid>

        {/* Position Y */}
        <Grid item xs={6}>
          <TextField
            label="Position Y"
            type="number"
            value={y}
            onChange={handleYChange}
            fullWidth
          />
        </Grid>

        {/* Customizable */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={customizable}
                onChange={handleCustomizableChange}
                color="primary"
              />
            }
            label="Activer la personnalisation"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Sauvegarder
        </Button>
      </Box>
    </Box>
  );
}

export default function ImageCustomization() {
  const initialImageData = [
    {
      name: "image1",
      defaultSize: { width: 1806, height: 1806 },
      x: 0,
      y: 0,
      defaultFile: "visuels/cadres/templates/alexandre_template.png",
      customizable: false,
    },
    {
      name: "image2",
      defaultSize: { width: 1806, height: 1806 },
      x: 0,
      y: 0,
      defaultFile: "visuels/cadres/templates/alexandre_template.png",
      customizable: false,
    },
  ];

  const [imageFields, setImageFields] = useState(initialImageData);

  // Update the image field data when any of the fields change
  const handleImageUpdate = (updatedImage) => {
    setImageFields((prevFields) =>
      prevFields.map((field) =>
        field.name === updatedImage.name ? updatedImage : field
      )
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Personnalisation des Visuels
      </Typography>
      {/* {imageFields.map((image) => (
        <ImageCustomizer key={image.name} imageData={image} onUpdate={handleImageUpdate} />
      ))} */}
    </Box>
  );
}
