// import React, { useEffect, useState } from "react";
// // import { useSousCat } from "./SousCatContext.jsx";
// import { useSousCat } from "./GestionEtat.jsx";

// const styles = `
// .container-carousel {
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 3rem;
//   position: relative;
//   margin: 50px 0;
// }
// .carousel {
//   max-width: 100%;
//   display: flex;
//   flex-wrap: nowrap;
//   // flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   transform-style: preserve-3d;
//   transform: perspective(1000px);
//   gap: 1rem;
// }

// .carousel .item-container {
//   position: relative;
//   width: 40%;
//   height: 350px;
//   // max-width: 250px;
//   cursor: pointer;
// }
// .carousel .item {
//   border-radius: 10px;
//   box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.5s ease, filter 0.5s ease;
// }
// .carousel .item:hover {
//   filter: brightness(0.8);
//   transform: scale(1.05);
// }
// .carousel .overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.4);
//   color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   opacity: 0;
//   transition: opacity 0.3s ease-in-out;
//   border-radius: 10px;
// }
// .carousel .item-container:hover .overlay {
//   opacity: 1;
// }
// .carousel .overlay h3 {
//   margin: 0;
//   font-size: 1.2rem;
//   color: white;
// }

// .carousel .item-container.selected .overlay {
//   opacity: 1 !important;
//   background: rgba(255, 105, 180, 0.6); /* Fond rose pour la sélection */
// }

// .carousel-ss {
//   max-width: 150%;
//   display: flex;
//   flex-wrap: nowrap;
//   justify-content: center;
//   align-items: center;
//   transform-style: preserve-3d;
//   transform: perspective(1000px);
//   gap: 1rem;
// }
  
// .carousel-ss .item-container-ss {
//   position: relative;
//   width: 40%;
//   height: 350px;
//   max-width: 250px;
//   cursor: pointer;
// }
// .carousel-ss .item-ss {
//   border-radius: 10px;
//   box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.5s ease, filter 0.5s ease;
// }
//   .carousel-ss .item:hover {
//   filter: brightness(0.8);
//   transform: scale(1.05);
// }
// .carousel-ss .overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.4);
//   color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   opacity: 0;
//   transition: opacity 0.3s ease-in-out;
//   border-radius: 10px;
// }
// .carousel-ss .item-container-ss:hover .overlay {
//   opacity: 1;
// }
// .carousel-ss .overlay h3 {
//   margin: 0;
//   font-size: 1.2rem;
//   color: white;
// }

// .carousel-ss .item-container-ss.selected .overlay {
//   opacity: 1 !important;
//   background: rgba(255, 105, 180, 0.6); /* Fond rose pour la sélection */
// }

// `;

// export default function CarouselCategories({ onImageClick, onSousCatClick }) {
//   const [data, setData] = useState([]); // Liste des images dans le carousel
//   const [dataSousCat, setDataSousCat] = React.useState([]);

//   const [selectedId, setSelectedId] = useState(null); // ID de l'image sélectionnée
//   const [selectedIdSs, setSelectedIdSs] = useState(null); // ID de l'image sélectionnée
//   console.log("ID SS CAT : " + selectedIdSs);
  
//   const [error, setError] = React.useState(null);

//   const { setSelectedSousCatId } = useSousCat();

//   const handleSelectSousCat = (id) => {
//     setSelectedSousCatId(id);
//     console.log(id);
//   };

//   // Chargement des images du carousel
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "/wp-json/plugin_memenza/v1/images-categories"
//         );
//         if (!response.ok)
//           throw new Error("Erreur lors de la récupération des données");

//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchSousCatData = async () => {
//       try {
//         const response = await fetch(
//           "/wp-json/plugin_memenza/v1/images_sous-categories"
//         );
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des données");
//         }
//         const result = await response.json();
//         setDataSousCat(result);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchSousCatData();
//   }, []);

//   if (error) {
//     return (
//       <div style={{ color: "red", textAlign: "center" }}>Erreur : {error}</div>
//     );
//   }

//   const filteredSousCat = selectedId
//     ? dataSousCat.filter((item) => item.id_cat === selectedId)
//     : [];

