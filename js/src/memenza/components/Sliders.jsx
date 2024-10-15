import * as React from "react";

const StylesSliders = `
.container-carousel {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  gap: 3rem;
  flex-flow: column;
  position: relative;
  margin: 50px 0;
}
.carousel {
  // overflow: hidden;
  
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
  transition: 0.5s ease;
  
  width: 20%;
  height: 250px;
  max-width: 250px;
  margin: 2px;
  object-fit: cover;
  filter: brightness(1);
}
.carousel .item:hover {
  filter: brightness(1.1);
  transform: translateZ(170px) scale(1.05);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}
.carousel .item:hover + * {
  filter: brightness(0.8);
  transform: translateZ(120px) rotateY(15deg);
}
.carousel .item:hover + * + * {
  filter: brightness(0.6);
  transform: translateZ(80px) rotateY(10deg);
}
.carousel .item:has(+ *:hover) {
  filter: brightness(0.8);
  transform: translateZ(120px) rotateY(-15deg);
}
.carousel .item:has(+ * + *:hover) {
  filter: brightness(0.6);
  transform: translateZ(80px) rotateY(-10deg);
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
    src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600"
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

