import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './incrementer.css';

const Incrementer = (props) => {
  const { value, onDecrement, onIncrement } = props;

  return (
    <div id='incrementer'>
      <IconButton aria-label="remove from shopping cart" onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField variant="outlined" value={value} />
      <IconButton aria-label="add to shopping cart" onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default Incrementer;