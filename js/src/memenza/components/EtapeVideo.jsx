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
  Box,
  Container,
} from "@mui/material";

const StyleEtapeVideo = `
  .etape-video {
    background-color: #f5f5f5;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: black;
  }
  .etape-video-intro {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .etape-video-intro-img {
    background-color: #e0e0e0;
    width: 40%;
    border-radius: 8px;
  }
  .etape-video-intro-txt {
    width: 60%;
    color: #333;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .etape-video-template {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .etape-video-upload-video {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .etape-video-personnalisation-video {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  .upload-media {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  .etape-video-boutons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;

const WeddingImage = [
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
];

function EtapeVideo() {
  return (
    <Container className="etape-video" maxWidth="lg">
      <Box className="etape-video-intro">
        <Box className="etape-video-intro-img">
          <img
            src={WeddingImage}
            alt="Wedding"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
        <Box className="etape-video-intro-txt">
          <Typography variant="body1" color="textPrimary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            autem voluptate quia neque, tempore placeat veritatis omnis,
            incidunt ab, corrupti maxime perspiciatis sint eius debitis dolores
            dignissimos officiis ut dolorem.
          </Typography>
        </Box>
      </Box>

      <Box className="etape-video-template">
        <MemenzaChoixVideo />
      </Box>

      <Box className="etape-video-upload-video">
        <DownloadButton />
      </Box>

      <Box className="etape-video-personnalisation-video">
        <Typography variant="h5" gutterBottom>
          Personnalisez votre vidéo
        </Typography>

        <Box className="etape-video-personnalisation-video-medias">
          {[1, 2, 3].map((media) => (
            <Box className="upload-media" key={media}>
              <Typography variant="body2">Média {media} :</Typography>
              <Button variant="contained" color="primary">
                Upload votre média
              </Button>
            </Box>
          ))}
          <Divider style={{ margin: "20px 0" }} />
          {[1, 2].map((text) => (
            <Box className="upload-media" key={`text-${text}`}>
              <Typography variant="body2">Texte {text} :</Typography>
              <TextField
                id={`filled-basic-${text}`}
                label={`Text ${text}`}
                variant="filled"
                size="small"
              />
              <Checkbox
                defaultChecked
                {...{ inputProps: { "aria-label": "Checkbox demo" } }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="etape-video-boutons">
        <ButtonGroup>
          <Button color="error">Prévisualiser</Button>
          <Button variant="contained" color="success">
            J'envoie
          </Button>
        </ButtonGroup>
      </Box>

      <style>{StyleEtapeVideo}</style>
    </Container>
  );
}

export default EtapeVideo;