//   return (
//     <>
//       <div className="container-carousel">
//         <div className="carousel">
//           {data.map((item, index) => (
//             // <div className="item-container" key={index}>
//             <div
//   className={`item-container ${selectedId === item.id_cat ? "selected" : ""}`}
//   key={index}
// >
//               <img
//                 className="item"
//                 src={item.chemin_img_cat}
//                 alt={`Image ${item.id_cat}`}
//                 loading="lazy"
//                 onClick={() => {
//                   setSelectedId(item.id_cat);
//                   onImageClick && onImageClick(item);
//                 }}
//               />
//               <div 
//               // className="overlay" 
//               className={`overlay ${selectedId === item.id_cat ? "selected" : ""}`}
//                             onClick={() => {
//                   setSelectedId(item.id_cat);
//                   onImageClick && onImageClick(item);
//                 }}>
//                 <h3>{item.nom_cat || `Catégorie ${index + 1}`}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//         {selectedId && (
//           <div>
//             {/* <h3>Images liées à l'ID sélectionné : {selectedId} & l'images SOUS CATEGORIES est liées à l'ID : {selectedIdSs}</h3> */}
//             <div className="carousel-ss">
//               {filteredSousCat.map((item, index) => (
//                 <div 
//                 // className="item-container" 
//                 className={`item-container-ss ${selectedIdSs === item.id_ss_cat ? "selected" : ""}`}
//                 key={index}>
//                   <img
//                     className="item-ss"
//                     src={item.chemin_img_sscat}
//                     alt={`Image liée ${item.id_image}`}
//                     onClick={() => {
//                       setSelectedIdSs(item.id_ss_cat);
//                       handleSelectSousCat(item.id_ss_cat);
//                     }}
//                   />
//                   <div 
//                   // className="overlay" 
//                   className={`overlay ${selectedIdSs === item.id_ss_cat ? "selected" : ""}`}
//                   onClick={() => {
//                       setSelectedIdSs(item.id_ss_cat);
//                       handleSelectSousCat(item.id_ss_cat);
//                     }}>
//                     <h3>{item.nom_ss_cat || `Sous-Catégorie ${index + 1}`}</h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <style>{styles}</style>
//     </>
//   );
// }



// /////////////////////
// /////////////////////
// /////////////////////
// /////////////////////

import React, { useEffect, useState } from "react";
import { useSousCat } from "./GestionEtat.jsx";

// Styles CSS pour le carousel
const styles = `
.container-carousel {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  margin: 50px 0;
}

.carousel, .carousel-ss {
  max-width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  gap: 1rem;
}

.carousel .item-container, .carousel-ss .item-container-ss {
  position: relative;
  width: 40%;
  height: 350px;
  cursor: pointer;
}

.carousel .item, .carousel-ss .item-ss {
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
}

.carousel .item:hover, .carousel-ss .item-ss:hover {
  filter: brightness(0.8);
  transform: scale(1.05);
}

.carousel .overlay, .carousel-ss .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.carousel .item-container:hover .overlay,
.carousel-ss .item-container-ss:hover .overlay,
.carousel .item-container.selected .overlay,
.carousel-ss .item-container-ss.selected .overlay {
  opacity: 1;
}

.carousel .item-container.selected .overlay,
.carousel-ss .item-container-ss.selected .overlay {
  background: rgba(255, 105, 180, 0.6); /* Rose pour la sélection */
}

.overlay h3 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}
`;

export default function CarouselCategories({ onImageClick, onSousCatClick }) {
  const [data, setData] = useState([]); // Images des catégories
  const [dataSousCat, setDataSousCat] = useState([]); // Images des sous-catégories
  const [selectedId, setSelectedId] = useState(null); // ID catégorie sélectionnée
  const [selectedIdSs, setSelectedIdSs] = useState(null); // ID sous-catégorie sélectionnée
  const [error, setError] = useState(null);

  const { setSelectedSousCatId } = useSousCat();

  // Fonction pour sélectionner une sous-catégorie
  const handleSelectSousCat = (id) => {
    setSelectedSousCatId(id);
    console.log("Sous-catégorie sélectionnée :", id);
    setIsSousCatSelect(true);
  };

  // Chargement des images des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/images-categories");
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories.");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  // Chargement des images des sous-catégories
  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const response = await fetch("/wp-json/plugin_memenza/v1/images_sous-categories");
        if (!response.ok) throw new Error("Erreur lors de la récupération des sous-catégories.");
        const result = await response.json();
        setDataSousCat(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSousCategories();
  }, []);

  // Filtrer les sous-catégories basées sur l'ID de la catégorie sélectionnée
  const filteredSousCat = selectedId
    ? dataSousCat.filter((item) => item.id_cat === selectedId)
    : [];

  // Afficher une erreur si elle est présente
  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>Erreur : {error}</div>;
  }

  return (
    <>
      <div className="container-carousel">
        {/* Carousel des catégories */}
        <div className="carousel">
          {data.map((item) => (
            <div
              key={item.id_cat}
              className={`item-container ${selectedId === item.id_cat ? "selected" : ""}`}
              onClick={() => {
                setSelectedId(item.id_cat);
                onImageClick && onImageClick(item);
              }}
            >
              <img
                className="item"
                src={item.chemin_img_cat}
                alt={item.nom_cat || `Catégorie ${item.id_cat}`}
                loading="lazy"
              />
              <div className="overlay">
                <h3>{item.nom_cat || `Catégorie ${item.id_cat}`}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel des sous-catégories (si une catégorie est sélectionnée) */}
        {selectedId && (
          <div className="carousel-ss">
            {filteredSousCat.map((item) => (
              <div
                key={item.id_ss_cat}
                className={`item-container-ss ${selectedIdSs === item.id_ss_cat ? "selected" : ""}`}
                onClick={() => {
                  setSelectedIdSs(item.id_ss_cat);
                  handleSelectSousCat(item.id_ss_cat);
                }}
              >
                <img
                  className="item-ss"
                  src={item.chemin_img_sscat}
                  alt={item.nom_ss_cat || `Sous-catégorie ${item.id_ss_cat}`}
                />
                <div className="overlay">
                  <h3>{item.nom_ss_cat || `Sous-catégorie ${item.id_ss_cat}`}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{styles}</style>
    </>
  );
}

