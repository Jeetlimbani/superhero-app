import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import { updateSuperhero } from '../api/superheroService.js';

const AdminPanel = () => {
  const [heroId, setHeroId] = useState('');
  const [formData, setFormData] = useState({ name: '', intelligence: '', strength: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await updateSuperhero(heroId, {
        name: formData.name || undefined,
        intelligence: formData.intelligence || undefined,
        strength: formData.strength || undefined,
      });
      setMessage(`Superhero ${response.data.name} updated successfully!`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update superhero.');
    } finally {
      setLoading(false);
    }
  };

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
        <Typography component="h1" variant="h5">
          Update Superhero
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal" required fullWidth
            label="Superhero ID" name="heroId"
            value={heroId} onChange={(e) => setHeroId(e.target.value)}
          />
          <TextField
            margin="normal" fullWidth
            label="Name" name="name"
            value={formData.name} onChange={handleChange}
            
          />
          <TextField
            margin="normal" fullWidth
            label="Intelligence" name="intelligence" 
            value={formData.intelligence} onChange={handleChange}
          />
          <TextField
            margin="normal" fullWidth
            label="Strength" name="strength" 
            value={formData.strength} onChange={handleChange}
          />
          <Button
            type="submit" fullWidth variant="contained"
            sx={{ mt: 3, mb: 2 }} disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update'}
          </Button>
          {message && <Typography color="success.main">{message}</Typography>}
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPanel;