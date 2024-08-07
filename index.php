<?php
/*
Plugin Name: Formulaire Memenza
Plugin URI: http://test.com
Description: Formulaire Memenza pour les données JSON2Video.
Version: 1.0
Author: Thomas Leconte
Author URI: http://test.com
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
// Fonction pour afficher le contenu de la page
function memenza_plugin_page_content() {
    ?>
    <div class="wrap">
        <h1>Ici notre plugin WooCommerce</h1>
        <p>Ceci est la page d'administration du plugin WooCommerce personnalisé.</p>
    </div>
    <?php
}