// import * as React from "react";
// import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { styled } from "@mui/material";
// import PopupUpload from "./PopupUpload.jsx";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function DownloadButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {/* {/* // <Button
    //   component="label"
    //   role={undefined}
    //   variant="contained"
    //   tabIndex={-1}
    //   startIcon={<CloudUploadIcon />}
    // >
    //   Uploader son propre visuel
    // </Button> */}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Uploader son propre visuel
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
    </div>
  );
}
export default DownloadButton;
