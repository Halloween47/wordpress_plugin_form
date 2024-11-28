import {
  Box,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const VisuelFormTemplate1 = () => {
  return (
    <>
      <div>VisuelFormTemplate1</div>;
      <Box className="etape-video-personnalisation-visuel" spacing={2}>
        <Typography variant="h5" gutterBottom>
          Personnalisez votre vidéo
        </Typography>

        <Box
          className="upload-media"
          sx={{ display: "flex", alignItem: "center", my: "10px" }}
        >
          <Typography variant="body2">Texte 1 (max 15 caractères)</Typography>
          <TextField
            id={`filled-basic`}
            label={`Text`}
            variant="filled"
            size="small"
          />
        </Box>
        <Box
          className="upload-media"
          sx={{ display: "flex", alignItem: "center", my: "10px" }}
        >
          <Typography variant="body2">Texte 2 (max 17 caractères)</Typography>
          <TextField
            id={`filled-basic`}
            label={`Text`}
            variant="filled"
            size="small"
          />
        </Box>
      </Box>
    </>
  );
};

export default VisuelFormTemplate1;
