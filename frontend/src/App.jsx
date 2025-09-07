import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Superheroes from './pages/Superheroes.jsx';
import Favourites from './pages/Favourites.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import SuperheroDetail from './pages/SuperheroDetail.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


const theme = createTheme({
  palette: {
    primary: {
      main: '#42a5f5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Navbar />
          <Box component="main" sx={{ p: 3 }}>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/superheroes" element={<PrivateRoute><Superheroes /></PrivateRoute>} />
              <Route path="/favourites" element={<PrivateRoute><Favourites /></PrivateRoute>} />
              <Route path="/superhero/:id" element={<PrivateRoute><SuperheroDetail  /></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute requiredRole="admin"><AdminPanel /></PrivateRoute>} />
              <Route path="/admin/:id" element={<PrivateRoute requiredRole="admin"><AdminPanel /></PrivateRoute>} />
            </Routes>
    
          </Box>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
