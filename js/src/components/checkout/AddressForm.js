import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
// import Grid from '@mui/material/Grid2';
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import BasicDateTimePicker from "../DatePicker.jsx";
import CountrySelect from "../CountrySelect.jsx";
import DropZone from "../DropZone.jsx";

import DownloadButton from "./DownloadButton.jsx";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
  // backgroundColor: "red",
}));

export default function AddressForm() {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        // backgroundColor: "green",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <FormGrid size={{ xs: 12, md: 12, lg: 12 }} mr={0} mb={4}>
        <FormLabel htmlFor="prenoms-des-maries" required>
          Prénoms des mariés
        </FormLabel>
        <OutlinedInput
          id="prenoms-des-maries"
          name="prenoms-des-maries"
          type="name"
          placeholder="Marc & Lisa"
          autoComplete="prenoms des maries"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 12 }} mr={0} mb={2}>
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

      <FormGrid size={{ xs: 12, md: 6 }} mr={0} mb={2}>
        <FormLabel htmlFor="lieu-du-mariage" required label={'margin="normal"'}>
          Lieu du mariage
        </FormLabel>
        <OutlinedInput
          id="lieu-du-mariage"
          name="lieu-du-mariage"
          type="name"
          placeholder="Versailles"
          autoComplete="Lieu du mariage"
          required
          size="small"
        />
        {/* <CountrySelect /> */}
      </FormGrid>
      <br></br>

      <FormGrid size={{ xs: 12, md: 6 }} mr={0} mb={2}>
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
      <FormGrid size={{ xs: 12, md: 12 }} mr={0} mb={2}>
        <FormLabel
          htmlFor="date-du-mariage"
          required
          md={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Date du mariage
        </FormLabel>
        <BasicDateTimePicker />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} mr={0} mb={2}>
        <FormLabel htmlFor="photo-des-maries" required>
          Photo des mariés
        </FormLabel>
        <DropZone />
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 6 }} mr={0} mb={2}>
        <FormLabel htmlFor="chanson-mariee" required>
          Chanson préférée du couple
        </FormLabel>
        <DownloadButton />
      </FormGrid>
    </Grid>
  );
}
