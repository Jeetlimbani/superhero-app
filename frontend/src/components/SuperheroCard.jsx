import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const SuperheroCard = ({ hero, isFavourite, onAddFavourite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/superhero/${hero.apiId}`, { state: { hero } }); // pass hero data
  };

  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", height: "100%", cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={hero.imageUrl || "https://via.placeholder.com/200"}
        alt={hero.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {hero.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Intelligence: {hero.intelligence || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Strength: {hero.strength || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Combat: {hero.combat || "N/A"}
        </Typography>
      </CardContent>
      <Box
        sx={{ p: 2, textAlign: "right" }}
        onClick={(e) => e.stopPropagation()} // prevent card click
      >
        <IconButton onClick={() => onAddFavourite(hero.apiId)}>
          <FavoriteIcon color={isFavourite ? "error" : "disabled"} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default SuperheroCard;
