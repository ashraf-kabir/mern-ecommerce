import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import moment from 'moment';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showOrdersLength = () =>
    orders.length > 0 ? (
      <Typography variant='h5' color='primary' sx={{ mb: 2 }}>
        Total Orders: {orders.length}
      </Typography>
    ) : (
      <Typography variant='h6' color='error' sx={{ mb: 2 }}>
        No orders
      </Typography>
    );

  return (
    <Layout
      title='Orders'
      description={`Hey ${user.name}, you can manage all the orders here`}
    >
      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader title='Orders' />
            <Divider />
            <CardContent>
              {showOrdersLength()}
              {orders.map((o) => (
                <Card
                  key={o._id}
                  variant='outlined'
                  sx={{ mb: 3, borderColor: 'primary.light' }}
                >
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Order ID: {o._id}
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id={`status-label-${o._id}`}>
                        Status
                      </InputLabel>
                      <Select
                        labelId={`status-label-${o._id}`}
                        value={o.status}
                        onChange={(e) => handleStatusChange(e, o._id)}
                      >
                        {statusValues.map((status, index) => (
                          <MenuItem key={index} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body1'>
                          <strong>Transaction ID:</strong> {o.transaction_id}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Amount:</strong> ${o.amount}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Ordered by:</strong> {o.user.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body1'>
                          <strong>Ordered on:</strong>{' '}
                          {moment(o.createdAt).fromNow()}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Delivery address:</strong> {o.address}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Typography
                      variant='subtitle1'
                      sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}
                    >
                      Total products in the order: {o.products.length}
                    </Typography>

                    {o.products.map((p, idx) => (
                      <Card
                        key={idx}
                        variant='outlined'
                        sx={{ mb: 2, bgcolor: 'grey.50' }}
                      >
                        <CardContent>
                          <TextField
                            label='Product Name'
                            value={p.name}
                            fullWidth
                            margin='dense'
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            label='Product Price'
                            value={p.price}
                            fullWidth
                            margin='dense'
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            label='Product Total'
                            value={p.count}
                            fullWidth
                            margin='dense'
                            InputProps={{ readOnly: true }}
                          />
                          <TextField
                            label='Product ID'
                            value={p._id}
                            fullWidth
                            margin='dense'
                            InputProps={{ readOnly: true }}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Orders;
