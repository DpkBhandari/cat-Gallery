// 🔹 Navbar Toggle Logic
const navLinks = document.querySelector("#nav-links");
const nav_Bars = document.querySelector("#nav-bars");

function ToggleBars(e) {
  navLinks.classList.toggle("hidden");
  e.stopPropagation();
}

function sideClick(e) {
  if (
    !navLinks.classList.contains("hidden") &&
    !navLinks.contains(e.target) &&
    !nav_Bars.contains(e.target)
  ) {
    navLinks.classList.add("hidden");
  }
}

document.body.addEventListener("click", sideClick);
nav_Bars.addEventListener("click", ToggleBars);

// Fetching and Displying Data

const URL = "https://api.thecatapi.com/v1/images/search?limit=12";
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
      // Image element
      const img = document.createElement("img");
      img.src = cat.url;
      img.alt = "Gallery Cat";
      img.loading = "lazy";
      img.className =
        "w-[250px] h-[180px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300";

      // Wrapper div to center
      const wrapper = document.createElement("div");
      wrapper.className = "flex justify-center items-center";
      wrapper.appendChild(img);

      // Add to gallery
      extractingDiv.appendChild(wrapper);
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

function onScrollLoad() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchCats();
  }
}

fetchCats();
window.addEventListener("scroll", onScrollLoad);
