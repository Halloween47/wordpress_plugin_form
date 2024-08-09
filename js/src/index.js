import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import QRCode from "react-qr-code";


// ReactDOM.render(<QRCode value="Coucou cherie" />, document.getElementById("react-container"));

const container = document.getElementById('react-container');
const root = createRoot(container);
root.render(<QRCode value="http://lestoilesheroiques.fr" />);

//////////////////////////////////////////////////////////////////