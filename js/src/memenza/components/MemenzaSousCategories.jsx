import React from "react";
import SlidersSousCategories from "./SlidersSousCategories.jsx";

const StylesOverlay = `
.memenza-sous-categories {
  background-color: rgba(164, 111, 251, 0.95);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 95vh;
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
      <style>{StylesOverlay}</style>
    </div>
  );
}

export default MemenzaSousCategories;
