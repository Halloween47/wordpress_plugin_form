import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const images = [
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
];

export default function MemenzaChoixVisuel() {
  return (
    <Box sx={{ textAlign: "center", p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
        <Typography variant="h4" gutterBottom>
          Choisissez votre visuel
        </Typography>
        <Typography variant="h5" color="textSecondary">
Choisissez votre visuel        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {images.map((src, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
              onClick={() => console.log(`Image ${index + 1} clicked`)}
            >
              <CardMedia
                component="img"
                image={src}
                alt={`Visuel ${index + 1}`}
                sx={{
                  height: 200,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="body1" color="textPrimary" fontWeight="bold">
                  Visuel {index + 1}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description courte pour expliquer l'intérêt de ce visuel.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
