// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Divider,
//   TextField,
//   Checkbox,
// } from "@mui/material";
// import React, { useState } from "react";
// import styled from "styled-components";
// import PopupUpload from "../memenza/components/PopupUpload.jsx";
// import PopupPreview from "../memenza/components/PopupPreview.jsx";
// import TestGeneration from "../memenza/components/TestGeneration.jsx";
// import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";
// import ImageCustomization from "../memenza/components/ImageCustomizer.jsx";
// import TextCustomization from "../memenza/components/TextCustomizer.jsx";

// import CheckCircleIcon from '@mui/icons-material/CheckCircle';


// const StyleEtapeVisuel = `
// .etape-visuel {
//     background-color: #f5f5f5;
//     width: 100%;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
//     color: black; 
//   }
//   .etape-visuel-intro {
//     display: flex;
//     gap: 20px;
//     margin-bottom: 20px;
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }  
//   //   .etape-visuel-intro-img {
//   //   background-color: #e0e0e0;
//   //   width: 40%;
//   //   height: 100%;
//   //   border-radius: 8px;
//   // }
//   .etape-visuel-intro-img {
//     background-color: #e0e0e0;
//     width: 40%;
//     border-radius: 8px;
//   }
//     .etape-visuel-intro-txt {
//     // background-color: green;
//     width: 50%;
//     color: #333;
//     font-size: 16px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: flex-start;
//   }
//     .etape-video-personnalisation-visuel {
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     margin-bottom: 20px;
//   }

//   ////////////////////////////////
//   ////////////////////////////////
//   .selected-card {
//   position: relative;
//   overflow: hidden;
// }

// .selected-card::after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(255, 105, 180, 0.6); /* Overlay rose */
//   border-radius: 8px;
//   opacity: 0;
//   transition: opacity 0.3s ease-in-out;
//   z-index: 1;
// }

// .selected-card:hover::after,
// .selected-card.selected::after {
//   opacity: 1;
//   z-index: 0;
//   }
  
//   .selected-card.selected::after {
//     opacity: 1;
//     z-index: 0;
// }
//     .selected-card.selected .check-icon {
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   color: green;
//   font-size: 2rem;
//   z-index: 3;


//   ////////////////////////////////
//   ////////////////////////////////
//   `;



// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "space-between",
// }));

// const images = [
//   "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=500&q=80",
//   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=500&q=80",
// ];
// function EtapeVisuel() {
//   ////////////////////////
//   ////////////////////////
//   const [selectedVisuelId, setSelectedVisuelId] = useState(null);
//   const [showTextCustomVisuel, setShowTextCustomVisuel] = useState(false);
//   const [imagesVisuels, setImagesVisuels] = React.useState([]);
  
//   const [imageClicked, setImageClicked] = useState(false);
//   // const [imageFields, setImageFields] = useState([
//   //   {
//   //     name: "image1",
//   //     defaultSize: { width: 1806, height: 1806 },
//   //     x: 0,
//   //     y: 0,
//   //     defaultFile: "visuels/cadres/templates/alexandre_template.png",
//   //     customizable: false,
//   //   },
//   //   {
//   //     name: "image2",
//   //     defaultSize: { width: 1806, height: 1806 },
//   //     x: 0,
//   //     y: 0,
//   //     defaultFile: "visuels/cadres/templates/alexandre_template.png",
//   //     customizable: false,
//   //   },
//   // ]);


//   console.log("ID sélectionné : ", selectedVisuelId + " id du modele CADRE");
  
//   ////////////////////////
//   ////////////////////////

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "/wp-json/plugin_memenza/v1/images_visuel",
//         );
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des données");
//         }
//         const result = await response.json();
//         console.log("ICIC LA R2PONSE DE LA ROUTE : " + JSON.stringify(result));
        
//         setImagesVisuels(result);
//       } catch (error) {
//         setError(error.message);
//       } 
//     };

//     fetchData();
//   }, []);

//   // const handleVisuelClickCustom = () => {
//   //   setShowTextCustomVisuel(true);
//   //   setImageClicked(true);
//   // };
//   const handleVisuelClickCustom = (id) => {
//     setSelectedVisuelId(id); // Stocke l'ID de l'élément sélectionné
//     setShowTextCustomVisuel(true); // Affiche les options de personnalisation
//     setImageClicked(true); // Confirme que l'utilisateur a cliqué

    

//   };
  

//   const { selectedSousCatId } = useSousCat();

// const imagesVisuelsFitred =  imagesVisuels.filter((item) => {
//   return item.id_ss_cat === selectedSousCatId;
// })
// // console.log("CONTENU DU TABLEAU FILTRER : " + JSON.stringify(imagesVisuelsFitred));


