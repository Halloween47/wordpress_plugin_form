import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const products = [
  {
    name: "Prénoms des mariés",
    desc: "Versailles",
    price: "Free",
  },
  {
    name: "Lieu du mariage",
    desc: "Versailles",
    price: "Free",
  },
  {
    name: "Date du mariage",
    desc: "Versailles",
    price: "Free",
  },
  {
    name: "Surnoms affectueux",
    desc: "Versailles",
    price: "Free",
  },
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
