import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import MemenzaChoixVisuel from "./MemenzaChoixVisuel.jsx";
import DownloadButton from "./DownloadButton.jsx";
import styled from "styled-components";
import Dropzone from "./DropZone.jsx";

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
  `;

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
  // backgroundColor: "red",
}));

function EtapeVisuel() {
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
        <MemenzaChoixVisuel />
        <FormGrid
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            mx: "auto",
          }}
          size={{ xs: 12, md: 6 }}
          mr={0}
          mb={2}
        >
          <DownloadButton />
          <Dropzone />
        </FormGrid>
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
        <style>{StyleEtapeVisuel}</style>
      </Container>
    </div>
  );
}

export default EtapeVisuel;
