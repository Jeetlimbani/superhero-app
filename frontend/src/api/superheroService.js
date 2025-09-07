import API from "./axiosConfig";

// ---- Superheroes ----
export const getSuperheroes = () => API.get("/superheroes/all");
export const getSuperhero = (id) => API.get(`/superheroes/${id}`);
export const searchSuperheroes = (name) => API.get(`/superheroes/search/${name}`);

// ---- Favourites ----
export const addFavourite = (id) => API.post(`/superheroes/favourite/${id}`);
export const getFavourites = () => API.get("/superheroes/list");

// ---- Admin ----
export const updateSuperhero = (id, data) => API.put(`/superheroes/edit/${id}`, data);
