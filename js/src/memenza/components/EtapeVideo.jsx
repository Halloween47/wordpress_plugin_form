import React, { useState } from "react";
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
  styled,
} from "@mui/material";

import { purple } from '@mui/material/colors';

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
    width: 50%;
    color: #333;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .etape-video-template {
  display: flex;
  flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .etape-video-upload-video {
    display: flex;
    justify-content: center;
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

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));



function EtapeVideo() {
  const [showTextCustomVideo, setShowTextCustomVideo] = useState(false);
  const handleVideoClickCustom = () => {
    console.log("APPARITION ZONE TEXTE ");
    setShowTextCustomVideo(true);
    
      };
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
        <Typography variant="h4" color="textPrimary">
            Bienvenue dans la partie Vidéo
          </Typography>
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
        {/* <ColorButton variant="contained" onClick={handleVideoClickCustom}>Je choisi ce template</ColorButton> */}
        <Box sx={{ display: "flex", justifyContent: "center"}}>

        <ColorButton variant="contained" sx={{mb: 2}} onClick={handleVideoClickCustom}>Je choisi ce template</ColorButton>
        </Box>

        <Root>
        <Divider> OU </Divider>
        <Box className="etape-video-upload-video">
        <DownloadButton />
      </Box>
        </Root>
      </Box>
      {showTextCustomVideo && 
      <Box className="etape-video-personnalisation-video">
      
      <Typography variant="h5" gutterBottom>
        Personnalisez votre vidéo
      </Typography>
      <Divider> ICI VOTRE TEXTE </Divider>
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
      }

      

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