//   return (
//     <div>
//       <Container className="etape-visuel" maxWidth="lg">
//         {/* <Box className="etape-visuel-intro" sx={{ height: "50vh" }}> */}
//         <Box className="etape-visuel-intro">
//           <Box className="etape-visuel-intro-img">
//             <img
//               // src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
//               src="https://memenza.fr/visuels/personnaliser.png"
//               alt=""
//               style={{ width: "100%",
//                 height: "100%",
//                 borderRadius: "8px",
//                 objectFit: "cover", }}
//             />
//           </Box>
//           <Box className="etape-visuel-intro-txt" sx={{ p: 4 }}>
//             {/* <Typography variant="h4" color="textPrimary" sx={{ mb: 1 }}> */}
//             <Typography variant="h4" color="textPrimary"sx={(theme) => ({
//     mb: 1,
//     fontSize: {
//       xs: '1.5rem',  // petite taille d'écran
//       sm: '2rem',    // taille intermédiaire
//       md: '2.5rem',  // écran moyen
//       lg: '3rem',    // grand écran
//     },
//   })}>
//             Personnaliser le visuel 
//             </Typography>
//             {/* <Typography variant="body1" color="textPrimary" sx={{ pr: 3 }}> */}
//             <Typography variant="body1" color="textPrimary" sx={(theme) => ({
//     pr: 3,
//     fontSize: {
//       xs: '0.875rem', // petite taille d'écran
//       sm: '1rem',     // taille intermédiaire
//       md: '1.125rem', // écran moyen
//       lg: '1.25rem',  // grand écran
//     },
//   })}>
//             Vous pouvez utiliser les modèles Memenza ou directement uploader votre visuel (créé par exemple avec Canva). La taille d’image attendue est de 1086x1086px.
//             </Typography> 
//           </Box> 
//         </Box>
//         <Box
//           sx={{
//             textAlign: "center",
//             p: 4,
//             bgcolor: "#f5f5f5",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
//             <Typography variant="h5" color="textSecondary">
//             Choisissez votre modèle
//             </Typography>
//           </Box>

//           <Grid container spacing={3} justifyContent="center">
//             {/* {imagesVisuels.map((champ, index) => (
//               <Grid item key={index}>
//                 <Typography variant="h5" color="textSecondary">
//               {champ.nom_modele}
//             </Typography>
//             </Grid>
//             ))} */}

//             {/* {images.map((src, index) => ( */}
//             {/* {Array.isArray(imagesVisuels) && imagesVisuels.length > 0 ? (
//               imagesVisuels.map((element, index) => (
//                 <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       image={element.img_modele}
//                       alt={`Visuel ${index + 1}`}
//                     />
//                     <CardContent>
//                       <Typography>{element.nom_modele}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))
//             ) : (
//               <Typography>Aucune image disponible.</Typography>
//             )} */}

//             {/* {imagesVisuels.map((item, index) => ( */}
//             {imagesVisuelsFitred.map((item, index) => (
//               <>
//                 {/* <Typography>{JSON.stringify(item.nom_modele)}</Typography> */}
//                 {/* <Grid item key={index} xs={12} sm={6} md={4} lg={3}> */}
//                 <Grid item key={index} xs={12} sm={6} md={5} lg={4}>
                    
//                   {/* <Card onClick={handleVisuelClickCustom}> */}
//                   <Card
//                   // className={`selected-card ${selectedVisuelId === item.id_ss_cat ? "selected" : ""}`}
//                   className={`selected-card ${selectedVisuelId === item.id_modele_cadre ? "selected" : ""}`}
                  
//                   /////////////////
//                   /////////////////
//                   //  onClick={handleVisuelClickCustom} 
//                    onClick={() => handleVisuelClickCustom(item.id_ss_cat)}
//                   //  onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
//                   //  onClick={() => console.log("ID sélectionné : ", item.id_modele_cadre)}
//                   //  onClick={() => console.log("ID sélectionné : ", item.id_ss_cat)}
//                   //  onClick={() => console.log("ID sélectionné : ", item.id_modele_cadre)}

//                   sx={{transform: 'scale(1.1)', // Agrandit légèrement le Card
//                     transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animation fluide
//                     padding: '20px', // Ajoute de l'espace interne
//                     '&:hover': {
//                       transform: 'scale(1.15)', // Agrandit encore plus au survol
//                       boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Ombre au survol
//                     },
//                   }}
//     >
//                     <CardMedia
//                       component="img"
//                       image={item.img_modele}
//                       // image="/visuels/cadres/templates/alexandre_template.png"
//                       alt={`Visuel ${index + 1}`}
//                     />
                    
//                     <CardContent>
//                       <Typography>{item.nom_modele}</Typography>
//                       {/* Icône de check lorsque l'élément est sélectionné */}
//       {selectedVisuelId === item.id_modele_cadre && (
//         <CheckCircleIcon  className="check-icon" 
//           sx={{
//             position: 'absolute',
//             bottom: '10px',
//             right: '10px',
//             color: 'green',
//             fontSize: '2rem',
//             zIndex :"3",
//           }}
//         />
//       )}
//                     </CardContent>
                    
