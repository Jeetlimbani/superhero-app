import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { getFavourites } from '../api/superheroService.js';
import FavouriteList from '../components/FavouriteList.jsx';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await getFavourites();
        console.log("favourite is",response)
        setFavourites(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch favourites.');
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
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
        My Favourite Superheroes
      </Typography>
      <FavouriteList   favourites={favourites.map((fav) => fav.superhero)} />
    </Container>
  );
};

export default Favourites;