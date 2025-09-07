import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Superhero App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/superheroes">Superheroes</Button>
              <Button color="inherit" component={Link} to="/favourites">Favourites</Button>
              {user.role === 'admin' && (
                <Button color="inherit" component={Link} to="/admin">Update Hero</Button>
              )}
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;