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