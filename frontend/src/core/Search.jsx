import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { getCategories, list } from './apiCore';
import Card from './Card';

// Styled components
const SearchContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ResultsContainer = styled('div')({
  width: '100%',
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const StyledTextField = styled(TextField)({
  width: 800,
  marginTop: 2,
});

const FormContainer = styled('form')(({ theme }) => ({
  '& > *': {
    margin: theme.spacing(2),
  },
}));

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
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 4,
          }}
        >
          <h2>{searchMessage(searched, results)}</h2>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
            px: 2,
          }}
        >
          {results.map((product, i) => (
            <Box key={i}>
              <Card product={product} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const searchForm = () => (
    <FormContainer onSubmit={searchSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledFormControl>
          <InputLabel id='category-select-label'>Select</InputLabel>
          <Select
            labelId='category-select-label'
            id='category-select'
            value={category}
            onChange={handleChange('category')}
            label='Select'
          >
            <MenuItem value='All'>
              <em>All</em>
            </MenuItem>
            {categories.map((c, i) => (
              <MenuItem key={i} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <StyledTextField
          onChange={handleChange('search')}
          id='search-field'
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SearchIcon sx={{ mr: 1 }} />
              Search by name
            </Box>
          }
          variant='outlined'
          autoComplete='off'
          sx={{ mx: 2 }}
        />

        <Button variant='contained' color='primary' type='submit'>
          Search
        </Button>
      </Box>
    </FormContainer>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <SearchContainer>{searchForm()}</SearchContainer>
      <ResultsContainer>{searchedProducts(results)}</ResultsContainer>
    </Box>
  );
};

export default Search;
