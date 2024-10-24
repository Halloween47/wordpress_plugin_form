import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  TextField,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import MemenzaChoixVisuel from "./MemenzaChoixVisuel.jsx";
import DownloadButton from "./DownloadButton.jsx";
import styled from "styled-components";
import Dropzone from "./DropZone.jsx";
import PopupUpload from "./PopupUpload.jsx";
import PopupPreview from "./PopupPreview.jsx";

const StyleEtapeVisuel = `
.etape-visuel {
    background-color: #f5f5f5;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: black;
  }
  .etape-visuel-intro {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }  
    .etape-visuel-intro-img {
    background-color: #e0e0e0;
    width: 40%;
    border-radius: 8px;
  }
    .etape-visuel-intro-txt {
    width: 50%;
    color: #333;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
    .etape-video-personnalisation-visuel {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  `;

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
  // backgroundColor: "red",
}));

const images = [
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
];

function EtapeVisuel() {
  const [showTextCustomVisuel, setShowTextCustomVisuel] = useState(false);

  const handleVisuelClickCustom = () => {
    console.log("APPARITION ZONE TEXTE ");
    setShowTextCustomVisuel(true);
  };
  return (
    <div>
      <Container className="etape-visuel" maxWidth="lg">
        <Box className="etape-visuel-intro">
          <Box className="etape-visuel-intro-img">
            <img
              src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>
          <Box className="etape-visuel-intro-txt">
            <Typography variant="h4" color="textPrimary">
              Bienvenue dans la partie Visuel
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              autem voluptate quia neque, tempore placeat veritatis omnis,
              incidunt ab, corrupti maxime perspiciatis sint eius debitis
              dolores dignissimos officiis ut dolorem.
            </Typography>
          </Box>
        </Box>
        {/* <MemenzaChoixVisuel /> */}
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            bgcolor: "#f5f5f5",
            // minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
            <Typography variant="h5" color="textSecondary">
              Choisissez votre visuel{" "}
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {images.map((src, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                  //   onClick={() => console.log(`Image ${index + 1} clicked`)}
                  onClick={handleVisuelClickCustom}
                >
                  <CardMedia
                    component="img"
                    image={src}
                    alt={`Visuel ${index + 1}`}
                    sx={{
                      height: 200,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      fontWeight="bold"
                    >
                      Visuel {index + 1}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description courte pour expliquer l'intérêt de ce visuel.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 2 }}> OU </Divider>
          <FormGrid
            sx={{
              //   backgroundColor: "#000000",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
            size={{ xs: 12, md: 6 }}
            mr={0}
            mb={2}
          >
            {/* <DownloadButton /> */}
            {/* <Dropzone /> */}
            <PopupUpload />
          </FormGrid>
        </Box>

        {showTextCustomVisuel && (
          <Box className="etape-video-personnalisation-visuel">
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
        )}
        <ButtonGroup
          sx={{
            // backgroundColor: "white",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <PopupPreview />
          <Button variant="contained" color="success">
            J'envoie
          </Button>
        </ButtonGroup>
        <style>{StyleEtapeVisuel}</style>
      </Container>
    </div>
  );
}

export default EtapeVisuel;
