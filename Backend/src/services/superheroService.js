import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SUPERHERO_API_TOKEN = process.env.SUPERHERO_API_TOKEN;
const BASE_URL = `https://www.superheroapi.com/api/${SUPERHERO_API_TOKEN}`;

// Fetch superhero full details by API ID
export const fetchSuperheroByApiId = async (apiId) => {
  try {
    const endpoints = [
      "",
      "powerstats",
      "biography",
      "appearance",
      "work",
      "connections",
      "image",
    ];
    const results = {};

    for (const endpoint of endpoints) {
      const url = `${BASE_URL}/${apiId}${endpoint ? "/" + endpoint : ""}`;
      const response = await axios.get(url);
      results[endpoint || "full"] = response.data;
    }

    return results;
  } catch (error) {
    // Handle invalid token or access denied
    if (error.response?.data?.error === "access denied") {
      throw new Error("Superhero API access denied. Check your API token.");
    }
    throw error;
  }
};

// Search superheroes by name
export const searchSuperheroes = async (name) => {
  try {
    const url = `${BASE_URL}/search/${name}`;
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    if (error.response?.data?.error === "access denied") {
      throw new Error("Superhero API access denied. Check your API token.");
    }
    throw error;
  }
};

// Update superhero info (admin only)
export const updateSuperhero = async (apiId, data) => {
  return await prisma.superhero.update({
    where: { apiId: Number(apiId) }, 
    data,
  });
};
