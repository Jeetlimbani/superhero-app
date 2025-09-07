import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Typography, Box, CardMedia } from "@mui/material";

const SuperheroDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const hero = location.state?.hero; // get passed data

  if (!hero) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography color="error">No hero data available for ID: {id}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        {hero.name}
      </Typography>

      <CardMedia
        component="img"
        height="400"
        image={hero.imageUrl || "https://via.placeholder.com/400"}
        alt={hero.name}
        sx={{ objectFit: "contain", mb: 4 }}
      />

      <Box>
        <Typography variant="h6">Powerstats</Typography>
        <Typography>Intelligence: {hero.intelligence || "N/A"}</Typography>
        <Typography>Strength: {hero.strength || "N/A"}</Typography>
        <Typography>Speed: {hero.speed || "N/A"}</Typography>
        <Typography>Durability: {hero.durability || "N/A"}</Typography>
        <Typography>Power: {hero.power || "N/A"}</Typography>
        <Typography>Combat: {hero.combat || "N/A"}</Typography>
      </Box>
    </Container>
  );
};

export default SuperheroDetail;
