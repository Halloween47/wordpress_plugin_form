<?php
ini_set('memory_limit', '512M'); // Augmenter la limite de mémoire

// Inclure WordPress si le script est appelé directement
if (!defined('ABSPATH')) {
    require_once __DIR__ . '/../../../wp-load.php';
}

// Définir le chemin vers l'image
$image_path = ABSPATH . 'visuels/cadres/templates/alexandre_template.png';

// $upload_dir = wp_upload_dir(); // Obtenir les informations sur le dossier de téléchargement
// $image_path = $upload_dir['basedir'] . '/visuels/cadres/templates/alexandre_template.png'; // Construire le chemin complet vers l'image

// $file_path = ABSPATH . 'visuels/cadres/templates/alexandre_template.png';
// if (file_exists($file_path)) {
//     echo "Le fichier existe à : " . $file_path;
// } else {
//     echo "Le fichier n'existe pas.";
// }

// Arguments par défaut
$default_settings = [
    'font' => __DIR__ . '/Vibur.ttf', // Chemin de la police
    'font_size1' => 176, // Taille initiale texte 1
    'font_size2' => 70,  // Taille initiale texte 2
    // 'image1' => __DIR__ . '/uploads/alexandre_template.png', // Chemin image 1
    // 'image1' =>  'https://memenza.fr/visuels/cadres/templates/alexandre_template.png', // Chemin image 1
    'image1' => $image_path,
    // 'image1' => $image_path, 
    'text1' => 'Votre texte 1', // Contenu du texte 1
    'text2' => 'Votre texte 2', // Contenu du texte 2
    'text1_position' => ['x_percent' => 0.39, 'y_percent' => 0.16], // Position texte 1
    'text2_position' => ['x_percent' => 0.59, 'y_percent' => 0.22], // Position texte 2
    'output_width' => 1806, // Largeur finale
    'output_height' => 1806, // Hauteur finale
    'border_mm' => 8, // Taille de la bordure en mm
];


// echo ABSPATH . 'visuels/cadres/templates/alexandre_template.png';
echo $image_path;
if (!defined('ABSPATH')) {
    die("Erreur : La constante ABSPATH n'est pas définie.");
} else {
    echo "ABSPATH : " . ABSPATH;
}



// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $default_settings['text1'] = $_POST['text1'] ?? $default_settings['text1'];
    $default_settings['text2'] = $_POST['text2'] ?? $default_settings['text2'];
    $default_settings['image1'] = $_FILES['image1']['tmp_name'] ?? $default_settings['image1'];

}

// Générer l'image avec les paramètres actuels
generateImage($default_settings);

function generateImage($settings) {
    extract($settings);

    // Fixer la largeur et la hauteur en pixels
    $border_size = (int)($border_mm * (300 / 25.4)); // Bordure en pixels
    $image_area_width = $output_width - 2 * $border_size;
    $image_area_height = $output_height - 2 * $border_size;

    // Créer une nouvelle image avec bordure blanche
    $image_with_border = imagecreatetruecolor($output_width, $output_height);
    $white = imagecolorallocate($image_with_border, 255, 255, 255);
    imagefill($image_with_border, 0, 0, $white);

    // Charger et redimensionner les images
    $image1_resized = loadAndResizeImage($image1, $image_area_width, $image_area_height, "Image 1");

    imagecopy($image_with_border, $image1_resized, $border_size, $border_size, 0, 0, $image_area_width, $image_area_height);


    // Ajouter les textes
    $text_color = imagecolorallocate($image_with_border, 244, 192, 81); // Couleur texte : #F4C051

    // Calcul des positions des textes
    $x1 = (int)($border_size + $image_area_width * $text1_position['x_percent']);
    $y1 = (int)($border_size + $image_area_height * $text1_position['y_percent']);
    $x2 = (int)($border_size + $image_area_width * $text2_position['x_percent']);
    $y2 = (int)($border_size + $image_area_height * $text2_position['y_percent']);

    // Ajouter les textes sur l'image
    imagettftext($image_with_border, $font_size1, 0, $x1, $y1, $text_color, $font, $text1);
    imagettftext($image_with_border, $font_size2, 0, $x2, $y2, $text_color, $font, $text2);

    // Enregistrer et afficher
    $output_file = __DIR__ . '/output_image_' . uniqid() . '.png';
    imagesavealpha($image_with_border, true);
    imagepng($image_with_border, $output_file);

    // Afficher l'image générée
    header('Content-Type: image/png');
    echo file_get_contents($output_file);

    imagedestroy($image_with_border);
}

// Fonction pour charger et redimensionner une image avec gestion des erreurs
function loadAndResizeImage($path, $new_width, $new_height, $label) {
    if (!file_exists($path)) {
        die("Erreur : Le fichier $label n'existe pas. Voici le chemin :  $path");
    }
    $image = @imagecreatefrompng($path);
    if ($image === false) {
        die("Erreur : Impossible de charger $label. Vérifiez que c'est un fichier PNG valide.");
    }
    $resized_image = imagecreatetruecolor($new_width, $new_height);
    imagealphablending($resized_image, false);
    imagesavealpha($resized_image, true);
    imagecopyresampled($resized_image, $image, 0, 0, 0, 0, $new_width, $new_height, imagesx($image), imagesy($image));
    return $resized_image;
}
?>
