import React, { useState } from 'react';

function ImageUploader() {
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("Resultat de img.src : " + JSON.stringify(event.target.result));

    if (file) {
      const img = new Image();
      const reader = new FileReader();

      // Lecture du fichier pour récupérer le chemin temporaire
      reader.onload = (e) => {
        img.src = e.target.result; // Assigner le chemin temporaire à l'image
        console.log("Resultat de img.src : " + JSON.stringify(e.target.result));
        
        setImagePreview(e.target.result); // Afficher l'aperçu de l'image
        console.log("Resultat de imagePreview : " + JSON.stringify(imagePreview));
        console.log("Resultat de imagePreview : " + imagePreview);
    };
    
    // Une fois que l'image est chargée, on vérifie ses dimensions
    img.onload = () => {
        if (img.width > img.height) {
            setErrorMessage(''); // Réinitialiser le message d'erreur
        } else {
            setErrorMessage('Erreur : La largeur de l\'image doit être supérieure à sa hauteur.');
            setImagePreview(''); // Optionnel : Réinitialiser l'aperçu de l'image
        }
    };
    
    reader.readAsDataURL(file); // Lire le fichier comme URL
    console.log("Resultat de file tout court : " + JSON.stringify(file));
    console.log("Resultat de file : " + JSON.stringify(file.name));
}
};

  return (
    <div>
      <h5>Uploader une Image</h5>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {imagePreview && (
        <div>
          <h6>Aperçu de l'image :</h6>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;