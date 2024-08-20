import * as React from "react";
import { createRoot } from "react-dom/client";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SimpleContainer from "./Container.jsx";
import BasicGrid from "./Grid.jsx";
import Checkout from "./checkout/Checkout.js";

export default function BasicButtonGroup() {
  // Fonction appelée lorsque le bouton est cliqué
  const handleClick = (event) => {
    const buttonText = event.target.textContent;

    console.log("Texte du bouton cliqué :", buttonText);

    if (buttonText === "Three") {
      alert("VIVA L'ALGERIE");
    } else if (buttonText === "Two") {
      const containerPresentation = document.getElementById(
        "react-container-presentation",
      );
      const rootPresentation = createRoot(containerPresentation);
      rootPresentation.render(<SimpleContainer />);
    } else if (buttonText === "One") {
      const containerPresentation = document.getElementById(
        "react-container-presentation",
      );
      const rootPresentation = createRoot(containerPresentation);
      rootPresentation.render(<BasicGrid />);
    } else if (buttonText === "Formulaire") {
      const containerPresentation = document.getElementById(
        "react-container-presentation",
      );
      const rootPresentation = createRoot(containerPresentation);
      rootPresentation.render(<Checkout />);
    }
  };

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClick}>Formulaire</Button>
      <Button onClick={handleClick}>One</Button>
      <Button onClick={handleClick}>Two</Button>
      <Button onClick={handleClick}>Three</Button>
    </ButtonGroup>
  );
}
