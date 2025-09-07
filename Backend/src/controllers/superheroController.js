import {
  fetchSuperheroByApiId,
  searchSuperheroes,
  updateSuperhero,
} from "../services/superheroService.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET /api/superheroes/:id
const POPULAR_IDS = [70, 644, 659, 720, 346, 149, 106, 38, 620, 332];

export const getSuperhero = async (req, res) => {
  try {
    const results = await Promise.all(
      POPULAR_IDS.map((id) => fetchSuperheroByApiId(id))
    );

    // Map API data to Prisma model
    const savedHeroes = await Promise.all(
      results.map((data) => {
        const superhero = {
          apiId: parseInt(data.full.id),
          name: data.full.name,
          alignment: data.biography.alignment || null,
          intelligence: data.powerstats.intelligence || null,
          strength: data.powerstats.strength || null,
          speed: data.powerstats.speed || null,
          durability: data.powerstats.durability || null,
          power: data.powerstats.power || null,
          combat: data.powerstats.combat || null,
          imageUrl: data.image.url || null,
        };

        // Save to DB using upsert 
        return prisma.superhero.upsert({
          where: { apiId: superhero.apiId },
          update: {}, 
          create: superhero,
        });
      })
    );

    res.json(savedHeroes);
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
