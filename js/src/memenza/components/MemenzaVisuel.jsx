import {
  Button,
  ButtonBase,
  ButtonGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import React from "react";
import MemenzaSousCategoriesDetails from "./MemenzaSousCategoriesDetails.jsx";
import MemenzaChoixVisuel from "./MemenzaChoixVisuel.jsx";
import styled from "styled-components";
import DownloadButton from "./DownloadButton.jsx";
import Dropzone from "./DropZone.jsx";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
  // backgroundColor: "red",
}));

function MemenzaVisuel() {
  return (
    <div>
      <MemenzaSousCategoriesDetails />
      <MemenzaChoixVisuel />
      <FormGrid size={{ xs: 12, md: 6 }} mr={0} mb={2}>
        <FormLabel htmlFor="chanson-mariee" required>
          Chanson préférée du couple
        </FormLabel>
        <DownloadButton />
        <Dropzone />
      </FormGrid>
      <ButtonGroup
        sx={{
          // backgroundColor: "white",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button color="error">Prévisualiser</Button>
        <Button variant="contained" color="success">
          J'envoie
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MemenzaVisuel;
