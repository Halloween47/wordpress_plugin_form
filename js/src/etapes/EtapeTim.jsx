import React, { useState } from 'react';

const CustomizerComponent = () => {
    const [customText, setCustomText] = useState('');
    const [productId, setProductId] = useState(123); // ID du produit à personnaliser (à adapter dynamiquement si nécessaire)

    const handleCustomize = () => {
        // Préparation des données à envoyer
        const formData = new URLSearchParams({
            action: 'add_custom_product_to_cart', // Action définie dans WordPress
            product_id: productId,              // ID du produit
            custom_text: customText,            // Texte de personnalisation
            nonce: ajaxConfig.nonce,            // Nonce pour sécuriser la requête
        });

        // Envoi de la requête AJAX
        fetch(ajaxConfig.ajaxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Produit ajouté au panier avec succès !');
                } else {
                    alert('Erreur : ' + data.data);
                }
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi des données :', error);
            });
    };

    return (
        <div>
            <h3>Personnalisez votre produit</h3>
            <input
                type="text"
                placeholder="Entrez votre texte personnalisé"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
            />
            <button onClick={handleCustomize}>Ajouter au panier</button>
        </div>
    );
};

export default CustomizerComponent;