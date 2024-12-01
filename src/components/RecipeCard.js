import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  if (!recipe.ID) {
    console.error('Recipe ID is undefined:', recipe);
    return null;
  }

  return (
    <Card>
      <CardActionArea component={Link} to={`/recipe/${recipe.ID}`}>
        <CardMedia
          component="img"
          height="140"
          image={`data:image/jpeg;base64,${recipe.image}`}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;