import React from 'react';

const handleCustomize = async () => {
    try {
        // Étape 1 : Récupérer l'ID du produit via la route REST
        const productResponse = await fetch('/wp-json/plugin_memenza/v1/id_produit_perso');
        const productData = await productResponse.json();

        // if (!productResponse.ok  !productData.product_id) {
        // if (!productResponse.ok || !productData.product_id) {
        if (!productResponse.ok && !productData.product_id) {
            alert('Impossible de récupérer l\'ID du produit.');
            return;
        }

        const productId = productData.product_id;

        // Étape 2 : Envoyer les données de personnalisation via AJAX
        const formData = new URLSearchParams({
            action: 'customize_product',
            product_id: productId,
            custom_text: 'Personnalisée youpitralala',
            nonce: ajaxConfig.nonce,
        });

        const response = await fetch(ajaxConfig.ajaxUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString(),
        });

        const result = await response.json();
        if (result.success) {
            alert(result.message);
            window.location.href = '/cart';
        } else {
            alert(result.message + 'Une erreur est survenue.');
        }
    } catch (error) {
        console.error('Erreur lors de la personnalisation du produit :', error);
        alert('Une erreur est survenue lors de la personnalisation du produit.');
    }
};

export default handleCustomize;