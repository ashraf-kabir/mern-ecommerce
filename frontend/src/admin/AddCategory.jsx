import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import {
  Category as CategoryIcon,
  AddCircle as AddCircleIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';

const adminLinks = [
  { text: 'Category List', to: '/admin/categories', icon: <CategoryIcon /> },
  { text: 'Add Category', to: '/create/category', icon: <AddCircleIcon /> },
  { text: 'Add Product', to: '/create/product', icon: <AddCircleIcon /> },
  { text: 'View Orders', to: '/admin/orders', icon: <ShoppingBasketIcon /> },
  { text: 'Manage Products', to: '/admin/products', icon: <InventoryIcon /> },
  { text: 'Manage Users', to: '/admin/users', icon: <PeopleIcon /> },
];

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <Box
      component='form'
      onSubmit={clickSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        width: '100%',
      }}
    >
      <TextField
        label='Category Name'
        variant='outlined'
        value={name}
        onChange={handleChange}
        autoFocus
        required
        fullWidth
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ alignSelf: 'flex-start', px: 4 }}
      >
        Create Category
      </Button>
    </Box>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <Alert severity='success' sx={{ width: '100%' }}>
          Category <strong>{name}</strong> has been created successfully!
        </Alert>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <Alert severity='error' sx={{ width: '100%' }}>
          Category should be unique.
        </Alert>
      );
    }
  };
  const goBack = () => (
    <Button
      component={Link}
      to='/admin/dashboard'
      variant='outlined'
      color='warning'
      sx={{ mt: 2 }}
    >
      Back to Dashboard
    </Button>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Hey ${user.name}, ready to add a new category?`}
    >
      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card elevation={3}>
            <CardHeader
              title='Admin Actions'
              titleTypographyProps={{ variant: 'h6' }}
              sx={{ bgcolor: 'primary.main', color: 'common.white' }}
            />
            <Divider />
            <List dense>
              {adminLinks.map((link, index) => (
                <React.Fragment key={link.text}>
                  <ListItem
                    component={Link}
                    to={link.to}
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                  {index < adminLinks.length - 1 && <Divider component='li' />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader
              title='Add New Category'
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
                  maxWidth: 500,
                  width: '100%',
                }}
              >
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddCategory;
