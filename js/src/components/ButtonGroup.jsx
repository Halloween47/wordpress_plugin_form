import * as React from "react";
import { createRoot } from "react-dom/client";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SimpleContainer from "./Container.jsx";
import BasicGrid from "./Grid.jsx";
import Checkout from "./checkout/Checkout.js";
import ContainerForm from "../formulaire/ContainerForm.jsx";
import ContainerQRCode from "../qrcode/ContainerQRCode.jsx";

export default function BasicButtonGroup() {
  // Fonction appelée lorsque le bouton est cliqué
  const handleClick = (event) => {
    const buttonText = event.target.textContent;

    console.log("Texte du bouton cliqué :", buttonText);

    if (buttonText === "QR Code") {
      const containerPresentation = document.getElementById(
        "react-container-presentation",
      );
      const rootPresentation = createRoot(containerPresentation);
      // rootPresentation.render(<SimpleContainer />);
      rootPresentation.render(<ContainerQRCode />);
    } else if (buttonText === "Test Grid") {
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
      // rootPresentation.render(<Checkout />);
      rootPresentation.render(<ContainerForm />);
    }
  };

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClick}>Formulaire</Button>
      <Button onClick={handleClick}>QR Code</Button>
      <Button onClick={handleClick}>Test Grid</Button>
    </ButtonGroup>
  );
}
