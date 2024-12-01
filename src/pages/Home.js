import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { Grid, TextField, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchParams, setSearchParams] = useState({ ingredient: '', cuisine: '', title: '' });
  const [formData, setFormData] = useState({ title: '', description: '', ingredients: '', instructions: '', cuisine: '', image: null });
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchRecipes = useCallback(() => {
    api.get('/recipes', { params: searchParams })
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, [searchParams]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    try {
      await api.post('/recipes', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchRecipes();
      handleClose();
      setSuccessMessage('Recipe added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ title: '', description: '', ingredients: '', instructions: '', cuisine: '', image: null });
  };

  const handleSnackbarClose = () => {
    setSuccessMessage('');
  };

  useEffect(() => {
    api.get('/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <div style={{ height: '96px' }}></div>
      <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
        {['title', 'ingredient', 'cuisine'].map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={searchParams[field]}
            onChange={handleInputChange}
            style={{ flex: 1, marginRight: '10px' }}
          />
        ))}
        <Button variant="contained" color="secondary" onClick={fetchRecipes} style={{ marginRight: '10px' }}>
          Search
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickOpen} style={{ marginLeft: 'auto' }}>
          Add Recipe
        </Button>
      </div>
      <Grid container spacing={2}>
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.ID}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below to add a new recipe.</DialogContentText>
          {['title', 'description', 'ingredients', 'instructions', 'cuisine'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              fullWidth
              value={formData[field]}
              onChange={handleFormChange}
            />
          ))}
          <input type="file" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', fontSize: '1.2rem' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;