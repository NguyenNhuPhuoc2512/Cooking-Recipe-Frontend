import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Typography, Card, CardContent, CardMedia, Container } from '@mui/material';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <Container>
      <div style={{ height: '96px' }}></div> {/* Thêm div này để tạo khoảng trống */}
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={`data:image/jpeg;base64,${recipe.image}`}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="h6" component="div">
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {recipe.description}
          </Typography>
          <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
            Cuisine
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {recipe.cuisine}
          </Typography>
          <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
            Ingredients
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {recipe.ingredients}
          </Typography>
          <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
            Instructions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {recipe.instructions}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RecipeDetail;