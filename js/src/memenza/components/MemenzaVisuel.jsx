import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import MemenzaSousCategoriesDetails from "./MemenzaSousCategoriesDetails.jsx";
import MemenzaChoixVisuel from "./MemenzaChoixVisuel.jsx";

function MemenzaVisuel() {
  return (
    <div>
      <MemenzaSousCategoriesDetails />
      <MemenzaChoixVisuel />
    </div>
  );
}

export default MemenzaVisuel;
