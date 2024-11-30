import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ConstructionIcon from "@mui/icons-material/Construction";

const ComingSoon = ({ title = "Fonctionnalité à venir", message = "Nous travaillons activement à cette fonctionnalité, restez à l'écoute !" }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        border: "2px dashed #90caf9",
        borderRadius: "8px",
        backgroundColor: "#e3f2fd",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        mt: 4,
      }}
    >
      <ConstructionIcon
        sx={{
          fontSize: "80px",
          color: "#90caf9",
        }}
      />
      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold", color: "#1976d2" }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#1565c0" }}>
        {message}
      </Typography>
      <Button
        variant="outlined"
        startIcon={<HourglassEmptyIcon />}
        sx={{ mt: 3, color: "#1976d2", borderColor: "#1976d2" }}
        onClick={() => alert("Merci de votre patience !")}
      >
        En savoir plus
      </Button>
    </Box>
  );
};

export default ComingSoon;
