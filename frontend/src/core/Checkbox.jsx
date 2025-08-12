import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox'; // Changed from CheckboxM to Checkbox

const CheckboxComponent = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className='list-unstyled'>
      <Checkbox
        onChange={handleToggle(c._id)}
        checked={checked.indexOf(c._id) !== -1} // Fixed this line
      />
      <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};

export default CheckboxComponent;
