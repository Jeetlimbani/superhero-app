import React, { useContext } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    // If the user is logged in, show a different welcome page
    return (
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Welcome back, {user.name}!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            You are logged in.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" component={Link} to="/superheroes">
              View Superheroes
            </Button>
            <Button variant="outlined" component={Link} to="/favourites">
              View Favourites
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  // If the user is NOT logged in, display the original page
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to the Superhero App
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
          <Button variant="outlined" component={Link} to="/register">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;