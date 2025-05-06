<?php
// File: combined_gallery.php
$galleryType = isset($_GET['type']) ? $_GET['type'] : 'ig';

// Konfigurasi semua gallery
$galleries = [
    'ig' => [
        'dir' => 'asset/ig/',
        'title' => 'Instagram Gallery',
        'description' => 'Beberapa foto Instagram Ribka untuk mencerahkan hari-harimu',
        'page' => 'ig.php'
    ],
    'tiktok' => [
        'dir' => 'asset/tiktok/',
        'title' => 'TikTok Gallery',
        'description' => 'Beberapa foto TikTok Ribka untuk mencerahkan hari-harimu',
        'page' => 'tiktok.php'
    ],
    'twitter' => [
        'dir' => 'asset/twitter/',
        'title' => 'Twitter Gallery',
        'description' => 'Beberapa foto Twitter Ribka untuk mencerahkan hari-harimu',
        'page' => 'foto.php'
    ]
];

// Validasi gallery type
if (!array_key_exists($galleryType, $galleries)) {
    $galleryType = 'ig';
}

$currentGallery = $galleries[$galleryType];
$allowed_ext = ['jpg', 'jpeg', 'png', 'webp'];
?>


<div class="gallery-section">
    <div class="gallery-header">
        <h1>Gallery</h1>
        <h2><?= $currentGallery['title'] ?></h2>
        <p><?= $currentGallery['description'] ?></p>

        <div class="gallery-switcher">
            <a href="?type=ig" class="<?= $galleryType === 'ig' ? 'active' : '' ?>">Instagram</a>
            <a href="?type=tiktok" class="<?= $galleryType === 'tiktok' ? 'active' : '' ?>">TikTok</a>
            <a href="?type=twitter" class="<?= $galleryType === 'twitter' ? 'active' : '' ?>">Twitter</a>
        </div>
    </div>

    <div class="grid-gallery">
        <?php
        if (is_dir($currentGallery['dir'])) {
            $files = scandir($currentGallery['dir']);
            foreach ($files as $file) {
                $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if (in_array($ext, $allowed_ext)) {
                    echo "<div class='grid-item'>";
                    echo "<a href='{$currentGallery['dir']}$file' class='lightbox'>";
                    echo "<img src='{$currentGallery['dir']}$file' alt='Foto'>";
                    echo "</a>";
                    echo "</div>";
                }
            }
            if (count($files) <= 2) {
                echo "<p>Tidak ada gambar di gallery ini</p>";
            }
        } else {
            echo "<p>Folder {$currentGallery['dir']} tidak ditemukan.</p>";
        }
        ?>
    </div>
</div>