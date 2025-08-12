import React from 'react';
import Menu from './Menu';
import { Box, Typography, Container } from '@mui/material';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <Box>
    <Menu />
    <Box
      sx={{
        position: 'relative',
        height: { xs: 300, md: 400 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pt: '64px', // Push content down below the navbar (adjust if your navbar height is different)
        mb: 4,
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h2'
          component='h1'
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='h5'
          component='p'
          sx={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          {description}
        </Typography>
      </Container>
    </Box>
    <Box className={className} sx={{ p: { xs: 2, md: 3 } }}>
      {children}
    </Box>
  </Box>
);

export default Layout;
