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
    // register_rest_route('plugin_memenza/v1', '/images-categories', [
    //     'methods' => 'GET',
    //     'callback' => function () {
    //         // // Connexion à la base distante
    //         $db = new mysqli('localhost', 'root', 'root', 'local');
    //         $result = $db->query('SELECT chemin_img_cat, id_cat, nom_cat FROM categories');
    //         $images = $result->fetch_all(MYSQLI_ASSOC);
    //         $db->close();
            
    //         return rest_ensure_response($images);
        
    //         },
    // ]);
    register_rest_route('plugin_memenza/v1', '/images-categories', [
        'methods' => 'GET',
        'callback' => function () {
            // Vérifier si les images sont déjà dans le cache
            $cached_images = wp_cache_get('plugin_memenza_images', 'plugin_memenza');
            
            if ($cached_images !== false) {
                // Retourner les données mises en cache
                return rest_ensure_response($cached_images);
            }
    
            try {
                // Connexion à la base distante
                // $db = new mysqli('localhost', 'root', 'root', 'local');
                $db = new mysqli('memenzj42.mysql.db', 'memenzj42', 'pAssbdDcompl3x3pourTom', 'memenzj42', '3306');
                
                // Vérification de la connexion
                if ($db->connect_error) {
                    throw new Exception('Échec de la connexion à la base de données : ' . $db->connect_error);
                }
    
                // Requête SQL avec limitation des résultats à 10 images
                $result = $db->query('SELECT chemin_img_cat, id_cat, nom_cat FROM categories LIMIT 10');
                
                if (!$result) {
                    throw new Exception('Erreur lors de la récupération des images : ' . $db->error);
                }
    
                $images = $result->fetch_all(MYSQLI_ASSOC);
                $db->close();
    
                // Mise en cache des résultats pour 1 heure
                wp_cache_set('plugin_memenza_images', $images, 'plugin_memenza', 3600); // Cache pendant 1 heure
    
                // Retourner les images dans la réponse
                return rest_ensure_response($images);
            } catch (Exception $e) {
                // En cas d'erreur, retourner une réponse avec le code d'erreur
                return new WP_Error('database_error', $e->getMessage(), ['status' => 500]);
            }
        },
    ]);
    
    // Nouvelle route pour récupérer image sous categories
    register_rest_route('plugin_memenza/v1', '/images_sous-categories', [
        'methods' => 'GET',
        'callback' => function () {
            // $db = new mysqli('localhost', 'root', 'root', 'local');
            $db = new mysqli('memenzj42.mysql.db', 'memenzj42', 'pAssbdDcompl3x3pourTom', 'memenzj42', '3306');
            
            if ($db->connect_error) {
                return new WP_Error(
                    'db_connection_error',
                    'Erreur de connexion : ' . $db->connect_error,
                    ['status' => 500]
                );
            }

            $result = $db->query('SELECT chemin_img_sscat, id_ss_cat, id_cat, nom_ss_cat FROM souscategories');
            $images = $result->fetch_all(MYSQLI_ASSOC);
            $db->close();

            return rest_ensure_response($images);
        },
    ]);
    // Nouvelle route pour récupérer image visuel
    register_rest_route('plugin_memenza/v1', '/images_visuel', [
        'methods' => 'GET',
        'callback' => function () {
            // $db = new mysqli('localhost', 'root', 'root', 'local');
            $db = new mysqli('memenzj42.mysql.db', 'memenzj42', 'pAssbdDcompl3x3pourTom', 'memenzj42', '3306');
            
            if ($db->connect_error) {
                return new WP_Error(
                    'db_connection_error',
                    'Erreur de connexion : ' . $db->connect_error,
                    ['status' => 500]
                );
            }

            $result = $db->query('SELECT img_modele, nom_modele, id_ss_cat, visuels_cadres, textes_cadres FROM modelescadre');
            $images = $result->fetch_all(MYSQLI_ASSOC);
            $db->close();

            return rest_ensure_response($images);
        },
    ]);

    // Nouvelle route pour récupérer VIDEO visuel
    register_rest_route('plugin_memenza/v1', '/videos_visuel', [
        'methods' => 'GET',
        'callback' => function () {
            // $db = new mysqli('localhost', 'root', 'root', 'local');
            $db = new mysqli('memenzj42.mysql.db', 'memenzj42', 'pAssbdDcompl3x3pourTom', 'memenzj42', '3306');
            
            if ($db->connect_error) {
                return new WP_Error(
                    'db_connection_error',
                    'Erreur de connexion : ' . $db->connect_error,
                    ['status' => 500]
                );
            }

            $result = $db->query('SELECT nom_modele_video, chemin_video_ex, id_ss_cat, textes_video , medias_video FROM modelesvideo');
            $videos = $result->fetch_all(MYSQLI_ASSOC);
            $db->close();

            return rest_ensure_response($videos);
        },
    ]);

    // Route generate (à faire plus tard)
    // add_action('rest_api_init', function () {
    //     register_rest_route('plugin_memenza/v1', '/generate', [
    //         'methods' => 'GET',
    //         'callback' => function () {
    //             // Dossier contenant les images
    //             $directory = wp_upload_dir()['basedir'] . '../wp-content/plugins/memenza-form-test/js/src/memenza/test/process.php';
    //             $url_base = wp_upload_dir()['baseurl'] . '../wp-content/plugins/memenza-form-test/js/src/memenza/test/process.php';
    
    //             // Vérifier si le dossier existe
    //             if (!is_dir($directory)) {
    //                 return new WP_Error(
    //                     'directory_not_found',
    //                     'Le dossier des images est introuvable.',
    //                     ['status' => 404]
    //                 );
    //             }
    
    //             // Lire les fichiers du dossier
    //             $files = scandir($directory);
    //             $images = [];
    
    //             foreach ($files as $file) {
    //                 if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
    //                     $images[] = [
    //                         'file_name' => $file,
    //                         'url' => $url_base . $file,
    //                     ];
    //                 }
    //             }
    
    //             return rest_ensure_response($images);
    //         },
    //     ]);
    // });
    
});

