const gallery = document.getElementById("gallery");

async function loadPornstars() {
  try {
    const response = await fetch(
      "https://porn-pictures-api.p.rapidapi.com/pornstars/female/1",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ef4c433a4fmsh5857408bba7c486p1ade74jsn122b90553c1d",
          "x-rapidapi-host": "porn-pictures-api.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    const stars = data.result;

    stars.forEach((star) => {
      const card = document.createElement("div");
      card.className = "bg-slate-800 p-3 rounded-lg shadow-md";

      card.innerHTML = `
        <img src="${star.picture}" alt="${star.pornStarName}" class="rounded-lg w-full h-48 object-cover mb-2" />
        <h2 class="text-lg font-semibold">${star.pornStarName}</h2>
        <p class="text-sm text-gray-400">🌍 ${star.nationality} | 📸 ${star.galleries} galleries</p>
      `;

      gallery.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading data:", error);
    gallery.innerHTML = `<p class="text-red-500">Failed to load images.</p>`;
  }
}

loadPornstars();
