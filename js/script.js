// toggle class active
const navbarNav = document.querySelector('.navbar-nav');
//ketika menu di klik
document.querySelector('#menu').onclick = (e) => {
    e.preventDefault(); // ⬅️ tambahkan ini
    navbarNav.classList.toggle('active');
};

//klik diluar navbar untuk menghilangkan nav
const menu = document.querySelector('#menu');

document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

// toggle menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

// hero slide 1
const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 500, // transisi antar slide = 0.5 detik
  autoplay: {
    delay: 3000, // tampil 3 detik sebelum ganti
    disableOnInteraction: false, // tetap autoplay meskipun diklik
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade', // untuk transisi lebih halus, bisa juga 'slide'
  fadeEffect: {
    crossFade: true,
  },
});

// hero slide ke-2
const swiper2 = new Swiper('.hero-slider-2', {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade', // untuk transisi lebih halus, bisa juga 'slide'
    fadeEffect: {
      crossFade: true,
    },
  });
  
// end hero 2
  



