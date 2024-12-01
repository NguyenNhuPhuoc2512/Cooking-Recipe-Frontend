import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="fixed">
    <Container>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link}  to="/">Home</Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Navbar;


