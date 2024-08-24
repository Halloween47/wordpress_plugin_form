import * as React from "react";
import Button from '@mui/material/Button';

function DownloadButton() {
  const handleDownload = () => {
    // Logique pour télécharger la musique
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Télécharger la musique
    </Button>
  );
}
export default DownloadButton;