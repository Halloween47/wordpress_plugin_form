import { Box, CardMedia } from "@mui/material";
import React from "react";

const MemenzaLogo =
  "https://memenza.laisne.ovh/wp-content/uploads/2024/09/cropped-Memenza_violet.png";

function LogoMemenza() {
  return (
    <Box
      sx={{
        // backgroundColor: "black",
        width: "100%",
        // height: "2%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardMedia
        sx={{
          //   backgroundColor: "orange",
          width: "100%",
          //   width: 200,
          height: 20,
          backgroundSize: "contain",
        }}
        image={MemenzaLogo}
        title="test"
      />
    </Box>
  );
}

export default LogoMemenza;
