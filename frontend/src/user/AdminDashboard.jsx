import React from 'react';
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
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import {
  Category as CategoryIcon,
  AddCircle as AddCircleIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = [
    { text: 'Category List', to: '/admin/categories', icon: <CategoryIcon /> },
    { text: 'Add Category', to: '/create/category', icon: <AddCircleIcon /> },
    { text: 'Add Product', to: '/create/product', icon: <AddCircleIcon /> },
    { text: 'View Orders', to: '/admin/orders', icon: <ShoppingBasketIcon /> },
    { text: 'Manage Products', to: '/admin/products', icon: <InventoryIcon /> },
    { text: 'Manage Users', to: '/admin/users', icon: <PeopleIcon /> },
  ];

  return (
    <Layout title="Admin Dashboard" description={`Welcome, ${name}`}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Admin Links Section */}
          <Grid item xs={12} md={3}>
            <Card elevation={3}>
              <CardHeader 
                title="Admin Actions" 
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ bgcolor: 'primary.main', color: 'common.white' }}
              />
              <Divider />
              <List>
                {adminLinks.map((link, index) => (
                  <React.Fragment key={link.text}>
                    <ListItem 
                      button 
                      component={Link} 
                      to={link.to}
                      sx={{
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText primary={link.text} />
                    </ListItem>
                    {index < adminLinks.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Admin Info Section */}
          <Grid item xs={12} md={9}>
            <Card elevation={3}>
              <CardHeader 
                title="Admin Profile" 
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ bgcolor: 'background.paper' }}
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
                      fontSize: '2rem'
                    }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" component="div">
                      {name}
                    </Typography>
                    <Chip
                      label={role === 1 ? 'Administrator' : 'Registered User'}
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PersonIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="User ID" secondary={_id} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Email" secondary={email} />
                    </ListItem>
                  </List>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;