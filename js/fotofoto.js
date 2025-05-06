// Initialize Masonry
var elem = document.querySelector('.grid-gallery');
var msnry = new Masonry(elem, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true,
    gutter: 10
});

// Lightbox behavior
document.querySelectorAll('.lightbox').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const imgSrc = this.getAttribute('href');
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        const img = document.createElement('img');
        img.src = imgSrc;
        lightbox.appendChild(img);

        // Close lightbox by click anywhere or press ESC
        lightbox.addEventListener('click', function() {
            lightbox.remove();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape") {
                lightbox.remove();
            }
        }, { once: true });
    });
});
