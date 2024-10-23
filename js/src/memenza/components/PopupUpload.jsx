import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Paper } from "@mui/material";

////////////////////////////////////
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
////////////////////////////////////

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StylesPopupUpload = `
.zone-haut {
display: flex;
margin-bottom : 10px;
},
.zone-bas {
 display: flex;
},
`;

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

function PopupUpload() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dense, setDense] = React.useState(false);

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
      >
        Uploader son propre visuel
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="zone-haut">
            <Box
              sx={{
                backgroundColor: "grey",
                width: "50%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                "& > :not(style)": {
                  width: 128,
                  height: 128,
                },
              }}
            >
              <Paper elevation={24} square={false} />
            </Box>
            <Box
              className="popup-upload_zone-infos-qualite"
              sx={{
                // backgroundColor: "#000000",
                // width: "70%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignItems: "center",
                m: 2,
                "& > :not(style)": {
                  // width: 228,
                  width: "100%",
                  // height: 128,
                },
              }}
            >
              <Typography variant="h6" color="textPrimary">
                Explications
              </Typography>
              <List dense={dense}>
                {generate(
                  <ListItem disablePadding={true}>
                    <ListItemText
                      primary="Infos qualité media"
                      secondary={"Critères"}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>,
                )}
              </List>
            </Box>
          </div>
          <div className="zone-bas">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ textDecoration: "underline" }}
              >
                J'envoie :
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Parcourir
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
              <Button component="label" variant="contained">
                OK
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
      <style>{StylesPopupUpload}</style>
    </div>
  );
}
export default PopupUpload;
