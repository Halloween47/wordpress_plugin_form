import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const images = [
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
  // "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
  // "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
  // "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
  // "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
  // "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
];

export default function MemenzaChoixVideo() {
  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Choisissez votre template
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        (Explication du pourquoi du choix du template)
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {images.map((src, index) => (
          <Grid item key={index} xs={6} sm={4} md={3}>
            <Box
              component="img"
              src={src}
              alt={`Visuel ${index + 1}`}
              sx={{
                width: "100%",
                height: 200, // Hauteur fixe pour toutes les images
                gap: 2,
                borderRadius: 2,
                objectFit: "cover", // Garde le contenu centré et recadré
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
              onClick={() => console.log(`Image ${index + 1} clicked`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
