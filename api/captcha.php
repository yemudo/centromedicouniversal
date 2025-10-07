<?php
// CAPTCHA GENERATOR
session_start();

// Generate random 6-character code
$captcha = strtoupper(substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 6));

// Store in session
$_SESSION['captcha'] = $captcha;

// Create image
$width = 200;
$height = 60;
$image = imagecreatetruecolor($width, $height);

// Colors
$bgColor = imagecolorallocate($image, 240, 240, 240);
$textColor = imagecolorallocate($image, 50, 50, 50);
$lineColor = imagecolorallocate($image, 200, 200, 200);

// Fill background
imagefilledrectangle($image, 0, 0, $width, $height, $bgColor);

// Add noise lines
for ($i = 0; $i < 5; $i++) {
    imageline($image, rand(0, $width), rand(0, $height), rand(0, $width), rand(0, $height), $lineColor);
}

// Add text
$font = 5; // Built-in font
$x = 20;
for ($i = 0; $i < strlen($captcha); $i++) {
    $y = rand(15, 25);
    imagestring($image, $font, $x, $y, $captcha[$i], $textColor);
    $x += 28;
}

// Output image
header('Content-Type: image/png');
imagepng($image);
imagedestroy($image);
?>
