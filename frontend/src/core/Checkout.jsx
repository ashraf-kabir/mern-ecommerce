import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  TextField,
  Stack,
} from '@mui/material';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((res) => {
      if (res.error) {
        setData((prev) => ({ ...prev, error: res.error }));
      } else {
        setData((prev) => ({ ...prev, clientToken: res.clientToken }));
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () =>
    products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);

  const buy = () => {
    setData({ ...data, loading: true });
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then((res) => {
        nonce = res.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address,
            };

            createOrder(userId, token, createOrderData)
              .then(() => {
                emptyCart(() => {
                  setRun(!run);
                  setData({
                    loading: false,
                    success: true,
                    clientToken: data.clientToken,
                    instance: {},
                    address: '',
                  });
                });
              })
              .catch(() => setData({ ...data, loading: false }));
          })
          .catch(() => setData({ ...data, loading: false }));
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () =>
    data.clientToken !== null &&
    products.length > 0 && (
      <Box sx={{ mt: 2 }}>
        <TextField
          label='Delivery Address'
          placeholder='Type your delivery address...'
          fullWidth
          multiline
          minRows={3}
          value={data.address}
          onChange={handleAddress}
          sx={{ mb: 2 }}
        />

        <DropIn
          options={{
            authorization: data.clientToken,
            paypal: { flow: 'vault' },
          }}
          onInstance={(instance) => (data.instance = instance)}
        />

        <Button
          onClick={buy}
          variant='contained'
          color='success'
          fullWidth
          sx={{ mt: 2 }}
        >
          Pay ${getTotal()}
        </Button>
      </Box>
    );

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Total: ${getTotal()}
      </Typography>

      {data.loading && (
        <Stack alignItems='center' sx={{ mb: 2 }}>
          <CircularProgress color='error' />
        </Stack>
      )}

      {data.success && (
        <Alert severity='success' sx={{ mb: 2 }}>
          🎉 Thanks! Your payment was successful.
        </Alert>
      )}

      {data.error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {data.error}
        </Alert>
      )}

      {isAuthenticated() ? (
        showDropIn()
      ) : (
        <Button
          component={Link}
          to='/signin'
          variant='contained'
          color='primary'
          fullWidth
        >
          Sign in to checkout
        </Button>
      )}
    </Box>
  );
};

export default Checkout;
