import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

// Updated MUI v5 imports
import Button from '@mui/material/Button';
import CardM from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import { addItem, updateItem, removeItem } from './cartHelpers';

// Styled components replacement for makeStyles
const PREFIX = 'Card';
const classes = {
  cardGrid: `${PREFIX}-cardGrid`,
  card: `${PREFIX}-card`,
  cardContent: `${PREFIX}-cardContent`,
  productDescription: `${PREFIX}-productDescription`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  [`& .${classes.card}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
  },
  [`& .${classes.productDescription}`]: {
    height: '100px',
  },
}));

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

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className='mr-2'>
          <Button variant='contained' color='primary'>
            View Product
          </Button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button onClick={addToCart} variant='outlined' color='secondary'>
          Add to cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock </span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='mt-2'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
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
          }}
          variant='contained'
          color='error'
          startIcon={<DeleteIcon />}
          sx={{ mt: 1 }}
        >
          Remove Product
        </Button>
      )
    );
  };

  return (
    <Root>
      <Container className={classes.cardGrid} maxWidth='md'>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <CardM className={classes.card}>
              {shouldRedirect(redirect)}
              <ShowImage item={product} url='product' />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='h2'>
                  {product.name}
                </Typography>
                <Typography className={classes.productDescription}>
                  {product.description.substring(0, 100)}
                </Typography>
                <p className='black-10'>Price: ${product.price}</p>
                <p className='black-9'>
                  Category: {product.category && product.category.name}{' '}
                </p>
                <p className='black-8'>
                  Added on {moment(product.createdAt).fromNow()}{' '}
                </p>
                {showStock(product.quantity)}
                <br />
                <span>
                  {showViewButton(showViewProductButton)}
                  {showAddToCartBtn(showAddToCartButton)}
                  {showRemoveButton(showRemoveProductButton)}
                </span>
                {showCartUpdateOptions(cartUpdate)}
              </CardContent>
            </CardM>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default Card;
