<?php
header('Content-Type: application/json');
echo json_encode([
    ['id' => 1, 'url' => 'https://via.placeholder.com/150'],
    ['id' => 2, 'url' => 'https://via.placeholder.com/200'],
    ['id' => 3, 'url' => 'https://via.placeholder.com/250'],
]);
