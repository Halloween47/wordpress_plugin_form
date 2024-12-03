// import React from "react";

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import EtapeVideo from "./components/EtapeVideo.jsx";
// import EtapeValidation from "./components/EtapeValidation.jsx";
// import EtapeCategorie from "./components/EtapeCategorie.jsx";
// import EtapeVisuel from "./components/EtapeVisuel.jsx";
// import ComingSoon from "./components/ComingSoon.jsx";
// import { SousCatProvider } from "./components/SousCatContext.jsx";

// const steps = ["Categorie", "Visuel", "Video", "Validation"];
// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <EtapeCategorie />;
//     // return <EtapeVideo />;
//     // return <ComingSoon />;
//     case 1:
//       return <EtapeVisuel />;
//     case 2:
//       return <EtapeVideo />;
//     case 3:
//       return <EtapeValidation />;
//     default:
//       throw new Error("Etape inconnu");
//   }
// }

// const StylesFormulaire = `
//   h1, h2 {
//     margin-bottom: 20px!important;
//   }
//   .memenzaFormulaire {
//     // background-color: #0a2657;
//     background-color: #EBECF1;
//     color: white;
//     padding: 20px;
//   }
//   .nom-produit {
//     font-size: 2.3em !important;
//     margin: 10px 0;
//     padding-bottom: 10px;
//   }
//   `;

// const MemenzaFormulaire = () => {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleSuivant = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       throw new Error(
//         "Vous ne pouvez pas sauter une étape qui n'est pas facultative.",
//       );
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   return (
//     <SousCatProvider>
//     <div className="memenzaFormulaire">
//       <Box sx={{ width: "100%", height: "auto" }}>
//         <Typography variant="h4" gutterBottom sx={{ color: "#000" }}>
//           Nom du produit
//         </Typography>
//         <Stepper
//           activeStep={activeStep}
//           sx={{
//             // "background-color": "black",
//             borderRadius: "10px",
//             width: "100%",
//             margin: "20px auto 50px auto",
//             padding: "10px",
//             "& .css-2fdkz6": { color: "#ffffff !important" },
//             "& .css-2fdkz6.Mui-completed": { color: " #ffffff !important" },
//             "& .css-2fdkz6.Mui-active": { color: "#ffffff !important" },
//           }}
//         >
//           {steps.map((label, index) => {
//             const stepProps = {};
//             const labelProps = {};
//             if (isStepSkipped(index)) {
//               stepProps.completed = false;
//             }
//             return (
//               <Step key={label} {...stepProps}>
//                 <StepLabel {...labelProps}>{label}</StepLabel>
//               </Step>
//             );
//           })}
//         </Stepper>

//         {getStepContent(activeStep)}

//         {activeStep === steps.length ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               Toutes les étapes sont terminées : vous avez terminé
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Box sx={{ flex: "1 1 auto" }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               Etape {activeStep + 1}
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Retour
//               </Button>
//               <Box sx={{ flex: "1 1 auto" }} />
//               {/* à utiliser en cas d'etape optionnel */}
//               {/* {isStepOptional(activeStep) && (
//                 <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                   Skip
//                 </Button>
//               )} */}

//               <Button
//                 variant="contained"
//                 onClick={handleSuivant}
//                 sx={{ color: "#ffffff ", backgroundColor: "#A46FFB" }}
//               >
//                 {activeStep === steps.length - 1 ? "Terminé" : "Suivant"}
//               </Button>
//             </Box>
//           </React.Fragment>
//         )}
//       </Box>
//       <style>{StylesFormulaire}</style>
//     </div>
//     </SousCatProvider>
//   );
// };

// export default MemenzaFormulaire;

import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EtapeVideo from "./components/EtapeVideo.jsx";
import EtapeValidation from "./components/EtapeValidation.jsx";
import EtapeCategorie from "./components/EtapeCategorie.jsx";
import EtapeVisuel from "./components/EtapeVisuel.jsx";
import ComingSoon from "./components/ComingSoon.jsx";
import { SousCatProvider } from "./components/SousCatContext.jsx";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


const steps = ["Categorie", "Visuel", "Video", "Validation"];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <EtapeCategorie />;
    case 1:
      return <EtapeVisuel />;
    case 2:
      return <EtapeVideo />;
    case 3:
      return <EtapeValidation />;
    default:
      throw new Error("Etape inconnu");
  }
}

const MemenzaFormulaire = ({ setActiveStep }) => {
  const [activeStepLocal, setActiveStepLocal] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleSuivant = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStepLocal)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStepLocal);
    }
    setActiveStepLocal((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStepLocal((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStepLocal)) {
      throw new Error("Vous ne pouvez pas sauter une étape qui n'est pas facultative.");
    }
    setActiveStepLocal((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStepLocal);
      return newSkipped;
    });
  };

  return (
    <SousCatProvider>
      <div className="memenzaFormulaire">
        <Box sx={{ width: "100%", height: "auto" }}>
          {/* <Typography variant="h4" gutterBottom sx={{ color: "#000" }}>
            Nom du produit
          </Typography> */}
          <Stepper activeStep={activeStepLocal} sx={{m:"4em"}}>
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

          {/* <Routes>
              <Route path="/categorie" element={<EtapeCategorie />} />
              <Route path="/etape-visuel" element={<EtapeVisuel />} />
              <Route path="/video" element={<EtapeVideo />} />
              <Route path="/validation" element={<EtapeValidation />} />
            </Routes> */}

          {getStepContent(activeStepLocal)}

          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Etape {activeStepLocal + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStepLocal > 0 && (
              <Button disabled={activeStepLocal === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Retour
              </Button>
            ) }
              {/* <Button disabled={activeStepLocal === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Retour
              </Button> */}
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" onClick={handleSuivant} sx={{ color: "#ffffff ", backgroundColor: "#A46FFB" }}>
                {activeStepLocal === steps.length - 1 ? "Terminé" : "Suivant"}
              </Button>
            </Box>
          </React.Fragment>
        </Box>
      </div>
    </SousCatProvider>
  );
};

export default MemenzaFormulaire;

