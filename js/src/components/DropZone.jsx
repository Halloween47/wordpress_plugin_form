import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography } from '@mui/material';

const Dropzone = () => {
  const onDrop = (acceptedFiles) => {
    // Traitez les fichiers acceptés ici
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Paper 
      {...getRootProps()} 
      style={{ 
        border: '2px dashed #007bff', 
        padding: '20px', 
        textAlign: 'center' 
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6">
        Déposez vos fichiers ici, ou cliquez pour sélectionner des fichiers
      </Typography>
      <Typography variant="body2">
        Formats acceptés : JPG, PNG, GIF
      </Typography>
    </Paper>
  );
};

export default Dropzone;
