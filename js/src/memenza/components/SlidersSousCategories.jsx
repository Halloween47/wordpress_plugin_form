import * as React from "react";

const StylesSlidersSousCategories = `
.container-sliders-sous-categories {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  gap: 3rem;
  flex-flow: column;
  position: relative;
  margin-top: 30px;
}
  .carousel-sous-categories {
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}
.carousel-sous-categories .image-container-sous-categories {
  width: 100%;
  height: 150px;
  max-width: 250px;
  /* background-color: white; */
  margin: 2px;
  transition: 0.5s;
  object-fit: cover;
  filter: brightness(1);
}
.carousel-sous-categories .image-container-sous-categories:hover {
  filter: brightness(1);
  transform: translateZ(170px);
}
.carousel-sous-categories .image-container-sous-categories:hover + * {
  filter: brightness(0.6);
  transform: translateZ(120px) rotateY(25deg);
}
.carousel-sous-categories .image-container-sous-categories:hover + * + * {
  filter: brightness(0.4);
  transform: translateZ(50px) rotateY(15deg);
}
.carousel-sous-categories .image-container-sous-categories:has(+ *:hover) {
  filter: brightness(0.6);
  transform: translateZ(120px) rotateY(-25deg);
}
.carousel-sous-categories .image-container-sous-categories:has(+ * + *:hover) {
  filter: brightness(0.4);
  transform: translateZ(50px) rotateY(-15deg);
}

.image-container-sous-categories {
  position: relative;
  width: 100%;
  height: 150px;
  /* height: 100%; */
  max-width: 250px;
  overflow: hidden;
}
.image-container-sous-categories img {
  width: 90%;
  height: 100%;
  object-fit: cover; 
}
.gradient-sous-categories {
width: 90%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;     
}
.image-container-sous-categories h4 {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 1%; 
}
.gradient-color-red {
  background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0.7) 100%); 
}
.gradient-color-blue {
  background: linear-gradient(to bottom, rgba(0, 0, 255, 0) 0%, rgba(0, 0, 255, 0.7) 100%);
  }
  .gradient-color-yellow {
    background: linear-gradient(to bottom, rgba(255, 128, 0, 0) 0%, rgba(255, 128, 0, 0.7) 100%);
  }
    .gradient-color-green {
    background: linear-gradient(to bottom, rgba(0, 128, 0, 0) 0%, rgba(0, 128, 0, 0.7) 100%);
  }
     .gradient-color-magenta {
    background: linear-gradient(to bottom, rgba(255,0,255, 0) 0%, rgba(255,0,255, 0.7) 100%);
  }

`;

export default function SlidersSousCategories() {

  const [data, setData] = React.useState([]);
    const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/wp-json/plugin_memenza/v1/images_sous-categories');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const result = await response.json();
            setData(result);
            console.log(data);
            
        } catch (error) {
            setError(error.message);
        }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment> 
      <div className="container-sliders-sous-categories">

        {/* {data.map((item, index) => (
          <img
          class="item"
    src={item.chemin_img_sscat}
          alt=""
          />
        ))} */} 


        <div className="carousel-sous-categories">
          {data.map((item, index) => (
            <div class="image-container-sous-categories">
              <img
              src={item.chemin_img_sscat}
          alt=""
            />
            <div class="gradient-sous-categories gradient-color-red"></div>
            <h4>Sous categorie numero 1</h4>
              </div>
          ))}
          {/* <div class="image-container-sous-categories">
            <img
              src="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg"
              alt=""
            />
            <div class="gradient-sous-categories gradient-color-red"></div>
            <h4>Sous categorie 1</h4>
          </div>
          <div class="image-container-sous-categories">
            <img
              src="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg"
              alt=""
            />
            <div class="gradient-sous-categories gradient-color-blue"></div>
            <h4>Sous categorie 2</h4>
          </div>
          <div class="image-container-sous-categories">
            <img
              src="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg"
              alt=""
            />
            <div class="gradient-sous-categories gradient-color-magenta"></div>
            <h4>Sous categorie 3</h4>
          </div>
          <div class="image-container-sous-categories">
            <img
              src="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg"
              alt=""
            />
            <div class="gradient-sous-categories gradient-color-green"></div>
            <h4>Sous categorie 4</h4>
          </div>
          <div class="image-container-sous-categories">
            <img
              src="https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg"
              alt=""
            />
            <div class="gradient-sous-categories gradient-color-yellow"></div>
            <h4>Sous categorie 5</h4>
          </div> */}
        </div>
      </div>
      <style>{StylesSlidersSousCategories}</style>
    </React.Fragment>
  );
}
