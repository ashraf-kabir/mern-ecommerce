import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Typography,
} from '@mui/material';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: null,
    loading: false,
    error: '',
    createdProduct: '',
    formData: new FormData(),
  });

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    category: false,
    shipping: false,
    quantity: false,
    photo: false,
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  // Form validation
  const validate = () => {
    return (
      name.trim() !== '' &&
      description.trim() !== '' &&
      price > 0 &&
      category !== '' &&
      shipping !== '' &&
      quantity > 0 &&
      formData.get('photo') !== null
    );
  };

  const isFormValid = validate();

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;

    // Update formData
    const newFormData = new FormData();
    for (let [key, val] of formData.entries()) {
      if (key !== name) {
        newFormData.set(key, val);
      }
    }
    if (value !== undefined && value !== null) {
      newFormData.set(name, value);
    }

    setValues({
      ...values,
      [name]: value,
      formData: newFormData,
      error: '',
    });

    // Mark field as touched
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: null,
          price: '',
          quantity: '',
          category: '',
          shipping: '',
          loading: false,
          createdProduct: data.name,
          formData: new FormData(),
        });
        setTouched({
          name: false,
          description: false,
          price: false,
          category: false,
          shipping: false,
          quantity: false,
          photo: false,
        });
      }
    });
  };

  const newPostForm = () => (
    <Box component='form' onSubmit={clickSubmit} sx={{ fullWidth: true }}>
      <Box sx={{ mb: 3 }}>
        <Button
          variant='outlined'
          component='label'
          fullWidth
          color={touched.photo && !formData.get('photo') ? 'error' : 'primary'}
        >
          Upload Product Photo
          <input
            type='file'
            name='photo'
            accept='image/*'
            onChange={handleChange('photo')}
            onBlur={handleBlur('photo')}
            hidden
          />
        </Button>
        {touched.photo && !formData.get('photo') && (
          <FormHelperText error>Product photo is required</FormHelperText>
        )}
      </Box>

      <TextField
        label='Product Name'
        variant='outlined'
        fullWidth
        margin='normal'
        value={name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={touched.name && name.trim() === ''}
        helperText={
          touched.name && name.trim() === '' ? 'Product name is required' : ''
        }
        required
      />

      <TextField
        label='Description'
        variant='outlined'
        fullWidth
        margin='normal'
        multiline
        rows={4}
        value={description}
        onChange={handleChange('description')}
        onBlur={handleBlur('description')}
        error={touched.description && description.trim() === ''}
        helperText={
          touched.description && description.trim() === ''
            ? 'Description is required'
            : ''
        }
        required
      />

      <TextField
        label='Price'
        variant='outlined'
        fullWidth
        margin='normal'
        type='number'
        value={price}
        onChange={handleChange('price')}
        onBlur={handleBlur('price')}
        error={touched.price && (price === '' || price <= 0)}
        helperText={
          touched.price && (price === '' || price <= 0)
            ? 'Price must be greater than 0'
            : ''
        }
        required
        inputProps={{ min: 0, step: 0.01 }}
      />

      <FormControl
        fullWidth
        margin='normal'
        error={touched.category && category === ''}
      >
        <InputLabel id='category-label'>Category *</InputLabel>
        <Select
          labelId='category-label'
          value={category}
          label='Category *'
          onChange={handleChange('category')}
          onBlur={handleBlur('category')}
        >
          <MenuItem value=''>
            <em>Select a category</em>
          </MenuItem>
          {categories.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
        {touched.category && category === '' && (
          <FormHelperText>Category is required</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        margin='normal'
        error={touched.shipping && shipping === ''}
      >
        <InputLabel id='shipping-label'>Shipping *</InputLabel>
        <Select
          labelId='shipping-label'
          value={shipping}
          label='Shipping *'
          onChange={handleChange('shipping')}
          onBlur={handleBlur('shipping')}
        >
          <MenuItem value=''>
            <em>Select shipping option</em>
          </MenuItem>
          <MenuItem value='0'>No</MenuItem>
          <MenuItem value='1'>Yes</MenuItem>
        </Select>
        {touched.shipping && shipping === '' && (
          <FormHelperText>Shipping option is required</FormHelperText>
        )}
      </FormControl>

      <TextField
        label='Quantity'
        variant='outlined'
        fullWidth
        margin='normal'
        type='number'
        value={quantity}
        onChange={handleChange('quantity')}
        onBlur={handleBlur('quantity')}
        error={touched.quantity && (quantity === '' || quantity <= 0)}
        helperText={
          touched.quantity && (quantity === '' || quantity <= 0)
            ? 'Quantity must be greater than 0'
            : ''
        }
        required
        inputProps={{ min: 0 }}
      />

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        size='large'
        sx={{ mt: 3 }}
        disabled={!isFormValid || loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Create Product'}
      </Button>
    </Box>
  );

  return (
    <Layout
      title='Add a new product'
      description={`Hey ${user.name}, ready to add a new product?`}
    >
      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <AdminSidebar />
  
        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader
              title='Add New Product'
              sx={{
                bgcolor: 'background.paper',
              }}
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  alignItems: 'flex-start',
                  width: '100%',
                }}
              >
                {error && (
                  <Alert severity='error' sx={{ width: '100%' }}>
                    {error}
                  </Alert>
                )}

                {createdProduct && (
                  <Alert severity='success' sx={{ width: '100%' }}>
                    <Typography variant='h6'>
                      {`${createdProduct}`} has been created successfully!
                    </Typography>
                  </Alert>
                )}

                {loading && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {newPostForm()}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddProduct;
