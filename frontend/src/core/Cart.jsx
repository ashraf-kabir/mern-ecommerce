import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers.js';
import Card from './Card.jsx';
import Checkout from './Checkout';
import Copyright from './Copyright.jsx';
import {
  Box,
  Typography,
  Divider,
  Grid,
  Container,
  Button,
  Paper,
  Stack,
} from '@mui/material';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => (
    <Stack spacing={3}>
      <Typography variant='h5' textAlign='center' gutterBottom>
        Your Cart ({items.length} {items.length === 1 ? 'Item' : 'Items'})
      </Typography>
      <Divider />
      {items.map((product, i) => (
        <Box key={i}>
          <Card
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        </Box>
      ))}
    </Stack>
  );

  const noItemsMessage = () => (
    <Box textAlign='center' py={4}>
      <Typography variant='h5' gutterBottom>
        Your cart is empty
      </Typography>
      <Button
        component={Link}
        to='/shop'
        variant='contained'
        color='primary'
        size='large'
        sx={{ mt: 2 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
    >
      {items.length > 0 ? (
        <Grid container spacing={2}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              {showItems(items)}
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper
              elevation={2}
              sx={{ p: 3, position: { md: 'sticky' }, top: { md: 16 } }}
            >
              <Typography variant='h5' textAlign='center' gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Checkout products={items} setRun={setRun} run={run} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Paper elevation={2} sx={{ p: 4 }}>
            {noItemsMessage()}
          </Paper>
        </Box>
      )}
      <Copyright />
    </Layout>
  );
};

export default Cart;
