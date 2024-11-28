<?php
ini_set('memory_limit', '512M'); // Augmenter la limite de mémoire

// Arguments par défaut
$default_settings = [
    'font' => __DIR__ . '/Vibur.ttf', // Chemin de la police
    'font_size1' => 176, // Taille initiale texte 1
    'font_size2' => 70,  // Taille initiale texte 2
    'text1' => 'Votre texte 1', // Contenu du texte 1
    'text2' => 'Votre texte 2', // Contenu du texte 2
    'text1_position' => ['x_percent' => 0.39, 'y_percent' => 0.16], // Position texte 1
    'text2_position' => ['x_percent' => 0.59, 'y_percent' => 0.22], // Position texte 2
    'output_width' => 1806, // Largeur finale
    'output_height' => 1806, // Hauteur finale
    'border_mm' => 8, // Taille de la bordure en mm
];

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $default_settings['text1'] = $_POST['text1'] ?? $default_settings['text1'];
    $default_settings['text2'] = $_POST['text2'] ?? $default_settings['text2'];
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
?>
