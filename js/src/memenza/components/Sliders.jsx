import * as React from "react";

const StylesSliders = `
.container-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  gap: 3rem;
  flex-flow: column;
  position: relative;
  margin-top: 30px;
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
  width: 20%;
  height: 250px;
  max-width: 250px;
  /* background-color: white; */
  margin: 2px;
  transition: 0.5s;
  object-fit: cover;
  filter: brightness(1);
}
.carousel .item:hover {
  filter: brightness(1);
  transform: translateZ(170px);
}
.carousel .item:hover + * {
  filter: brightness(0.6);
  transform: translateZ(120px) rotateY(25deg);
}
.carousel .item:hover + * + * {
  filter: brightness(0.4);
  transform: translateZ(50px) rotateY(15deg);
}
.carousel .item:has(+ *:hover) {
  filter: brightness(0.6);
  transform: translateZ(120px) rotateY(-25deg);
}
.carousel .item:has(+ * + *:hover) {
  filter: brightness(0.4);
  transform: translateZ(50px) rotateY(-15deg);
}

`;

export default function Sliders({ onImageClick }) {
  return (
    <React.Fragment>
      <div className="container-carousel">
        <div className="carousel">
          <img
            class="item"
            src="https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg"
            alt="photo mariage"
            onClick={onImageClick}
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <img
            class="item"
            src="https://images.pexels.com/photos/1024996/pexels-photo-1024996.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <style>{StylesSliders}</style>
    </React.Fragment>
  );
}
