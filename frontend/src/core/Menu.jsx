import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Home,
  Storefront,
  Dashboard,
  AccountCircle,
  PersonAdd,
  ExitToApp,
  Store,
  Menu as MenuIcon,
} from '@mui/icons-material';

const MaterialAppBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
  const currentPath = window.location.pathname;

  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const handleSignout = () => {
    signout(() => {
      navigate('/');
    });
    handleMobileMenuClose();
  };

  const isActive = (path) => currentPath === path;

  // Navigation items data
  const navItems = [
    { path: '/', label: 'Home', icon: <Home />, show: true },
    { path: '/shop', label: 'Shop', icon: <Storefront />, show: true },
    {
      path: '/cart',
      label: 'Cart',
      icon: (
        <Badge badgeContent={itemTotal()} color='error'>
          <ShoppingCart />
        </Badge>
      ),
      show: true,
    },
    {
      path: '/user/dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      show: isAuthenticated() && isAuthenticated().user.role === 0,
    },
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <Dashboard />,
      show: isAuthenticated() && isAuthenticated().user.role === 1,
    },
    {
      path: '/signin',
      label: 'Sign In',
      icon: <AccountCircle />,
      show: !isAuthenticated(),
    },
    {
      path: '/signup',
      label: 'Sign Up',
      icon: <PersonAdd />,
      show: !isAuthenticated(),
    },
  ];

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {navItems.map(
        (item) =>
          item.show && (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: 'white',
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                backgroundColor: isActive(item.path)
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              {item.label}
            </Button>
          )
      )}
      {isAuthenticated() && (
        <Button
          onClick={handleSignout}
          startIcon={<ExitToApp />}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Sign Out
        </Button>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Menu
      anchorEl={mobileAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        },
      }}
      MenuListProps={{
        sx: {
          padding: 0,
        },
      }}
    >
      {navItems.map(
        (item) =>
          item.show && (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMobileMenuClose}
              sx={{
                backgroundColor: isActive(item.path)
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          )
      )}
      {isAuthenticated() && (
        <>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <MenuItem
            onClick={handleSignout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary='Sign Out' />
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <AppBar
      position='fixed'
      elevation={4}
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='brand'
            component={Link}
            to='/'
            sx={{ mr: 1 }}
          >
            <Store />
          </IconButton>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'white',
            }}
          >
            BRAND
          </Typography>
        </Box>

        {!isMobile ? (
          renderDesktopNav()
        ) : (
          <IconButton
            color='inherit'
            aria-label='open menu'
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {isMobile && renderMobileMenu()}
    </AppBar>
  );
};

export default MaterialAppBar;
