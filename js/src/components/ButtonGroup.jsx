import * as React from "react";
import { createRoot } from "react-dom/client";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SimpleContainer from "./Container.jsx";
import BasicGrid from "./Grid.jsx";
import Checkout from "./checkout/Checkout.js";
import ContainerForm from "../formulaire/ContainerForm.jsx";
import ContainerQRCode from "../qrcode/ContainerQRCode.jsx";
import ToggleColorMode from "./checkout/ToggleColorMode.js";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import getCheckoutTheme from "./checkout/theme/getCheckoutTheme.js";

import MemenzaFormulaire from '../memenza/MemenzaFormulaire.jsx';


export default function BasicButtonGroup() {
  const [mode, setMode] = React.useState("light");

  
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

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
    } else if (buttonText === "Memenza 2.0") {
      const containerPresentation = document.getElementById(
        "react-container-presentation",
      );
      const rootPresentation = createRoot(containerPresentation);
      rootPresentation.render(<MemenzaFormulaire />);
    }
  };

  const toggleColorMode = () => {
    console.log(localStorage.getItem("themeMode"));

    const newMode = mode === "dark" ? "light" : "dark";
    // const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
 
    console.log(localStorage.getItem("themeMode"));

  

  }

  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClick}>Formulaire</Button>
      <Button onClick={handleClick}>QR Code</Button>
      <Button onClick={handleClick}>Test Grid</Button>
      <Button onClick={handleClick}>Memenza 2.0</Button>
    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
    </ButtonGroup>
    </ThemeProvider>
  );
}
