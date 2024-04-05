import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
/* import { makeStyles } from '@mui/styles'; */

/* const useStyles = makeStyles(() => ({
  root: {
    'incrementer-input': {
      width: '2em',
      textAlign: 'center'
    }
  }
})); */

const Incrementer = (props) => {
  /* const classes = useStyles(); */
  const { value, onDecrement, onIncrement } = props;

  return (
    <div>
      <IconButton aria-label="remove from shopping cart" onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField variant="outlined" className={classes['incrementer-input']} value={value} />
      <IconButton aria-label="add to shopping cart" onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default Incrementer;