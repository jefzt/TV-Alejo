import { getShows, searchShows } from "./service.js";
import { renderShows } from "./ui.js";
import { state } from "./state.js";
import { addSearchHistory, getSearchHistory, removeSearchHistory, getPerPage, savePerPage } from "./storage.js";

state.perPage = getPerPage();
document.getElementById("perPage").value = state.perPage;

async function loadInitial() {
    const data = await getShows();
    state.shows = data;
    state.filtered = data;
    paginate();
}

function paginate() {
    const start = (state.page - 1) * state.perPage;
    const end = start + state.perPage;

    const data = state.filtered.slice(start, end);
    renderShows(data);

    document.getElementById("pageInfo").innerText = `Página ${state.page}`;
}


document.getElementById("nextBtn").addEventListener("click", () => {
    state.page++;
    paginate();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (state.page > 1) {
        state.page--;
        paginate();
    }
});

async function doSearch(query) {
    if (!query) return;
    const data = await searchShows(query);
    addSearchHistory(query);
    state.filtered = data;
    state.page = 1;
    paginate();
    renderSearchHistory();
}

document.getElementById("searchBtn").addEventListener("click", () => {
    document.querySelector(".search-box").classList.toggle("active");
    document.getElementById("searchInput").focus();
});

document.getElementById("searchInput").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const query = e.target.value.trim();
        await doSearch(query);
    }
});

document.getElementById("searchInput").addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
        const query = e.target.value.trim();
        await doSearch(query);
    }
});

document.getElementById("perPage").addEventListener("change", (e) => {
    state.perPage = parseInt(e.target.value);
    savePerPage(state.perPage);
    state.page = 1;
    paginate();
});


document.getElementById("filterBtn").addEventListener("click", () => {
    document.getElementById("genreMenu").classList.toggle("active");
});

document.querySelectorAll(".genre-option").forEach(option => {
    option.addEventListener("click", () => {
        document.querySelectorAll(".genre-option").forEach(o => o.classList.remove("active"));
        option.classList.add("active");

        const genre = option.dataset.genre;
        if (genre === "All") {
            state.filtered = state.shows;
        } else {
            state.filtered = state.shows.filter(show =>
                show.genres.includes(genre)
            );
        }
        state.page = 1;
        paginate();
        document.getElementById("genreMenu").classList.remove("active");
    });
});

function renderSearchHistory() {
    const history = getSearchHistory();
    const container = document.getElementById("searchHistory");

    if (!container) return;

    if (history.length === 0) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = `
        <p class="history-title">Búsquedas recientes:</p>
        ${history.map(q => `
            <span class="history-item">
                <span onclick="repeatSearch('${q}')">${q}</span>
                <span class="history-remove" onclick="removeHistory('${q}')">✕</span>
            </span>
        `).join("")}
    `;
}

window.repeatSearch = async (query) => {
    document.getElementById("searchInput").value = query;
    await doSearch(query);
};

window.removeHistory = (query) => {
    removeSearchHistory(query);
    renderSearchHistory();
};

loadInitial();
renderSearchHistory();