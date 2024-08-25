import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import QRCode from "react-qr-code";

function ContainerQRCode() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container fixed sx={{ bgcolor: "#008000", width:"100", height: "80vh", marginTop: "10px" }}> */}
      <Container
        fixed
        sx={{ bgcolor: "#008000", width: "100", marginTop: "10px" }}
      >
        <QRCode value="http://lestoilesheroiques.fr" />
      </Container>
    </React.Fragment>
  );
}

export default ContainerQRCode;
