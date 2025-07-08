// 🔹 Navbar Toggle Logic
const navLinks = document.querySelector("#nav-links");
const navBars = document.querySelector("#nav-bars");

function ToggleBars(e) {
  navLinks.classList.toggle("hidden");
  e.stopPropagation();
}

function sideClick(e) {
  if (
    !navLinks.classList.contains("hidden") &&
    !navLinks.contains(e.target) &&
    !navBars.contains(e.target)
  ) {
    navLinks.classList.add("hidden");
  }
}

document.body.addEventListener("click", sideClick);
navBars.addEventListener("click", ToggleBars);

// 🔹 Cat Fetching Logic (Scroll Only)
const URL = "https://api.thecatapi.com/v1/images/search?limit=12";
// const URL = "https://porn-pictures-api.p.rapidapi.com/pornstars/female/1";
const extractingDiv = document.querySelector("#photos");

let loadCount = 0;
const MAX_LOADS = 5;
let isLoading = false;

async function fetchCats() {
  if (isLoading || loadCount >= MAX_LOADS) return;
  isLoading = true;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    data.forEach((cat) => {
      const img = document.createElement("img");
      img.src = cat.url;
      img.alt = "Pinterest-style Cat";
      img.loading = "lazy";
      img.className =
        "w-full mb-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 break-inside-avoid";
      extractingDiv.appendChild(img);
    });

    loadCount++;

    if (loadCount >= MAX_LOADS) {
      window.removeEventListener("scroll", onScrollLoad);
    }
  } catch (err) {
    console.error("Failed to fetch cats:", err);
  } finally {
    isLoading = false;
  }
}

// 🔹 Scroll Trigger
function onScrollLoad() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchCats();
  }
}

// 🔹 Initial Fetch & Scroll Listener
fetchCats();
window.addEventListener("scroll", onScrollLoad);
