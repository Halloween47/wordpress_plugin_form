import React from "react";
import DownloadButton from "./DownloadButton.jsx";
import MemenzaChoixVideo from "./MemenzaChoixVideo.jsx";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

const StyleEtapeVideo = `
.etape-video {
  background-color: black;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.etape-video-intro {
  background-color: yellow;
  width: 100%;
  height: auto;
  display: flex;
  }
.etape-video-intro-img {
  background-color: blue;
  width: 40%;
  }
.etape-video-intro-txt {
  background-color: violet;
  width: 60%;
  }
.etape-video-template {
  background-color: yellow;
  width: 100%;
  height: auto;
}
  .etape-video-upload-video {
  background-color: brown;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
  }
  .etape-video-personnalisation-video {
  background-color: orange;
  width: 100%;
  height: 200px;
  }
  .etape-video-boutons {
  background-color: green;
  width: 100%;
  height: auto;
  }
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function EtapeVideo() {
  return (
    <div className="etape-video">
      <div className="etape-video-intro">
        <div>Intro</div>
        <div className="etape-video-intro-img">test IMG</div>
        <div className="etape-video-intro-txt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam autem
          voluptate quia neque, tempore placeat veritatis omnis, incidunt ab,
          corrupti maxime perspiciatis sint eius debitis dolores dignissimos
          officiis ut dolorem.
        </div>
      </div>
      <div className="etape-video-template">
        <div className="etape-video-template-liste-choix">
          <MemenzaChoixVideo />
        </div>
      </div>
      <div className="etape-video-upload-video">
        <DownloadButton />
      </div>
      <div className="etape-video-personnalisation-video">
        <Typography variant="h4" gutterBottom>
          Personnalisez votre video
        </Typography>
        <div className="etape-video-personnalisation-video-medias">
          <div className="upload-media">
            <Typography variant="p" gutterBottom>
              Media 1 :
            </Typography>
            <Button variant="contained" color="primary">
              Upload votre média
            </Button>
          </div>
          <div className="upload-media">
            <Typography variant="p" gutterBottom>
              Media 2 :
            </Typography>
            <Button variant="contained" color="primary">
              Upload votre média
            </Button>
          </div>
          <div className="upload-media">
            <Typography variant="p" gutterBottom>
              Media 3 :
            </Typography>
            <Button variant="contained" color="primary">
              Upload votre média
            </Button>
            <Divider />
            <div className="upload-media">
              <Typography variant="p" gutterBottom>
                Texte 1 :
              </Typography>
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <Checkbox {...label} defaultChecked />
            </div>
            <div className="upload-media">
              <Typography variant="p" gutterBottom>
                Texte 2 :
              </Typography>
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <Checkbox {...label} defaultChecked />
            </div>
          </div>
        </div>
      </div>
      <div className="etape-video-boutons">
        <ButtonGroup
          sx={{
            // backgroundColor: "white",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button color="error">Prévisualiser</Button>
          <Button variant="contained" color="success">
            J'envoie
          </Button>
        </ButtonGroup>
      </div>
      <style>{StyleEtapeVideo}</style>
    </div>
  );
}

export default EtapeVideo;
