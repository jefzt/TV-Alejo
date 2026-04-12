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

