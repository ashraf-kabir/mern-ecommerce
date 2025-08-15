import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Divider,
  Alert,
} from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = () => {
  const { productId } = useParams();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: new FormData(),
  });
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // Load product and categories
  const init = (id) => {
    getProduct(id).then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        }));
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    if (productId) {
      init(productId);
    }
  }, [productId]);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues((prev) => ({ ...prev, error: '', loading: true }));

    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error, loading: false }));
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          error: '',
          redirectToProfile: true,
          createdProduct: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToProfile && !error) {
      return <Navigate to='/admin/products' />;
    }
  };

  return (
    <Layout
      title='Update Product'
      description={`Hi ${user.name}, update the product details below`}
    >
      <Grid container spacing={2}>
        <AdminSidebar />

        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader title='Edit Product Details' />
            <Divider />
            <CardContent>
              {loading && <Alert severity='info'>Updating product...</Alert>}
              {error && <Alert severity='error'>{error}</Alert>}
              {createdProduct && (
                <Alert severity='success'>
                  {`${createdProduct} updated successfully!`}
                </Alert>
              )}

              <form onSubmit={clickSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button variant='outlined' component='label'>
                      Upload Product Photo
                      <input
                        hidden
                        type='file'
                        accept='image/*'
                        onChange={handleChange('photo')}
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Name'
                      fullWidth
                      value={name}
                      onChange={handleChange('name')}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Price'
                      type='number'
                      fullWidth
                      value={price}
                      onChange={handleChange('price')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Description'
                      multiline
                      rows={3}
                      fullWidth
                      value={description}
                      onChange={handleChange('description')}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label='Category'
                      fullWidth
                      value={category}
                      onChange={handleChange('category')}
                    >
                      <MenuItem value=''>Select Category</MenuItem>
                      {categories.map((c) => (
                        <MenuItem key={c._id} value={c._id}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      label='Shipping'
                      fullWidth
                      value={shipping}
                      onChange={handleChange('shipping')}
                    >
                      <MenuItem value=''>Select</MenuItem>
                      <MenuItem value='0'>No</MenuItem>
                      <MenuItem value='1'>Yes</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      label='Quantity'
                      type='number'
                      fullWidth
                      value={quantity}
                      onChange={handleChange('quantity')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary'>
                      Update Product
                    </Button>
                  </Grid>
                </Grid>
              </form>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {redirectUser()}
    </Layout>
  );
};

export default UpdateProduct;
