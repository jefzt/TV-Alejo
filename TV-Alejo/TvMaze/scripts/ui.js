import { addFavorite } from "./storage.js";

const showsCache = {};

export function renderShows(shows) {
    const container = document.getElementById("app");

  
    shows.forEach(show => showsCache[show.id] = show);

    container.innerHTML = shows.map(show => `
        <div class="card">
            <img src="${show.image?.medium || ''}">
            <h3>${show.name}</h3>
            <p>${show.genres.join(", ")}</p>
            <p>⭐ ${show.rating.average || "N/A"}</p>

            <a href="show.html?id=${show.id}">
                <button>Ver detalles</button>
            </a>

            <button onclick="addToFav(${show.id})">
                ⭐ Favorito
            </button>
        </div>
    `).join("");
}

window.addToFav = (id) => {
    const show = showsCache[id];
    if (show) addFavorite(show);
};