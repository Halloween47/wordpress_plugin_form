import React from 'react';
import { Box, Container } from '@mui/material';
import MemenzaSousCategorieDescription from './MemenzaSousCategorieDescription.jsx';

export default function MemenzaSousCategoriesDetails({ children, reversed }) {
  return (
    <Container
      sx={(theme) => ({
        backgroundColor: 'white',
        position: 'relative',
        // minHeight: '5vh',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        // py: 10,
        // gap: 4,
        // flexDirection: reversed ? 'column-reverse' : 'column',
        // [theme.breakpoints.up('md')]: {
        //   flexDirection: 'row',
        //   gap: 6,
        // },
        // [theme.breakpoints.up('lg')]: {
        //   gap: 12,
        // },
      })}
    >
      
      <Box
        sx={(theme) => ({
            backgroundColor: "violet",
display: 'flex',
justifyContent: "center",
alignItems: 'center',

          width: '100%',
          maxWidth: 600,
          height: '100%',
        //   paddingTop: '86.67%', // Aspect ratio 600/520
          position: 'relative',
          borderRadius: 1,
        //   backgroundColor: theme.palette.background.default,
          overflow: 'hidden',
        //   flexBasis: '50%',
          flexGrow: 1,
        //   [theme.breakpoints.up('md')]: {
        //     height: 'auto',
        //     maxHeight: 520,
        //     minHeight: 400,
        //   },
        })}
      >
        <img
            src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          style={{
            backgroundColor: "orange",
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            // height : "auto",
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={(theme) => ({
            backgroundColor: "black",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '50ch',
          textAlign: 'center',
          px: '20px',
          flexShrink: 999,
          [theme.breakpoints.up('md')]: {
            minWidth: 420,
            alignItems: 'flex-start',
            textAlign: 'initial',
          },
        })}
      >
        {/* {children} */}
        <MemenzaSousCategorieDescription />
      </Box>
    </Container>
  );
}
