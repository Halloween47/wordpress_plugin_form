// import * as React from "react";

// const StylesSliders = `
// .container-carousel {
//   // background-color: #f5f5f5;
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: auto;
//   gap: 3rem;
//   flex-flow: column;
//   position: relative;
//   margin: 50px 0;
// }
// .carousel {
//   // overflow: hidden;

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
//   transition: 0.5s ease;

//   // width: 20%;
//   width: 30%;
//   // height: 250px;
//   height: 350px;
//   max-width: 250px;
//   margin: 2px;
//   object-fit: cover;
//   filter: brightness(1);
// }
// .carousel .item:hover {
//   filter: brightness(1.1);
//   transform: translateZ(170px) scale(1.05);
//   box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
// }
// .carousel .item:hover + * {
//   filter: brightness(0.8);
//   transform: translateZ(120px) rotateY(15deg);
// }
// .carousel .item:hover + * + * {
//   filter: brightness(0.6);
//   transform: translateZ(80px) rotateY(10deg);
// }
// .carousel .item:has(+ *:hover) {
//   filter: brightness(0.8);
//   transform: translateZ(120px) rotateY(-15deg);
// }
// .carousel .item:has(+ * + *:hover) {
//   filter: brightness(0.6);
//   transform: translateZ(80px) rotateY(-10deg);
// }

// .test-data {
// color: #000000 !important;
// }

// `;

// export default function Sliders({ onImageClick }) {
//   const [images, setImages] = React.useState([]);

//   const [data, setData] = React.useState([]);
//   const [error, setError] = React.useState(null);
//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/wp-json/plugin_memenza/v1/images");
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des données");
//         }
//         const result = await response.json();
//         setData(result);
//         console.log(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div style={{ color: "red" }}>Erreur : {error}</div>;
//   }

//   return (
//     <React.Fragment>
//       <div className="container-carousel">
//         <div className="carousel">
//           <p>test compile 1</p>
//           {data.map((item, index) => (
//             <img
//               class="item"
//               // src={item.url}
//               src={item.chemin_img_cat}
//               alt=""
//               onClick={onImageClick}
//             />
//           ))}
//           {/* <img
//       class="item"
//       // src="https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=600"
//       src="https://memenza.fr/wp-content/uploads/2024/10/insta4.png"
//       alt=""
//       />
//       <img
//       class="item"
//       // src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
//       src="https://memenza.fr/wp-content/uploads/2024/10/insta1.png"
//       alt=""
//       />
//       <img
//       class="item"
//       // src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600"
//       src="https://memenza.fr/wp-content/uploads/2024/10/insta2.png"
//       alt="photo mariage"
//       onClick={onImageClick}
//       />
//       <img
//       class="item"
//       // src="https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&w=600"
//       src="https://memenza.fr/wp-content/uploads/2024/10/insta5.png"
//       alt=""
//       /> */}
//         </div>
//       </div>
//       <style>{StylesSliders}</style>
//     </React.Fragment>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";

// const styles = `
// .container-carousel {
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
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
// .carousel .item:hover + * {
//   filter: brightness(0.8);
//   transform: translateZ(120px) rotateY(15deg);
// }
// .carousel .item:hover + * + * {
//   filter: brightness(0.6);
//   transform: translateZ(80px) rotateY(10deg);
// }
// .carousel .item:has(+ *:hover) {
//   filter: brightness(0.8);
//   transform: translateZ(120px) rotateY(-15deg);
// }
// .carousel .item:has(+ * + *:hover) {
//   filter: brightness(0.6);
//   transform: translateZ(80px) rotateY(-10deg);
// }
// `;

// export default function Sliders({ onImageClick }) {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/wp-json/plugin_memenza/v1/images");
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

//   if (error) {
//     return (
//       <div style={{ color: "red", textAlign: "center" }}>Erreur : {error}</div>
//     );
//   }

//   return (
//     <>
//       <div className="container-carousel">
//         <div className="carousel">
//           {data.map((item, index) => (
//             <img
//               key={index}
//               className="item"
//               src={item.chemin_img_cat}
//               alt={`Image ${index + 1}`}
//               onClick={() => onImageClick && onImageClick(item)}
//             />
//           ))}
//         </div>
//       </div>
//       <style>{styles}</style>
//     </>
//   );
// }
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
}
.carousel .item {
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease, filter 0.5s ease;
  width: 30%;
  height: 350px;
  max-width: 250px;
  margin: 2px;
  object-fit: cover;
  cursor: pointer;
}
.carousel .item:hover {
  filter: brightness(1.1);
  transform: translateZ(170px) scale(1.05);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}
`;

export default function Sliders({ onImageClick, onSousCatClick }) {
  const [data, setData] = useState([]); // Liste des images dans le carousel
  const [dataSousCat, setDataSousCat] = React.useState([]);

  const [selectedId, setSelectedId] = useState(null); // ID de l'image sélectionnée
  const [selectedIdSs, setSelectedIdSs] = useState(null); // ID de l'image sélectionnée
  const [error, setError] = useState(null);

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
          "/wp-json/plugin_memenza/v1/images-categories",
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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/wp-json/plugin_memenza/v1/images_sous-categories",
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

    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>Erreur : {error}</div>
    );
  }

  const filteredSousCat = selectedId
    ? dataSousCat.filter((item) => item.id_cat === selectedId)
    : [];
    
    function test() {

      console.log(filteredSousCat);
      const nouveau = filteredSousCat.filter((item) => item.id_ss_cat === "9");
      console.log(nouveau);
      
    }

  return (
    <>
      <div className="container-carousel">
        <div className="carousel">
          {data.map((item, index) => (
            <img
              key={index}
              className="item"
              src={item.chemin_img_cat}
              alt={`Image ${item.id_cat}`}
              onClick={() => {
                setSelectedId(item.id_cat);
                onImageClick && onImageClick(item); // Notifier le parent si une fonction de clic est passée
              }}
            />
          ))}
        </div>
        {selectedId && (
          <div>
            <h3>Images liées à l'ID sélectionné : {selectedId}</h3>
            <div className="carousel">
              {/* {dataSousCat.map((item, index) => ( */}
              {filteredSousCat.map((item, index) => (
                <img
                  key={index}
                  className="item"
                  src={item.chemin_img_sscat}
                  alt={`Image liée ${item.id_image}`}
                  onClick={() => {
                    setSelectedIdSs(item.id_ss_cat);
                    // console.log(item.id_ss_cat);
                    handleSelectSousCat(item.id_ss_cat)
                  }
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{styles}</style>
    </>
  );
}
