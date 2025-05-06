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

// live update
const SHEET_ID = '1As7Cz9XKki_1prmgRvixGitybPhy8kQYLc0IBzJmbkM'; // Ganti dengan ID spreadsheet kamu
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

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

    pageItems.forEach(item => {
        const logo = item.platform.toLowerCase().includes("idn") ?
            "https://www.idn.app/_next/static/media/logo_idn_app.b557eeeb.svg" :
            "https://www.showroom-live.com/assets/img/v3/apple-touch-icon.png";

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
        // Cari posisi box-container
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