//                   </Card>
                  
//                 </Grid>
                

//               </>
//             ))}
//           </Grid>
          
          
//         </Box>

//         {showTextCustomVisuel && (
//           // <VisuelFormTemplate1 />
//           <>
//           <TestGeneration />
//           {/* <ImageCustomization /> */}
//           {/* <TextCustomization /> */}
//           </>

          
//         )}

//         {/* {!imageClicked && ( */}
//   <>
//   <Box
//           sx={{
//             textAlign: "center",
//             p: 4,
//             bgcolor: "#f5f5f5",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//     <Divider sx={{ mt: 2 }}> OU </Divider>
//     <FormGrid
//       sx={{
//         width: "50%",
//         display: "flex",
//         justifyContent: "center",
//         mt: 2,
//       }}
//       size={{ xs: 12, md: 6 }}
//       mr={0}
//       mb={2}
//     >
//       {/* <PopupUpload updateImageFields={setImageFields} /> */}
//       <PopupUpload />
//     </FormGrid>
//     </Box>
//   </>
// {/* )} */}

        
//         {/* <ButtonGroup
//           sx={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "flex-end",
//           }}
//         >
//           <PopupPreview />
//           <Button variant="contained" color="success">
//             J'envoie
//           </Button>
//         </ButtonGroup> */}
//         {/* <style>{StyleEtapeVisuel}</style> */}
//         <style>{StyleEtapeVisuel}</style>
//       </Container>
//     </div>
//   );
// }

// export default EtapeVisuel;

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PopupUpload from "../memenza/components/PopupUpload.jsx";
import TestGeneration from "../memenza/components/TestGeneration.jsx";
import { useSousCat } from "../componentsMemenza/GestionEtat.jsx";

// Styled Components
const FormGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "space-between",
});

const StyleEtapeVisuel = styled.div`
  .selected-card {
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 105, 180, 0.6);
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 1;
    }

    &.selected::after {
      opacity: 1;
      z-index: 0;
    }

    .check-icon {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: green;
      font-size: 2rem;
      z-index: 3;
    }
  }
`;

// Composant VisuelCard
const VisuelCard = ({ item, isSelected, onClick }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card
      className={`selected-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      sx={{
        transform: 'scale(1.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        padding: '20px',
        '&:hover': {
          transform: 'scale(1.15)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={item.img_modele}
        alt={item.nom_modele}
      />
      <CardContent>
        <Typography>{item.nom_modele}</Typography>
        {isSelected && (
          <CheckCircleIcon className="check-icon" />
        )}
      </CardContent>
    </Card>
  </Grid>
);

const EtapeVisuel = () => {
  const { selectedSousCatId } = useSousCat();
  const [selectedVisuelId, setSelectedVisuelId] = useState(null);
  // console.log("SELECTEDVISUELID : " + JSON.stringify(selectedVisuelId)); 
  const [imagesVisuels, setImagesVisuels] = useState([]);
  // console.log("TOUS LES RESULTATS DU FETCH image_visuels : " + JSON.stringify(imagesVisuels));
  const [showTextCustomVisuel, setShowTextCustomVisuel] = useState(false);  
  const tableauFiltrePourVignette = imagesVisuels.filter(item => item.id_ss_cat === selectedSousCatId);
  // console.log("TOUS LES RESULTATS DU FILTRES image_visuels : " + JSON.stringify(tableauFiltrePourVignette));



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/images_visuel");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        const result = await response.json();
        setImagesVisuels(result);
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleVisuelClickCustom = (id) => {
    setSelectedVisuelId(id);
    setShowTextCustomVisuel(true);
    const filtreSelonVignetteSelectionne = tableauFiltrePourVignette.filter(item => item.id_modele_cadre === id);
    console.log("RESULTAT DU CLIC VIGNETTES : " + selectedVisuelId + " " + id + " " +
      JSON.stringify(filtreSelonVignetteSelectionne));
  
  };


  return (
    <Box sx={{ textAlign: "center", p: 4, bgcolor: "#f5f5f5" }}>
      <Box sx={{ mb: 4, py: 2, borderBottom: "2px solid #3f51b5" }}>
        <Typography variant="h5" color="textSecondary">Choisissez votre modèle</Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {tableauFiltrePourVignette.map((item, index) => (
          <VisuelCard
            key={index}
            item={item}
            isSelected={selectedVisuelId === item.id_modele_cadre}
            onClick={() => handleVisuelClickCustom(item.id_modele_cadre)}
          />
        ))}
      </Grid>

      {showTextCustomVisuel && <TestGeneration />}

      <Divider sx={{ mt: 2 }}>OU</Divider>
      <FormGrid sx={{ width: "50%", mt: 2 }}>
        <PopupUpload />
      </FormGrid>

      <StyleEtapeVisuel />
    </Box>
  );
};

export default EtapeVisuel;
