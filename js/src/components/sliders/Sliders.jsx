import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";

const Test = styled(Grid)(() => ({
  color: "blue",
}));

const GlobalStyles = `
.container-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  gap: 3rem;
  flex-flow: column;
  position: relative;
  margin-top: 30px;
  }
  .carousel {
  max-width: 80%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}
.carousel .item {
  width: 20%;
  height: 250px;
  max-width: 250px;
  /* background-color: white; */
  margin: 2px;
  transition: 0.5s;
  object-fit: cover;
  filter: brightness(1);
}
.carousel .item:hover {
  filter: brightness(1);
  transform: translateZ(170px);
}
.carousel .item:hover + * {
  filter: brightness(0.6);
  transform: translateZ(120px) rotateY(25deg);
}
.carousel .item:hover + * + * {
  filter: brightness(0.4);
  transform: translateZ(50px) rotateY(15deg);
}
.carousel .item:has(+ *:hover) {
  filter: brightness(0.6);
  transform: translateZ(120px) rotateY(-25deg);
}
.carousel .item:has(+ * + *:hover) {
  filter: brightness(0.4);
  transform: translateZ(50px) rotateY(-15deg);
}

`;

export default function Sliders() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container
        maxWidth="md"
        sx={{
          backgroundColor: "red",
          width: "100%",
          height: "auto",
          mt: 2,
        }}
      > */}
      <div className="container-carousel">
        <div className="carousel">
          <img
            class="item"
            src="https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/70365/forest-sunbeams-trees-sunlight-70365.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      {/* </Container> */}
      <style>{GlobalStyles}</style>
    </React.Fragment>
  );
}
