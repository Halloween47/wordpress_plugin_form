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
        'Memenza',             // Titre du menu
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
    <div id="plugin_backoffice_container">
    <!-- <div id="react-container-buttongroup"></div>
    <div id="react-container-presentation" class ="react-container-presentation" ></div> -->
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

add_action('rest_api_init', function () {
    register_rest_route('plugin_memenza/v1', '/images', [
        'methods' => 'GET',
        'callback' => function () {
            // return rest_ensure_response([
            //     ['id' => 1, 'url' => 'https://memenza.fr/wp-content/uploads/2024/10/insta4.png'],
            //     ['id' => 2, 'url' => 'https://memenza.fr/wp-content/uploads/2024/10/insta1.png'],
            //     ['id' => 3, 'url' => 'https://memenza.fr/wp-content/uploads/2024/10/insta2.png'],
            //     ['id' => 3, 'url' => 'https://memenza.fr/wp-content/uploads/2024/10/insta5.png'],
            // ]);
                        
            // // // TEST
            // // Connexion à la base distante
            $db = new mysqli('localhost', 'root', 'root', 'local');
            $result = $db->query('SELECT chemin_img_cat FROM categories');
            $images = $result->fetch_all(MYSQLI_ASSOC);
            $db->close();
            
            return rest_ensure_response($images);
        
            },
    ]);
    // Nouvelle route pour récupérer image sous categories
    register_rest_route('plugin_memenza/v1', '/images_sous-categories', [
        'methods' => 'GET',
        'callback' => function () {
            $db = new mysqli('localhost', 'root', 'root', 'local');
            
            if ($db->connect_error) {
                return new WP_Error(
                    'db_connection_error',
                    'Erreur de connexion : ' . $db->connect_error,
                    ['status' => 500]
                );
            }

            $result = $db->query('SELECT chemin_img_sscat FROM souscategories');
            $images = $result->fetch_all(MYSQLI_ASSOC);
            $db->close();

            return rest_ensure_response($images);
        },
    ]);
    // Nouvelle route pour récupérer image visuel
    register_rest_route('plugin_memenza/v1', '/images_visuel', [
        'methods' => 'GET',
        'callback' => function () {
            $db = new mysqli('localhost', 'root', 'root', 'local');
            
            if ($db->connect_error) {
                return new WP_Error(
                    'db_connection_error',
                    'Erreur de connexion : ' . $db->connect_error,
                    ['status' => 500]
                );
            }

            $result = $db->query('SELECT img_modele FROM modelescadre');
            $images = $result->fetch_all(MYSQLI_ASSOC);
            $db->close();

            return rest_ensure_response($images);
        },
    ]);
});

