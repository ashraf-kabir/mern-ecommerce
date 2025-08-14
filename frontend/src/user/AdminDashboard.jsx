import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Grid,
  Paper,
} from '@mui/material';
import {
  Category as CategoryIcon,
  AddCircle as AddCircleIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';

const adminLinks = [
  { text: 'Category List', to: '/admin/categories', icon: <CategoryIcon /> },
  { text: 'Add Category', to: '/create/category', icon: <AddCircleIcon /> },
  { text: 'Add Product', to: '/create/product', icon: <AddCircleIcon /> },
  { text: 'View Orders', to: '/admin/orders', icon: <ShoppingBasketIcon /> },
  { text: 'Manage Products', to: '/admin/products', icon: <InventoryIcon /> },
  { text: 'Manage Users', to: '/admin/users', icon: <PeopleIcon /> },
];

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  return (
    <Layout title='Admin Dashboard' description={`Welcome, ${name}`}>
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
                    button
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
              title='Admin Profile'
              sx={{
                bgcolor: 'background.paper',
              }}
            />
            <Divider />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 3,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant='h5' component='div'>
                    {name}
                  </Typography>
                  <Chip
                    label={role === 1 ? 'Administrator' : 'Registered User'}
                    color='primary'
                    size='small'
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Paper elevation={0} sx={{ bgcolor: 'background.default' }}>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PersonIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='User ID' secondary={_id} />
                  </ListItem>
                  <Divider component='li' />
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EmailIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Email' secondary={email} />
                  </ListItem>
                </List>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
