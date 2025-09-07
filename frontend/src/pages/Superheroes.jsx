import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  getSuperheroes,
  addFavourite,
  getFavourites,
} from "../api/superheroService.js";
import SuperheroCard from "../components/SuperheroCard.jsx";

const Superheroes = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState([]); // favourite apiIds
  const [search, setSearch] = useState(""); // search input

  // ---- Load superheroes from backend ----
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        // Check localStorage first
        let heroes = JSON.parse(localStorage.getItem("superheroes"));

        if (!heroes || heroes.length === 0) {
          // Fetch from backend if not in cache
          const res = await getSuperheroes();
          heroes = res.data;

          // Save to localStorage
          localStorage.setItem("superheroes", JSON.stringify(heroes));
        }

        setSuperheroes(heroes);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch superheroes.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  // ---- Sync favourites on mount ----
  useEffect(() => {
    const syncFavourites = async () => {
      try {
        const favRes = await getFavourites();
        const favIds = favRes.data.map((f) => f.superhero.apiId);
        setFavourites(favIds);
      } catch (err) {
        console.error("Failed to sync favourites:", err);
      }
    };

    syncFavourites();
  }, []);

  // ---- Add favourite handler ----
  const handleAddFavourite = async (apiId) => {
    try {
      if (favourites.includes(apiId)) {
        alert("Already in favourites!");
        return;
      }

      await addFavourite(apiId);

      setFavourites((prev) => [...prev, apiId]);
      alert("Added to favourites!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add to favourites.");
    }
  };

  // ---- Filter superheroes by search ----
  const filteredHeroes = superheroes.filter((hero) =>
    hero.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---- Render ----
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Popular Superheroes
      </Typography>

      {/* ---- Search Input ---- */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search by name"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 4,
        }}
      >
        {filteredHeroes.length > 0 ? (
          filteredHeroes.map((hero) => (
            <SuperheroCard
              key={hero.apiId} // use apiId as key
              hero={hero}
              isFavourite={favourites.includes(hero.apiId)} // check favourites by apiId
              onAddFavourite={handleAddFavourite}
            />
          ))
        ) : (
          <Typography>No superheroes found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Superheroes;
