import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getCategories, list } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData((prevData) => ({ ...prevData, categories: data }));
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData((prevData) => ({
              ...prevData,
              results: response,
              searched: true,
            }));
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData((prevData) => ({
      ...prevData,
      [name]: event.target.value,
      searched: false,
    }));
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
    return '';
  };

  const searchedProducts = (results = []) => {
    return (
      <Box sx={{ mt: 4 }}>
        {searched && (
          <Typography variant='h5' align='center' gutterBottom>
            {searchMessage(searched, results)}
          </Typography>
        )}
        <Grid container spacing={3}>
          {results.map((product, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Paper
        component='form'
        onSubmit={searchSubmit}
        sx={{
          p: 3,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          maxWidth: 800,
          mx: 'auto',
          boxShadow: 3,
        }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id='category-select-label'>Category</InputLabel>
          <Select
            labelId='category-select-label'
            id='category-select'
            value={category}
            onChange={handleChange('category')}
            label='Category'
            size='small'
          >
            <MenuItem value='All'>All Categories</MenuItem>
            {categories.map((c, i) => (
              <MenuItem key={i} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant='outlined'
          placeholder='Search products...'
          value={search}
          onChange={handleChange('search')}
          size='small'
          InputProps={{
            startAdornment: <SearchIcon color='action' sx={{ mr: 1 }} />,
          }}
          sx={{
            flexGrow: 1,
            maxWidth: 400,
          }}
        />

        <Button
          variant='contained'
          type='submit'
          size='large'
          sx={{
            px: 4,
            height: 40,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Search
        </Button>
      </Paper>

      {searchedProducts(results)}
    </Container>
  );
};

export default Search;
