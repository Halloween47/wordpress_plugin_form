import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Sliders() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ height: "200px", backgroundColor: "red" }}>
        <div class="container">
          <div class="carousel">
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
              src="https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=600"
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
          <div class="code-by">
            <h2 class="">
              code by :- <span data="ulhas Johari">ulhas Johari</span>
            </h2>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
