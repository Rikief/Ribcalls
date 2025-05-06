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
  


// foto foto
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Masonry
  var elem = document.querySelector('.grid-gallery');
  if (elem) {
      new Masonry(elem, {
          itemSelector: '.grid-item',
          columnWidth: '.grid-item',
          percentPosition: true,
          gutter: 10
      });
  }

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
});

const SHEET_ID = '1As7Cz9XKki_1prmgRvixGitybPhy8kQYLc0IBzJmbkM'; // ID Spreadsheet kamu

function getApiUrl(sheetName) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}

const sheetName = document.body.dataset.sheet || 'DATA SHOW'; // default ke DATA SHOW kalau tidak ada
const API_URL = getApiUrl(sheetName);

const itemsPerPage = 16;
let currentPage = 1;
let allItems = [];

window.onload = () => {
    fetch(API_URL)
        .then(res => res.text())
        .then(data => {
            const json = JSON.parse(data.substring(47).slice(0, -2));
            const rows = json.table.rows;
            const container = document.getElementById("box-container");

            allItems = rows.slice(1).reverse().map(row => {
                const data = row.c.map(c => c?.v || "-");
                if (data.length < 5) return null;

                const platform = data[0];
                const title = data[1];
                const rawDate = row.c[2];
                const duration = data[3];
                const view = data[4];

                const date = (typeof rawDate?.f === "string") ? rawDate.f : "-";

                return { platform, title, date, duration, view };
            }).filter(item => item !== null);

            renderPage(currentPage);
            renderPagination();
        });
};

function renderPage(page) {
  const container = document.getElementById("box-container");
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allItems.slice(start, end);

  const logoMapping = {
      "Pajama Drive": "https://static.wikia.nocookie.net/logopedia/images/b/bc/JKT48_Pajama_Drive_-_1st_Generation_%282012%29.png",
      "Ingin Bertemu": "https://static.wikia.nocookie.net/logopedia/images/e/e7/JKT48_Ingin_Bertemu_-_NEW_ERA_Trainees_%282023%29.png",
      "Aturan arti cinta": "https://static.wikia.nocookie.net/logopedia/images/8/89/JKT48_Aturan_Anti_Cinta_-_NEW_ERA_%282021%29.png",
      "JKT48": "https://static.wikia.nocookie.net/logopedia/images/8/82/JKT48.svg"
  };

  pageItems.forEach(item => {
      let logo = "";
      const matchedKey = Object.keys(logoMapping).find(key => item.title.includes(key));

      if (matchedKey) {
          logo = logoMapping[matchedKey];
      } else if (item.title.startsWith("JKT48")) {
          // Kalau title diawali JKT48, pakai logo showroom default misal (kamu bisa ganti juga)
          logo = "https://upload.wikimedia.org/wikipedia/commons/2/22/JKT48_Logo_New.png";
      } else if (item.platform.toLowerCase().includes("idn")) {
          logo = "https://www.idn.app/_next/static/media/logo_idn_app.b557eeeb.svg";
      } else {
          logo = "https://www.showroom-live.com/assets/img/v3/apple-touch-icon.png";
      }

      const div = document.createElement("div");
      div.className = "live-item";
      div.innerHTML = `
          <img src="${logo}" alt="${item.platform}" class="platform-logo" />
          <div class="live-info">
              <div><strong>Title:</strong> ${item.title} <strong>Duration:</strong> ${item.duration}</div>
              <div><strong>Date:</strong> ${parseDate(item.date)} <strong>View:</strong> ${item.view}</div>
              <div><strong>Time:</strong> ${parseTime(item.date)}</div>
          </div>
      `;
      container.appendChild(div);
  });
}

function renderPagination() {
  let pagination = document.getElementById("pagination");
  if (!pagination) {
      pagination = document.createElement("div");
      pagination.id = "pagination";
      const container = document.getElementById("box-container");
      container.parentNode.insertBefore(pagination, container.nextSibling);
  }
  pagination.innerHTML = "";

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
      if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
          renderPagination();
          scrollToTop();
      }
  };
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) {
          btn.classList.add("active-page");
      }
      btn.onclick = () => {
          currentPage = i;
          renderPage(currentPage);
          renderPagination();
          scrollToTop();
      };
      pagination.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
      if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
          renderPagination();
          scrollToTop();
      }
  };
  pagination.appendChild(nextBtn);
}

function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "-";
  const parts = dateStr.trim().split(" ");
  return parts.length >= 4 ? parts.slice(0, 4).join(" ").replace(",", "") : "-";
}

function parseTime(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "-";
  const parts = dateStr.trim().split(" ");
  return parts.length >= 5 ? parts[4] : "-";
}

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}
// Live Update



feather.replace();