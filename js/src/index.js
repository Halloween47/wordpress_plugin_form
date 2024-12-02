// import React from "react";
// import { createRoot } from "react-dom/client";
// import MemenzaFormulaire from "./memenza/MemenzaFormulaire.jsx";

// const pluginBackofficeContainer = document.getElementById(
//   "plugin_backoffice_container",
// );

// const rootAffichagePagePrincipal = createRoot(pluginBackofficeContainer);
// rootAffichagePagePrincipal.render(<MemenzaFormulaire />);

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importer BrowserRouter
import MemenzaFormulaire from "./memenza/MemenzaFormulaire.jsx";  // Votre composant principal

const pluginBackofficeContainer = document.getElementById("plugin_backoffice_container");

const rootAffichagePagePrincipal = createRoot(pluginBackofficeContainer);

// Envelopper votre application avec le Router
rootAffichagePagePrincipal.render(
  <Router>
    <MemenzaFormulaire />
  </Router>
);
