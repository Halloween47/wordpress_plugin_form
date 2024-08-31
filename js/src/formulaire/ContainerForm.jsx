import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DownloadButton from "../components/checkout/DownloadButton.jsx";
import Checkout from "../components/checkout/Checkout.js";
import Sliders from "../components/sliders/Sliders.jsx";
import { useState } from "react";

function ContainerForm() {
  const [showCheckout, setShowCheckout] = useState(false);

function handleImgaClick() {
  setShowCheckout(true);
}

  return (
    <React.Fragment>
      <CssBaseline />
      <Sliders onImageClick={handleImgaClick} />
      {showCheckout && <Checkout />}
    </React.Fragment>
  );
}

export default ContainerForm;
