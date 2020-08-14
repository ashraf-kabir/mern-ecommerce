import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';

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
        name={p}
        inputProps={{ 'aria-label': 'A' }}
      />
      <label className='form-check-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
