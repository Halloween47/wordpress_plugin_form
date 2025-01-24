import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSousCat } from "./GestionEtat.jsx"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ResultatJ2V() {
    const {lienResultatJ2V } = useSousCat();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        Résultat de votre création précédente
        </Typography>
      </CardContent>
      <Box component="video" src={lienResultatJ2V} controls 
        sx={{ 
            width: {xs: "100%", sm: "70%"}, 
            objectFit: "contain", 
            maxHeight: '90vh' ,
            mb: 2,
            }} 
        />
    </Card>
  );
}