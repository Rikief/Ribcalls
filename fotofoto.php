<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galeri Foto Masonry + Lightbox</title>
    <link rel="stylesheet" href="fotofoto.css">
    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
</head>
<body>
    <h1>Galeri Foto</h1>
    <div class="grid-gallery">
    <?php
    $folder = "asset/img/";
    $foto_foto = scandir($folder);
    $extensi_valid = ['jpg', 'jpeg', 'png', 'gif', 'avif', 'webp'];

    foreach ($foto_foto as $foto) {
        $ext = pathinfo($foto, PATHINFO_EXTENSION);
        if (in_array(strtolower($ext), $extensi_valid)) {
            echo "
            <div class='grid-item'>
                <a href='$folder$foto' class='lightbox'>
                    <img src='$folder$foto' alt='$foto'>
                </a>
            </div>";
        }
    }
    ?>
    </div>

    <script src="fotofoto.js"></script>
</body>
</html>
