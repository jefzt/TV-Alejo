import { save, load } from "./persistance.js";

// ── FAVORITOS ──
export function getFavorites() {
    return load("favorites", []);
}

export function saveFavorites(favs) {
    save("favorites", favs);
}