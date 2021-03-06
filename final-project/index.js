import { getMoviesFromSearchQuery } from "./movieData";

const searchField = document.getElementById("search-movies");
const searchResultsEl = document.getElementById("search-results");

const handleSearchTrigger = (e) => {
    e.preventDefault();
    if (searchField.value.length === 0) {
        setResultsHtml("");
    } else if (searchField.value.length > 2) {
        getResults(searchField.value);
    } else {
        setResultsHtml(
            "<h2>Keep typing, we need three characters to search</h2>"
        );
    }
};

const setResultsHtml = (html) => {
    searchResultsEl.innerHTML = html;
};

searchField.onkeyup = handleSearchTrigger;

const getResults = async (query) => {
    const results = await getMoviesFromSearchQuery(searchField.value);
    if (results && results.Response !== "False") {
        outputResults(results.Search);
    } else {
        showNoResults(query);
    }
};

const outputResults = (results) => {
    let output = results.map(formatMovieHtml);
    searchResultsEl.innerHTML = output.join("");
    addListeners();
};

const showNoResults = (query) => {
    searchResultsEl.innerHTML = `<h2>Couldn't find any movies matching "${query}"</h2>`;
};

const formatMovieHtml = (movie) => {
    return `<article class='movie-entry' data-imdbid='${
        movie.imdbID
    }'>${getPoster(movie)}${formatH4(movie.Title)}</article>`;
};

const getImageHtml = (image, classes) =>
    `<img class="${classes}" src="${image}">`;
const hasPoster = (movie) => movie.Poster && movie.Poster !== "N/A";
const formatH4 = (text) => `<h4>${text}</h4>`;

const getPoster = (movie) =>
    hasPoster(movie)
        ? getImageHtml(movie.Poster, "movie-poster")
        : `<p class='no-poster-message'>No poster available for ${
              movie.Title
          }</p>`;

const addListeners = () => {
    var posters = document.querySelectorAll(".movie-entry");
    posters.forEach(addLightboxEventHandler);
};

const addLightboxEventHandler = (element) => {
    element.onclick = function(e) {
        // show lightbox using element.dataset.index ;
    };
};
