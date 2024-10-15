import React from 'react'
import Sliders from './Sliders.jsx'
import MemenzaSousCategories from './MemenzaSousCategories.jsx';

function EtapeCategorie() {
    const [showSliders, setShowSliders] = useState(false);

    function handleImageClick() {
        setShowSliders(true);
      }
    
  return (
    <div className="memenza-categories">
      <h2>Choisissez votre catégorie.</h2>
      <Sliders onImageClick={handleImageClick} />
      {showSliders && <MemenzaSousCategories />}
      </div>
  )
}

export default EtapeCategorie