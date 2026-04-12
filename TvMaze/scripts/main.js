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
