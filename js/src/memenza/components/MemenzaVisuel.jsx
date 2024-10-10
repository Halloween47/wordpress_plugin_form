import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import MemenzaSousCategoriesDetails from './MemenzaSousCategoriesDetails.jsx'

function MemenzaVisuel() {
  return (
    <div>
        <h1>Memenza Visuel</h1>
        <ButtonGroup>
        <Button
                color="inherit"
                sx={{ mr: 1 }}
              >
                Bouton 1
              </Button>
              <Button
                color="inherit"
                sx={{ mr: 1 }}
              >
                Bouton 2
              </Button>
              <Button
                color="inherit"
                sx={{ mr: 1 }}
              >
                Bouton 3
              </Button>
        </ButtonGroup>
        <MemenzaSousCategoriesDetails />
    </div>
  )
}

export default MemenzaVisuel