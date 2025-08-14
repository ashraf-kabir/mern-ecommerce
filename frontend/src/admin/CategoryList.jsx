import React from 'react';
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
import { getCategories } from './apiAdmin';

const adminLinks = [
  { text: 'Category List', to: '/admin/categories', icon: <CategoryIcon /> },
  { text: 'Add Category', to: '/create/category', icon: <AddCircleIcon /> },
  { text: 'Add Product', to: '/create/product', icon: <AddCircleIcon /> },
  { text: 'View Orders', to: '/admin/orders', icon: <ShoppingBasketIcon /> },
  { text: 'Manage Products', to: '/admin/products', icon: <InventoryIcon /> },
  { text: 'Manage Users', to: '/admin/users', icon: <PeopleIcon /> },
];

const CategoryList = () => {
  const { user } = isAuthenticated();

  const [categories, setCategories] = React.useState([]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  React.useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title='Category List'
      description={`Hey ${user.name} ready to manage categories?`}
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
              title='Category List'
              sx={{
                bgcolor: 'background.paper',
              }}
            />
            <Divider />
            <CardContent>
              <List dense>
                {categories.map((category) => (
                  <ListItem key={category._id}>
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CategoryList;
