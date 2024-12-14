// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom"; // Importer BrowserRouter
// import MemenzaFormulaire from "./memenza/MemenzaFormulaire.jsx";  // Votre composant principal

// const pluginBackofficeContainer = document.getElementById("plugin_backoffice_container");

// const rootAffichagePagePrincipal = createRoot(pluginBackofficeContainer);

// rootAffichagePagePrincipal.render(
//   <Router>
//     <MemenzaFormulaire />
//   </Router>
// );

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EtapeCategorie from "./etapes/EtapeCategorie.jsx";
import EtapeVisuel from "./etapes/EtapeVisuel.jsx";
import TestVisuelFusion from "./etapes/TestVisuelFusion.jsx";
// import EtapeVideo from "./etapes/EtapeVideo.jsx";
import TestVideoFusion from "./etapes/TestVideoFusion.jsx";
import EtapeValidation from "./etapes/EtapeValidation.jsx";
import EtapeTim from "./etapes/EtapeTim.jsx";
import { SousCatProvider, useSousCat } from "./componentsMemenza/GestionEtat.jsx";

// Définition des étapes
const steps = ["Categorie", "Visuel", "Video", "Validation"];

// Fonction pour retourner le contenu de chaque étape
// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <EtapeCategorie />; 
//     case 1:
//       // return <EtapeVisuel />;
//       return <TestVisuelFusion setActiveStep={setActiveStep}/>;
//       case 2:
//         // return <EtapeVideo />;
//         return <TestVideoFusion setActiveStep={setActiveStep}/>;
//     case 3:
//       return <EtapeValidation />;
//     default:
//       throw new Error("Etape inconnue");
//   }
// }

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <EtapeCategorie setActiveStep={setActiveStep} />; 
      case 1:
        // return <EtapeVisuel />;
        return <TestVisuelFusion setActiveStep={setActiveStep}/>;
        case 2:
          // return <EtapeVideo />;
          return <TestVideoFusion setActiveStep={setActiveStep}/>;
      case 3:
        // return <EtapeValidation />;
        return <EtapeTim />;
      default:
        throw new Error("Etape inconnue");
    }
  }
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => step === 1; // Définir si une étape est facultative
  const isStepSkipped = (step) => skipped.has(step); // Vérifier si une étape est sautée

  const handleSuivant = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    window.scrollTo(0, 0); // Remonter en haut après chaque étape
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <SousCatProvider>
      <div className="memenzaFormulaire">
        <Box sx={{ width: "100%", height: "auto" }}>
          <Stepper activeStep={activeStep} sx={{ m: "4em" }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {getStepContent(activeStep)}

          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Etape {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep > 0 && (
                <Button
                  disabled={activeStep === 0}
                  // disabled={activeStep === 0 || !isGenerate}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Retour
                </Button>
              )}
              <Box sx={{ flex: "1 1 auto" }} />
              {/* <Button
                variant="contained"
                onClick={handleSuivant}
                // disabled={!isGenerate}
                sx={{ color: "#ffffff ", backgroundColor: "#A46FFB" }}
              >
                {activeStep === steps.length - 1 ? "Terminé" : "Suivant"}
              </Button> */}
            </Box>
          </React.Fragment>
        </Box>
      </div>
    </SousCatProvider>
  );
};

// Rendu de l'application principale
const pluginBackofficeContainer = document.getElementById(
  "plugin_backoffice_container"
);
const root = createRoot(pluginBackofficeContainer);
root.render(<App />);
