// Toggle menu hamburger
const navbarNav = document.querySelector('.navbar-nav');
const menu = document.querySelector('#menu');

menu.onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle('active');
};

// Klik di luar navbar untuk menutup menu mobile
document.addEventListener('click', function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});

// Dropdown toggle
const dropdownToggles = document.querySelectorAll('.dropdown > a');

// Fungsi untuk close semua dropdown
function closeAllDropdown() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.classList.remove('show');
  });
}

// Tambah event klik
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      e.preventDefault();
      const dropdownMenu = this.nextElementSibling;

      // Tutup semua dropdown lain
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove('show');
        }
      });

      // Toggle dropdown yang diklik
      dropdownMenu.classList.toggle('show');
    }
  });

  // Tambah event hover (hanya untuk desktop)
  const dropdown = toggle.parentElement;
  dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) {
      closeAllDropdown();
      toggle.nextElementSibling.classList.add('show');
    }
  });

  dropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
      toggle.nextElementSibling.classList.remove('show');
    }
  });
});

// Klik di luar dropdown untuk nutup semua dropdown
document.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    closeAllDropdown();
  }
});
