import React from "react";
import { Typography } from "@mui/material";
import MemenzaSousCategoriesDetails from "./MemenzaSousCategoriesDetails.jsx";

export default function MemenzaSousCategorieDescription() {
  return (
    <div className="memenza-sous-categorie-description">
      <Typography
        variant="h3"
        color="primary"
        sx={{ fontSize: "1.8rem", fontWeight: "bold", mb: "10px" }}
      >
        Titre Sous Categorie
      </Typography>
      <Typography
        variant="p"
        sx={{
          // fontWeight: "bold",
          // fontSize: "clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)",
          fontSize: "1.2rem",
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
