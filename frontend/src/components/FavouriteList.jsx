import React from 'react';
import { Grid, Typography } from '@mui/material';
import SuperheroCard from './SuperheroCard.jsx';

const FavouriteList = ({ favourites }) => {
  if (!favourites || favourites.length === 0) {
    return <Typography>You have no favourites yet.</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {favourites.map((hero) => (
        <Grid item xs={12} sm={6} md={4} key={hero.apiId}>
          <SuperheroCard
            hero={hero} // pass the flat superhero object directly
            isFavourite={true} // all in this list are favourites
            onAddFavourite={() => {}} // disable adding since already favourite
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FavouriteList;
