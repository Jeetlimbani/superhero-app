import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const SuperheroCard = ({ hero, isFavourite, onAddFavourite, user }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/superhero/${hero.apiId}`, { state: { hero } }); 
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // prevent card click
    navigate(`/admin/${hero.apiId}`, { state: { hero } });
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

      {/* Bottom action buttons */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()} // stop card click
      >
        {/* Favourite button */}
        <IconButton onClick={() => onAddFavourite(hero.apiId)}>
          <FavoriteIcon color={isFavourite ? "error" : "disabled"} />
        </IconButton>

        {/* Edit button only for admin */}
        {user?.role === "admin" && (
          <Button variant="outlined" color="secondary" size="small" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SuperheroCard;
