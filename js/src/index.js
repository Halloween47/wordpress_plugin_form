import React from "react";
import { createRoot } from "react-dom/client";
import BasicButtonGroup from "./components/ButtonGroup.jsx";
import MemenzaFormulaire from "./memenza/MemenzaFormulaire.jsx";

// const containerButtonGroup = document.getElementById(
//   "react-container-buttongroup",
// );
// const rootButtonGroup = createRoot(containerButtonGroup);
// rootButtonGroup.render(<BasicButtonGroup />);

const pluginBackofficeContainer = document.getElementById(
  "plugin_backoffice_container",
);

const rootAffichagePagePrincipal = createRoot(pluginBackofficeContainer);
rootAffichagePagePrincipal.render(<MemenzaFormulaire />);