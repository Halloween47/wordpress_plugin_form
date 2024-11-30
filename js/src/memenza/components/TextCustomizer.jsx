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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function TextCustomizer({ textData, onUpdate }) {
  const [text, setText] = useState(textData.defaultValue);
  const [fontSize, setFontSize] = useState(textData.font.size);
  const [fontFamily, setFontFamily] = useState(textData.font.family);
  const [xPercent, setXPercent] = useState(textData.x_percent);
  const [yPercent, setYPercent] = useState(textData.y_percent);
  const [customizable, setCustomizable] = useState(textData.customizable);

  // Handlers for updating values
  const handleTextChange = (event) => setText(event.target.value);
  const handleFontSizeChange = (event, newValue) => setFontSize(newValue);
  const handleXPercentChange = (event, newValue) => setXPercent(newValue);
  const handleYPercentChange = (event, newValue) => setYPercent(newValue);
  const handleFontFamilyChange = (event) => setFontFamily(event.target.value);
  const handleCustomizableChange = (event) => setCustomizable(event.target.checked);

  // Call onUpdate to send the updated values to the parent
  const handleSaveChanges = () => {
    onUpdate({
      ...textData,
      defaultValue: text,
      font: { family: fontFamily, size: fontSize },
      x_percent: xPercent,
      y_percent: yPercent,
      customizable,
    });
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personnalisation du texte {textData.name}
      </Typography>

      <Grid container spacing={2}>
        {/* Text Field */}
        <Grid item xs={12}>
          <TextField
            label="Texte"
            value={text}
            onChange={handleTextChange}
            fullWidth
            inputProps={{ maxLength: textData.length }}
          />
        </Grid>

        {/* Font Size */}
        <Grid item xs={6}>
          <Typography>Taille de la police</Typography>
          <Slider
            value={fontSize}
            onChange={handleFontSizeChange}
            min={10}
            max={300}
            step={1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}px`}
          />
        </Grid>

        {/* Font Family */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Police de caractère</InputLabel>
            <Select
              value={fontFamily}
              onChange={handleFontFamilyChange}
              label="Police de caractère"
            >
              <MenuItem value="/cadres/fonts/Vibur.ttf">Vibur</MenuItem>
              <MenuItem value="/cadres/fonts/Arial.ttf">Arial</MenuItem>
              <MenuItem value="/cadres/fonts/Roboto.ttf">Roboto</MenuItem>
              {/* Ajoutez d'autres polices si nécessaire */}
            </Select>
          </FormControl>
        </Grid>

        {/* X Position (percentage) */}
        <Grid item xs={6}>
          <Typography>Position X (%)</Typography>
          <Slider
            value={xPercent}
            onChange={handleXPercentChange}
            min={0}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
          />
        </Grid>

        {/* Y Position (percentage) */}
        <Grid item xs={6}>
          <Typography>Position Y (%)</Typography>
          <Slider
            value={yPercent}
            onChange={handleYPercentChange}
            min={0}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
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

export default function TextCustomization() {
  const initialTextData = [
    {
      name: "text1",
      length: 15,
      defaultValue: "Alexandre",
      font: {
        family: "/cadres/fonts/Vibur.ttf",
        size: 176,
      },
      x_percent: 0.39,
      y_percent: 0.16,
      customizable: true,
    },
    {
      name: "text2",
      length: 17,
      defaultValue: "12 janvier 2025",
      font: {
        family: "/cadres/fonts/Vibur.ttf",
        size: 70,
      },
      x_percent: 0.50,
      y_percent: 0.22,
      customizable: true,
    },
  ];

  const [textFields, setTextFields] = useState(initialTextData);

  // Update the text field data when any of the fields change
  const handleTextUpdate = (updatedText) => {
    setTextFields((prevFields) =>
      prevFields.map((field) =>
        field.name === updatedText.name ? updatedText : field
      )
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Personnalisation des Textes
      </Typography>
      {textFields.map((text) => (
        <TextCustomizer key={text.name} textData={text} onUpdate={handleTextUpdate} />
      ))}
    </Box>
  );
}
