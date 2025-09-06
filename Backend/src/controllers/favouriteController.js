import { addFavourite, getFavourites } from "../services/favouriteService.js";

// POST /api/favourites
export const createFavourite = async (req, res) => {
  try {
    const apiId = Number(req.params.id); // Superhero API ID from URL
    const favourite = await addFavourite(req.user.id, apiId);
    res.status(201).json(favourite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/favourites
export const fetchFavourites = async (req, res) => {
  try {
    const favourites = await getFavourites(req.user.id);
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
