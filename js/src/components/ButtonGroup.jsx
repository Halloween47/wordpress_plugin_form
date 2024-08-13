import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {

        // Fonction appelée lorsque le bouton est cliqué
        const handleClick = (event) => {

          const buttonText = event.target.textContent;

          console.log('Texte du bouton cliqué :', buttonText);

          if (buttonText === 'Three') {
            alert('VIVA L\'ALGERIE');
          }
          
        }

    return (
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={handleClick}>One</Button>
        <Button onClick={handleClick}>Two</Button>
        <Button onClick={handleClick}>Three</Button>
      </ButtonGroup>
    );
  }