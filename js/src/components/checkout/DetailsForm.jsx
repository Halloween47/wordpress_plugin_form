import React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import MusicPlayer from "./MusicPlayer.jsx";
import DownloadButton from "./DownloadButton.jsx";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function DetailsForm() {
  return (
    <Grid container spacing={1}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="surnoms-affectueux" required>
          Surnoms affectueux
        </FormLabel>
        <OutlinedInput
          id="surnoms-affectueux"
          name="surnoms-affectueux"
          type="name"
          placeholder="Mimoza et Garance"
          autoComplete="Surnoms affectueux"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="chanson-mariee" required>
          Chanson préférée du couple
        </FormLabel>
        <DownloadButton />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="citation" required>
          Citation
        </FormLabel>
        <OutlinedInput
          id="citation"
          name="citation"
          type="name"
          placeholder="Mimoza et Garance"
          autoComplete="Citation"
          required
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}

export default DetailsForm;
