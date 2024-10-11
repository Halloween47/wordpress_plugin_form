import * as React from "react";
import Button from "@mui/material/Button";

function DownloadButton() {
  const handleDownload = () => {
    // Logique pour télécharger la musique
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Uploader son propre visuel
    </Button>
  );
}
export default DownloadButton;
