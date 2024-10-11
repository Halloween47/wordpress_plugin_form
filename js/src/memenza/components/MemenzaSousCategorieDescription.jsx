import React from "react";
import { Typography } from "@mui/material";
import MemenzaSousCategoriesDetails from "./MemenzaSousCategoriesDetails.jsx";

export default function MemenzaSousCategorieDescription() {
  return (
    <div className="memenza-sous-categorie-description">
      <Typography
        color="primary"
        sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
      >
        Titre Sous Categorie
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: "clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id
        euismod ligula. Integer id ornare lectus. Mauris convallis feugiat risus
        vel sodales. Aenean eu felis vel dui sollicitudin dictum. Nullam vitae
        est in nunc luctus sagittis id ac ligula. Sed mollis condimentum odio
        sit amet tincidunt.
      </Typography>
    </div>
  );
}
