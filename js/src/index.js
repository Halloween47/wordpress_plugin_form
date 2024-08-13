import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import QRCode from "react-qr-code";
import HorizontalLinearStepper from "./HorizontalLinearStepper.jsx";
import BasicButtonGroup from "./components/ButtonGroup.jsx";
import SimpleContainer from "./components/Container.jsx";



// ReactDOM.render(<QRCode value="Coucou cherie" />, document.getElementById("react-container"));

const container = document.getElementById('react-container');
const root = createRoot(container);
root.render(<QRCode value="http://lestoilesheroiques.fr" />);

const containerStepper = document.getElementById('react-container-stepper');
const rootStepper = createRoot(containerStepper);
rootStepper.render(<HorizontalLinearStepper />);

const containerButtonGroup = document.getElementById('react-container-buttongroup');
const rootButtonGroup = createRoot(containerButtonGroup);
rootButtonGroup.render(<BasicButtonGroup />);

const containerPresentation = document.getElementById('react-container-presentation');
const rootPresentation = createRoot(containerPresentation);
rootPresentation.render(<SimpleContainer />);

//////////////////////////////////////////////////////////////////