import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

// MUI v5 imports
import Button from '@mui/material/Button';
import CardM from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { addItem, updateItem, removeItem } from './cartHelpers';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Button
          href={`/product/${product._id}`}
          variant='contained'
          color='primary'
          sx={{ mr: 1 }}
        >
          View Product
        </Button>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setSnackbarMessage(`${product.name} added to cart!`);
      setOpenSnackbar(true);
      setRun(!run); // This will trigger parent components to update
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button
          onClick={addToCart}
          variant='outlined'
          color='secondary'
          startIcon={<ShoppingCartIcon />}
          disabled={product.quantity < 1}
        >
          Add to cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <Chip label='In Stock' color='success' size='small' sx={{ mb: 1 }} />
    ) : (
      <Chip label='Out of Stock' color='error' size='small' sx={{ mb: 1 }} />
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
      setSnackbarMessage('Quantity updated!');
      setOpenSnackbar(true);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Adjust Quantity</InputLabel>
            <TextField
              type='number'
              variant='outlined'
              value={count}
              onChange={handleChange(product._id)}
              sx={{ mt: 1 }}
              inputProps={{ min: 1, max: product.quantity }}
            />
          </FormControl>
        </Box>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
            setSnackbarMessage(`${product.name} removed from cart!`);
            setOpenSnackbar(true);
          }}
          variant='contained'
          color='error'
          startIcon={<DeleteIcon />}
          sx={{ mt: 1, width: '100%' }}
        >
          Remove Product
        </Button>
      )
    );
  };

  return (
    <>
      <CardM
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3,
          },
        }}
      >
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h6' component='h2' noWrap>
            {product.name}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </Typography>

          <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
            <Typography variant='body1' fontWeight='bold'>
              ${product.price}
            </Typography>
            {showStock(product.quantity)}
          </Stack>

          <Typography
            variant='caption'
            color='text.secondary'
            display='block'
            sx={{ mb: 1 }}
          >
            Category: {product.category?.name}
          </Typography>

          <Typography
            variant='caption'
            color='text.secondary'
            display='block'
            sx={{ mb: 2 }}
          >
            Added {moment(product.createdAt).fromNow()}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mt: 'auto',
            }}
          >
            {showViewButton(showViewProductButton)}
            {showAddToCartBtn(showAddToCartButton)}
          </Box>

          {showCartUpdateOptions(cartUpdate)}
          {showRemoveButton(showRemoveProductButton)}
        </CardContent>
      </CardM>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Card;
