import React from "react";
import SlidersSousCategories from "./SlidersSousCategories.jsx";
import { Button } from "@mui/material";

const StylesOverlay = `
.memenza-sous-categories {
  // background-color: rgba(164, 111, 251, 0.9);
  background-color: rgba(0, 0, 0, 0.9) !important;
  position: absolute;
  top: 0;
  width: 90%;
  // height: 85vh;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
.memenza-sous-categories h2 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
  line-height: 1.2;
}
.memenza-sous-categories .MuiButton-root {
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 500;
  background-color: #ffffff;
  color: #a46ffb;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.memenza-sous-categories .MuiButton-root:hover {
  background-color: #f0e6ff;
  transform: scale(1.05);
}
.memenza-sous-categories .MuiButton-root:focus {
  outline: 2px solid #ffffff;
  outline-offset: 4px;
}
`;

function MemenzaSousCategories() {

  return (
    <div className="memenza-sous-categories">
      <h2>Choisissez votre sous-catégorie</h2>
      
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
