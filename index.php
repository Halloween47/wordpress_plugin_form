<?php
/*
Plugin Name: Formulaire Memenza
Description: Un plugin personnalisé pour WooCommerce.
Version: 1.0
Author: Thomas Leconte
License: GPL2
*/

add_action('admin_menu', 'memenza_plugin_menu');

function memenza_plugin_menu() {
    add_menu_page(
        'Memenza Plugin WooCommerce', // Titre de la page
        'Formulaire Memenza',             // Titre du menu
        'manage_options',         // Capabilité requise
        'memenza-plugin-woocommerce', // Slug de la page
        'memenza_plugin_page_content',// Fonction pour afficher le contenu de la page
        'dashicons-admin-plugins',// Icône du menu
        2                         // Position du menu
    );
}

?>