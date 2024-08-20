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

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
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
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="date-du-mariage" required>
          Date du mariage
        </FormLabel>
        <BasicDateTimePicker />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="lieu-du-mariage" required>
          Lieu du mariage
        </FormLabel>
        <CountrySelect />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="photo-des-maries" required>
          Photo des mariés
        </FormLabel>
        <DropZone />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="photo-des-maries" required>
          Photo des mariés
        </FormLabel>
        <CountrySelect />
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
    </Grid>
  );
}
