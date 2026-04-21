import { save, load } from "./persistance.js";

// ── FAVORITOS ──
export function getFavorites() {
    return load("favorites", []);
}

export function saveFavorites(favs) {
    save("favorites", favs);
}
export function addFavorite(show) {
    const favs = getFavorites();
    if (!favs.find(f => f.id === show.id)) {
        favs.push(show);
        saveFavorites(favs);
    }
}

// ── HISTORIAL ──
export function getSearchHistory() {
    return load("searchHistory", []);
}

export function addSearchHistory(query) {
    if (!query.trim()) return;
    let history = getSearchHistory();
    history = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    history = history.slice(0, 10);
    save("searchHistory", history);
}
export function removeSearchHistory(query) {
    let history = getSearchHistory();
    history = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    save("searchHistory", history);
}

// ── PER PAGE ──
export function getPerPage() {
    return parseInt(load("perPage")) || 10;
}

export function savePerPage(value) {
    save("perPage", value);
}