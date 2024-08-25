import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DownloadButton from "./checkout/DownloadButton.jsx";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container maxWidth="sm" sx={{ bgcolor: "#000000", width:"100vw", height: "100vh" }}> */}
      <Container fixed sx={{ bgcolor: "#000000", width:"100", height: "80vh", marginTop: "10px" }}>
        {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} /> */}
      <DownloadButton />
      </Container>
    </React.Fragment>
  );
}
