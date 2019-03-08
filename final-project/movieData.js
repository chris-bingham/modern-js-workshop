import { OMDB_API_KEY } from "./credentials";

export const getMoviesFromSearchQuery = async (query) => {
    const result = await fetch(
        `http://www.omdbapi.com/?s=${query}&page=1&apikey=${OMDB_API_KEY}`
    );
    const data = await result.json();

    return data;
};
