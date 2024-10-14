import { Typography, Box, Divider, Paper } from "@mui/material";
import React from "react";

function EtapeValidation() {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f7f7f7" }}>
      {/* Titre de la validation */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Validation
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        {/* Section de récapitulation */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Récapitulatif
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box
          className="validation-recap__visuel"
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <img
            src=""
            alt="Illustration de la validation"
            style={{ width: "150px", marginRight: "20px" }}
          />
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium consectetur culpa laborum, eius non, esse quasi rerum
            quis, hic nemo molestiae officia molestias nostrum consequatur
            nesciunt velit id doloribus. Commodi!
          </Typography>
        </Box>

        {/* Section de vidéo */}
        <Box
          className="validation-recap__video"
          sx={{ backgroundColor: "#e8eaf6", p: 2, borderRadius: "8px" }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Vidéo de Récapitulatif
          </Typography>
          <Typography variant="body2">
            === VIDEO === Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Praesentium consectetur culpa labor.
          </Typography>
        </Box>
      </Paper>

      {/* Validation de Paiement */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Validation de Paiement
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" className="validation-recap-paiement">
          Voici les détails de votre paiement...
        </Typography>
      </Paper>
    </Box>
  );
}

export default EtapeValidation;
