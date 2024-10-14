import { Typography } from "@mui/material";
import React from "react";

function EtapeValidation() {
  return (
    <div>
      <Typography sx={{ mt: 2, mb: 1 }}>Validation </Typography>
      <div className="validation-recap">
        <Typography sx={{ mt: 2, mb: 1 }}>Recap </Typography>
        <div className="validation-recap__visuel">
          <img src="" alt="" />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium consectetur culpa laborum, eius non, esse quasi rerum
            quis, hic nemo molestiae officia molestias nostrum consequatur
            nesciunt velit id doloribus. Commodi!
          </Typography>
        </div>
        <div className="validation-recap__video">
          <Typography>
            === VIDEO === Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Praesentium consectetur culpa labor
          </Typography>
        </div>
      </div>
      <div className="validation-paiement">validation paiement</div>
      <div className="validation-recap-paiement">validation recap paiement</div>
    </div>
  );
}

export default EtapeValidation;
