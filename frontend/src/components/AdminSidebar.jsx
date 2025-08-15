import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
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

const adminLinks = [
  { text: 'Category List', to: '/admin/categories', icon: <CategoryIcon /> },
  { text: 'Add Category', to: '/create/category', icon: <AddCircleIcon /> },
  { text: 'Add Product', to: '/create/product', icon: <AddCircleIcon /> },
  { text: 'View Orders', to: '/admin/orders', icon: <ShoppingBasketIcon /> },
  { text: 'Manage Products', to: '/admin/products', icon: <InventoryIcon /> },
  { text: 'Manage Users', to: '/admin/users', icon: <PeopleIcon /> },
];

const AdminSidebar = () => {
  return (
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
  );
};

export default AdminSidebar;
