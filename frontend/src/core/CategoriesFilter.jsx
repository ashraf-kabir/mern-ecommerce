import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CategoriesFilter = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (categoryId) => {
    const currentIndex = checked.indexOf(categoryId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(categoryId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleFilters(newChecked);
  };

  return (
    <FormControl component='fieldset' sx={{ width: '100%', mb: 3 }}>
      <FormLabel component='legend' sx={{ mb: 1, fontWeight: 'bold' }}>
        <Typography variant='h6'>Filter by categories</Typography>
      </FormLabel>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category._id}
            control={
              <Checkbox
                checked={checked.includes(category._id)}
                onChange={() => handleToggle(category._id)}
                color='primary'
                size='small'
              />
            }
            label={category.name}
            sx={{
              '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 },
              p: 0.5,
              m: 0,
            }}
          />
        ))}
      </Box>
    </FormControl>
  );
};

export default CategoriesFilter;
