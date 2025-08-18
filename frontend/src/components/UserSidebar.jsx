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
  Dashboard as DashboardIcon,
  ShoppingCart as CartIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';

const UserSidebar = ({ userId }) => {
  const LINKS = [
    { text: 'Dashboard', to: '/user/dashboard', icon: <DashboardIcon /> },
    { text: 'My Cart', to: '/cart', icon: <CartIcon /> },
    { text: 'Update Profile', to: `/profile/${userId}`, icon: <ProfileIcon /> },
  ];

  return (
    <Grid size={{ xs: 12, md: 3 }}>
      <Card elevation={3}>
        <CardHeader
          title='User Menu'
          titleTypographyProps={{ variant: 'h6' }}
          sx={{ bgcolor: 'primary.main', color: 'common.white' }}
        />
        <Divider />
        <List dense>
          {LINKS.map((link, index) => (
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
              {index < LINKS.length - 1 && <Divider component='li' />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Grid>
  );
};

export default UserSidebar;
