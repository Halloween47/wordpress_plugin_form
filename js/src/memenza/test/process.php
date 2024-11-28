<?php
ini_set('memory_limit', '512M'); // Augmenter temporairement la limite de mémoire
ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '10M');

// Arguments par défaut
$default_settings = [
    'font' => __DIR__ . '/Vibur.ttf', // Chemin de la police
    'font_size1' => 176, // Taille initiale texte 1
    'font_size2' => 70,  // Taille initiale texte 2
    'image1' => __DIR__ . '/uploads/alexandre_template.png', // Chemin image 1
    // 'image2' => __DIR__ . '/uploads/image2.png', // Chemin image 2
    'text1' => 'Votre texte 1', // Contenu du texte 1
    'text2' => 'Votre texte 2', // Contenu du texte 2
    'text1_position' => ['x_percent' => 0.39, 'y_percent' => 0.16], // Position texte 1
    'text2_position' => ['x_percent' => 0.59, 'y_percent' => 0.22], // Position texte 2
    'qr_code' => __DIR__ . '/qrcode.png', // Chemin QR Code
    'output_width' => 1806, // Largeur finale
    'output_height' => 1806, // Hauteur finale
    'border_mm' => 8, // Taille de la bordure en mm
    'cut_length_mm' => 6, // Longueur des traits de coupe en mm
    'qr_code_percent' => 0.154, // Taille du QR Code (en pourcentage de l'aire sans bordure)
    'qr_offset_percent' => 0.027, // Décalage QR Code en bas à droite (en pourcentage)
];

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $default_settings['text1'] = $_POST['text1'] ?? $default_settings['text1'];
    $default_settings['text2'] = $_POST['text2'] ?? $default_settings['text2'];
    $default_settings['image1'] = $_FILES['image1']['tmp_name'] ?? $default_settings['image1'];
    // $default_settings['image2'] = $_FILES['image2']['tmp_name'] ?? $default_settings['image2'];
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
    // $image2_resized = loadAndResizeImage($image2, $image_area_width, $image_area_height, "Image 2");

    imagecopy($image_with_border, $image1_resized, $border_size, $border_size, 0, 0, $image_area_width, $image_area_height);
    // imagecopy($image_with_border, $image2_resized, $border_size, $border_size, 0, 0, $image_area_width, $image_area_height);

    // Ajouter les textes
    $text_color = imagecolorallocate($image_with_border, 244, 192, 81); // Couleur texte : #F4C051

    // Calcul des positions des textes
    $x1 = (int)($border_size + $image_area_width * $text1_position['x_percent']);
    $y1 = (int)($border_size + $image_area_height * $text1_position['y_percent']);
    $x2 = (int)($border_size + $image_area_width * $text2_position['x_percent']);
    $y2 = (int)($border_size + $image_area_height * $text2_position['y_percent']);

    $font_size1_adjusted = adjustFontSize($font_size1, $text1, $font, $image_area_width * 0.54);
    $font_size2_adjusted = ($font_size1_adjusted != $font_size1) ? (int)($font_size1_adjusted * 0.4) : $font_size2;

    imagettftext($image_with_border, $font_size1_adjusted, 0, $x1, $y1, $text_color, $font, $text1);
    imagettftext($image_with_border, $font_size2_adjusted, 0, $x2, $y2, $text_color, $font, $text2);

    // Ajouter les traits de coupe
    $line_color = imagecolorallocate($image_with_border, 0, 0, 0); // Couleur noire
    $cut_length = (int)($cut_length_mm * (300 / 25.4));

    addCropMarks($image_with_border, $border_size, $output_width, $output_height, $cut_length);

    // Ajouter le QR Code
    $qr_code_size = (int)($image_area_width * $qr_code_percent);
    $qr_code_x = $border_size + $image_area_width - $qr_code_size - (int)($image_area_height * $qr_offset_percent);
    $qr_code_y = $border_size + $image_area_height - $qr_code_size - (int)($image_area_height * $qr_offset_percent);

    $qr_code_resized = loadAndResizeImage($qr_code, $qr_code_size, $qr_code_size, "QR Code");
    imagecopy($image_with_border, $qr_code_resized, $qr_code_x, $qr_code_y, 0, 0, $qr_code_size, $qr_code_size);

    // Enregistrer et afficher
    $output_file = __DIR__ . '/uploads/output_image_' . uniqid() . '.png';
    imagesavealpha($image_with_border, true);
    imagepng($image_with_border, $output_file);

    // Ajouter les métadonnées DPI
    addPngDpi($output_file, 300);

    header('Content-Type: image/png');
    echo file_get_contents($output_file);

    imagedestroy($image_with_border);
}

// Fonction pour charger et redimensionner une image avec gestion des erreurs
function loadAndResizeImage($path, $new_width, $new_height, $label) {
    if (!file_exists($path)) {
        die("Erreur : Le fichier $label n'existe pas.");
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

// Fonction pour ajuster dynamiquement la taille de la police
function adjustFontSize($font_size, $text, $font, $max_width) {
    do {
        $bbox = imagettfbbox($font_size, 0, $font, $text);
        $text_width = $bbox[2] - $bbox[0];
        if ($text_width > $max_width) {
            $font_size--;
        }
    } while ($text_width > $max_width && $font_size > 1);

    return $font_size;
}

// Fonction pour ajouter les traits de coupe
function addCropMarks($image, $border_size, $width, $height, $cut_length) {
    // Haut-gauche
    imageline($image, $border_size, 0, $border_size, $cut_length, imagecolorallocate($image, 0, 0, 0));
    imageline($image, 0, $border_size, $cut_length, $border_size, imagecolorallocate($image, 0, 0, 0));

    // Haut-droit
    imageline($image, $width - $border_size, 0, $width - $border_size, $cut_length, imagecolorallocate($image, 0, 0, 0));
    imageline($image, $width - $cut_length, $border_size, $width, $border_size, imagecolorallocate($image, 0, 0, 0));

    // Bas-gauche
    imageline($image, $border_size, $height - $cut_length, $border_size, $height, imagecolorallocate($image, 0, 0, 0));
    imageline($image, 0, $height - $border_size, $cut_length, $height - $border_size, imagecolorallocate($image, 0, 0, 0));

    // Bas-droit
    imageline($image, $width - $border_size, $height - $cut_length, $width - $border_size, $height, imagecolorallocate($image, 0, 0, 0));
    imageline($image, $width - $cut_length, $height - $border_size, $width, $height - $border_size, imagecolorallocate($image, 0, 0, 0));
}

// Fonction pour ajouter les métadonnées DPI à un PNG
function addPngDpi($file_path, $dpi) {
    $data = file_get_contents($file_path);
    $dpi_x = (int)($dpi * 39.37);
    $dpi_y = $dpi_x;
    $chunk = pack('NNCNN', 0x00000009, 0x70485973, $dpi_x, $dpi_y, 0x01);
    $crc = pack('N', crc32(substr($chunk, 4)));
    $chunk .= $crc;
    $data = substr_replace($data, $chunk, 33, 0);
    file_put_contents($file_path, $data);
}
?>
