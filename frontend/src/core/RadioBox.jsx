import React, { useState } from 'react';
import Radio from '@mui/material/Radio'; // Updated import

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div className='ml-5' key={i}>
      <Radio
        checked={value === `${p._id}`}
        onChange={handleChange}
        value={`${p._id}`}
        name={p.name} // Changed from just 'p' to 'p.name' for better accessibility
        inputProps={{ 'aria-label': p.name }} // More descriptive label
      />
      <label className='form-check-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
