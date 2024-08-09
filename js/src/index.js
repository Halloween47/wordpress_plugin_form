import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import QRCode from "react-qr-code";
import HorizontalLinearStepper from "./HorizontalLinearStepper.jsx";



// ReactDOM.render(<QRCode value="Coucou cherie" />, document.getElementById("react-container"));

const container = document.getElementById('react-container');
const containerStepper = document.getElementById('react-container-stepper');
const root = createRoot(container);
const rootStepper = createRoot(containerStepper);
root.render(<QRCode value="http://lestoilesheroiques.fr" />);
rootStepper.render(<HorizontalLinearStepper />);

//////////////////////////////////////////////////////////////////