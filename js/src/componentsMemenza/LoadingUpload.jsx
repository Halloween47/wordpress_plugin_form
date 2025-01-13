import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    position: 'relative',
  },
  circularProgress: {
    animation: 'circular-rotate 1.4s linear infinite !important', // Force la rotation
    color: 'blue !important', // Couleur du loader avec priorité
  },
  checkIcon: {
    color: 'green !important', // Couleur du check
    fontSize: 40, // Taille de l'icône
  },
  typography: {
    fontSize: '1rem', 
    mb: "0px !important",
  },
};

export default function LoadingUpload({ onSuccess }) {
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    let timer;

    if (loadingImage) {
      // Simuler un temps de chargement
      timer = setTimeout(() => {
        setLoadingImage(false); // Fin du chargement
        setSuccess(true); // Définir l'état success
        if (onSuccess) onSuccess();
      }, 2000); // Temps d'attente en ms
    }

    return () => clearTimeout(timer);
  }, [loadingImage]);

  return (
    <Box sx={styles.container}>
      {loadingImage ? (
        <Fade in={loadingImage} unmountOnExit>
          <CircularProgress sx={styles.circularProgress} />
        </Fade>
      ) : (
        success && (
          <Box>
            <Fade in={success}>
              <CheckIcon sx={styles.checkIcon} />
            </Fade>
            <Typography sx={styles.typography}>Téléchargement de l'image réussi !</Typography> 
          </Box>
        )
      )}
    </Box>
  );
}
