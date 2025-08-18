import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const PriceRangeFilter = ({ prices, handleFilters }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    handleFilters(selectedValue);
  };

  return (
    <FormControl component='fieldset' sx={{ width: '100%', mb: 3 }}>
      <FormLabel component='legend' sx={{ mb: 1, fontWeight: 'bold' }}>
        <Typography variant='h6'>Filter by price range</Typography>
      </FormLabel>
      <RadioGroup
        aria-label='price-range'
        name='price-range'
        value={value}
        onChange={handleChange}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {prices.map((price) => (
            <FormControlLabel
              key={price._id}
              value={price._id}
              control={<Radio color='primary' size='small' />}
              label={price.name}
              sx={{
                '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 },
                p: 0.5,
                m: 0,
              }}
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

export default PriceRangeFilter;
