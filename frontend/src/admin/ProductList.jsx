import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Alert,
} from '@mui/material';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { getProducts } from './apiAdmin';

const ProductList = () => {
  const { user } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Product List'
      description={`Hey ${user.name}, ready to manage products?`}
    >
      <Grid container spacing={2}>
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <Grid item xs={12} md={9}>
          <Card elevation={3}>
            <CardHeader
              title={`Total ${products.length} Products`}
              subheader='Manage, edit, or remove products below'
            />
            <Divider />
            <CardContent>
              {products.length === 0 ? (
                <Alert severity='info'>No products found.</Alert>
              ) : (
                <Grid container spacing={2}>
                  {products.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p._id}>
                      <Card variant='outlined'>
                        <CardContent>
                          <Typography variant='h6' gutterBottom>
                            {p.name}
                          </Typography>
                          {p.description && (
                            <Typography variant='body2' color='text.secondary'>
                              {p.description.substring(0, 60)}...
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductList;
