import React from "react";
import SlidersSousCategories from "./SlidersSousCategories.jsx";
import { Button as BaseButton, Button, buttonClasses } from "@mui/material";

const StylesOverlay = `
.memenza-sous-categories {
  background-color: rgba(164, 111, 251, 0.95);
  position: absolute;
  top: 0%;
  width: 95%;
  height: 90vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .memenza-sous-categories h2 {
  font-size: 2rem;
  }
`;

function MemenzaSousCategories() {
  return (
    <div className="memenza-sous-categories">
      <h2>Choisissez votre sous catégorie</h2>
      <SlidersSousCategories />
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "5%", right: "5%" }}
      >
        Visuel
      </Button>
      <style>{StylesOverlay}</style>
    </div>
  );
}

export default MemenzaSousCategories;
