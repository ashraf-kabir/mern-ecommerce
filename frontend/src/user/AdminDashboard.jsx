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
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  return (
    <Layout title='Admin Dashboard' description={`Welcome, ${name}`}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <AdminSidebar />

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
