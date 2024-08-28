import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DownloadButton from "../components/checkout/DownloadButton.jsx";
import Checkout from "../components/checkout/Checkout.js";
import Sliders from "../components/sliders/Sliders.jsx";

function ContainerForm() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container
         maxWidth="lg" 
        sx={{ bgcolor: "#008000", marginTop: "10px" }}
      > */}
      <Sliders />
      <Checkout />
      {/* </Container> */}
    </React.Fragment>
  );
}

export default ContainerForm;
