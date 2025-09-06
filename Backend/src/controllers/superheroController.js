import {
  fetchSuperheroByApiId,
  searchSuperheroes,
  updateSuperhero,
} from "../services/superheroService.js";

// GET /api/superheroes/:id
const POPULAR_IDS = [70, 644, 659, 720, 346, 149, 106, 38, 620, 332];

export const getSuperhero = async (req, res) => {
  try {
    const results = await Promise.all(
      POPULAR_IDS.map((id) => fetchSuperheroByApiId(id))
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/superheroes/search/:name
export const searchHero = async (req, res) => {
  try {
    const heroes = await searchSuperheroes(req.params.name);
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/superheroes/:id (admin only)
export const editSuperhero = async (req, res) => {
  try {
    const hero = await updateSuperhero(req.params.id, req.body);
    res.json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
