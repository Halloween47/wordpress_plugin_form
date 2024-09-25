import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import QRCode from "react-qr-code";
import { Button, Stack, Typography } from "@mui/material";

function ContainerQRCode() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container fixed sx={{ bgcolor: "#008000", width:"100", height: "80vh", marginTop: "10px" }}> */}
      <Container
        fixed
        sx={{ bgcolor: "#172031", width: "100", marginTop: "10px", padding: "20px", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems : "center", borderRadius: "30px" }}
      >
        {/* <Stack spacing={2} useFlexGap> */}
        <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Merci pour votre commande !</Typography>
                
        <Typography variant="body1" sx={{ color: "text.secondary", padding: "20px" }}>
                  Votre numéro de commande est le <strong>&nbsp;#140396</strong>. Nous avons envoyé votre confirmation de commande par e-mail et vous tiendrons au courant une fois expédiée.
                </Typography>
                <QRCode value="http://lestoilesheroiques.fr" />
        <Button
                  variant="contained"
                  sx={{ alignSelf: "center", width: { xs: "100%", sm: "auto" }, margin: "30px 0px"  }}
                >
                  Accédez à mes commandes
                </Button>
                {/* </Stack> */}
      </Container>
    </React.Fragment>
  );
}

export default ContainerQRCode;
