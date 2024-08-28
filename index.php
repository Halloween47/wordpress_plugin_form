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
    <!-- <h1>Ici notre plugin WooCommerce</h1> -->
        <!-- <p>Ceci est la page d'administration du plugin WooCommerce personnalisé.</p> -->
        <!-- <div id="react-container"></div> -->

        <!-- <div id="react-container-presentation"></div> -->

        <div id="plugin_backoffice_container">
            <div id="react-container-buttongroup"></div>
            <div id="react-container-presentation"></div>
        </div>  
    </div>
    <?php
}

function style_sliders() {
    wp_enqueue_style('style_sliders', plugin_dir_url(__FILE__) . 'js/src/components/sliders/sliders.css',  10);
}
add_action('wp_enqueue_scripts', 'style_sliders');

add_action('admin_enqueue_scripts', 'enqeue_react_script');
function enqeue_react_script() {
    wp_enqueue_script(
        'test_integration_react',
        plugins_url('js/dist/bundle.js', __FILE__),
        array(),
        '1.0.0',
        true
    );
}


