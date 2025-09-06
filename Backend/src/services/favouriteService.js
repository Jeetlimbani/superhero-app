import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Add favourite superhero
export const addFavourite = async (userId, apiId) => {
  apiId = Number(apiId);

  let hero = await prisma.superhero.findUnique({
    where: { apiId },
  });

  if (!hero) {
    const url = `${BASE_URL}/${apiId}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.response === "error") {
      throw new Error("Invalid superhero ID");
    }

    hero = await prisma.superhero.create({
      data: {
        apiId: Number(data.id),
        name: data.name,
        alignment: data.biography?.alignment || null,
        intelligence: data.powerstats?.intelligence || null,
        strength: data.powerstats?.strength || null,
        speed: data.powerstats?.speed || null,
        durability: data.powerstats?.durability || null,
        power: data.powerstats?.power || null,
        combat: data.powerstats?.combat || null,
        imageUrl: data.image?.url || null,
      },
    });
  }

  const existing = await prisma.favourite.findFirst({
    where: { userId, superheroId: hero.id },
  });

  if (existing) {
    throw new Error("This superhero is already in your favourites.");
  }

  //  Create new favourite
  return await prisma.favourite.create({
    data: { userId, superheroId: hero.id },
    include: { superhero: true },
  });
};

// Get all favourites of a user
export const getFavourites = async (userId) => {
  return await prisma.favourite.findMany({
    where: { userId },
    include: { superhero: true },
  });
};
