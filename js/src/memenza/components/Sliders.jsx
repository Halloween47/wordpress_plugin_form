// import React, { useEffect, useState } from "react";
// import { useSousCat } from "./SousCatContext.jsx";

// const styles = `
// .container-carousel {
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   gap: 3rem;
//   position: relative;
//   margin: 50px 0;
// }
// .carousel {
//   max-width: 80%;
//   display: flex;
//   flex-wrap: nowrap;
//   justify-content: center;
//   align-items: center;
//   transform-style: preserve-3d;
//   transform: perspective(1000px);
// }
// .carousel .item {
//   border-radius: 10px;
//   box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
//   transition: transform 0.5s ease, filter 0.5s ease;
//   width: 30%;
//   height: 350px;
//   max-width: 250px;
//   margin: 2px;
//   object-fit: cover;
//   cursor: pointer;
// }
// .carousel .item:hover {
//   filter: brightness(1.1);
//   transform: translateZ(170px) scale(1.05);
//   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
// }
// `;

// export default function Sliders({ onImageClick, onSousCatClick }) {
//   const [data, setData] = useState([]); // Liste des images dans le carousel
//   const [dataSousCat, setDataSousCat] = React.useState([]);

//   const [selectedId, setSelectedId] = useState(null); // ID de l'image sélectionnée
//   const [selectedIdSs, setSelectedIdSs] = useState(null); // ID de l'image sélectionnée
//   const [error, setError] = useState(null);

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
//           "/wp-json/plugin_memenza/v1/images-categories",
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

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "/wp-json/plugin_memenza/v1/images_sous-categories",
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

//     fetchData();
//   }, []);

//   if (error) {
//     return (
//       <div style={{ color: "red", textAlign: "center" }}>Erreur : {error}</div>
//     );
//   }

//   const filteredSousCat = selectedId
//     ? dataSousCat.filter((item) => item.id_cat === selectedId)
//     : [];
    
//     function test() {

//       console.log(filteredSousCat);
//       const nouveau = filteredSousCat.filter((item) => item.id_ss_cat === "9");
//       console.log(nouveau);
      
//     }

//   return (
//     <>
//       <div className="container-carousel">
//         <div className="carousel">
//           {data.map((item, index) => (
//             <img
//               key={index}
//               className="item"
//               src={item.chemin_img_cat}
//               alt={`Image ${item.id_cat}`}
//               onClick={() => {
//                 setSelectedId(item.id_cat);
//                 onImageClick && onImageClick(item); // Notifier le parent si une fonction de clic est passée
//               }}
//             />
//           ))}
//         </div>
//         {selectedId && (
//           <div>
//             <h3>Images liées à l'ID sélectionné : {selectedId}</h3>
//             <div className="carousel">
//               {/* {dataSousCat.map((item, index) => ( */}
//               {filteredSousCat.map((item, index) => (
//                 <img
//                   key={index}
//                   className="item"
//                   src={item.chemin_img_sscat}
//                   alt={`Image liée ${item.id_image}`}
//                   onClick={() => {
//                     setSelectedIdSs(item.id_ss_cat);
//                     // console.log(item.id_ss_cat);
//                     handleSelectSousCat(item.id_ss_cat)
//                   }
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <style>{styles}</style>
//     </>
//   );
// }


/////////////////////////////
/////////////////////////////
import React, { useEffect, useState } from "react";
import { useSousCat } from "./SousCatContext.jsx";

const styles = `
.container-carousel {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  margin: 50px 0;
}
.carousel {
  max-width: 80%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  gap: 1rem;
}
.carousel .item-container {
  position: relative;
  width: 30%;
  height: 350px;
  max-width: 250px;
  cursor: pointer;
}
.carousel .item {
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
}
.carousel .item:hover {
  filter: brightness(0.8);
  transform: scale(1.05);
}
.carousel .overlay {
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
.carousel .item-container:hover .overlay {
  opacity: 1;
}
.carousel .overlay h3 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}
`;

export default function Sliders({ onImageClick, onSousCatClick }) {
  const [data, setData] = useState([]); // Liste des images dans le carousel
  const [dataSousCat, setDataSousCat] = React.useState([]);

  const [selectedId, setSelectedId] = useState(null); // ID de l'image sélectionnée
  const [selectedIdSs, setSelectedIdSs] = useState(null); // ID de l'image sélectionnée
  const [error, setError] = React.useState(null);

  const { setSelectedSousCatId } = useSousCat();

  const handleSelectSousCat = (id) => {
    setSelectedSousCatId(id);
    console.log(id);
  };

  // Chargement des images du carousel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/wp-json/plugin_memenza/v1/images-categories"
        );
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des données");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSousCatData = async () => {
      try {
        const response = await fetch(
          "/wp-json/plugin_memenza/v1/images_sous-categories"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        setDataSousCat(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSousCatData();
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>Erreur : {error}</div>
    );
  }

  const filteredSousCat = selectedId
    ? dataSousCat.filter((item) => item.id_cat === selectedId)
    : [];

  return (
    <>
      <div className="container-carousel">
        <div className="carousel">
          {data.map((item, index) => (
            <div className="item-container" key={index}>
              <img
                className="item"
                src={item.chemin_img_cat}
                alt={`Image ${item.id_cat}`}
                loading="lazy"
                onClick={() => {
                  setSelectedId(item.id_cat);
                  onImageClick && onImageClick(item);
                }}
              />
              <div className="overlay" onClick={() => {
                  setSelectedId(item.id_cat);
                  onImageClick && onImageClick(item);
                }}>
                <h3>{item.nom_cat || `Catégorie ${index + 1}`}</h3>
              </div>
            </div>
          ))}
        </div>
        {selectedId && (
          <div>
            <h3>Images liées à l'ID sélectionné : {selectedId}</h3>
            <div className="carousel">
              {filteredSousCat.map((item, index) => (
                <div className="item-container" key={index}>
                  <img
                    className="item"
                    src={item.chemin_img_sscat}
                    alt={`Image liée ${item.id_image}`}
                    onClick={() => {
                      setSelectedIdSs(item.id_ss_cat);
                      handleSelectSousCat(item.id_ss_cat);
                    }}
                  />
                  <div className="overlay" onClick={() => {
                      setSelectedIdSs(item.id_ss_cat);
                      handleSelectSousCat(item.id_ss_cat);
                    }}>
                    <h3>{item.nom_ss_cat || `Sous-Catégorie ${index + 1}`}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{styles}</style>
    </>
  );
}
