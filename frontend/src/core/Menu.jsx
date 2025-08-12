import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StoreIcon from '@mui/icons-material/Store';

// Styled components using MUI v5 styled API
const GrowDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const DesktopSection = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const MobileSection = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const isActive = (path, currentPath) => {
  return currentPath === path
    ? { color: '#ff9900', textDecoration: 'none' }
    : { color: '#ffffff', textDecoration: 'none' };
};

const MaterialAppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const currentPath = window.location.pathname;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignout = () => {
    signout(() => {
      navigate('/');
    });
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ backgroundColor: '#404040' }}
    >
      <MenuItem>
        <Link style={isActive('/', currentPath)} to='/'>
          <IconButton aria-label='Home' color='inherit'>
            <HomeIcon />
          </IconButton>
          Home
        </Link>
      </MenuItem>

      <MenuItem>
        <Link style={isActive('/shop', currentPath)} to='/shop'>
          <IconButton aria-label='Shop' color='inherit'>
            <StorefrontIcon />
          </IconButton>
          Shop
        </Link>
      </MenuItem>

      <MenuItem>
        <Link style={isActive('/cart', currentPath)} to='/cart'>
          <IconButton aria-label='Cart' color='inherit'>
            <Badge badgeContent={itemTotal()} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          Cart
        </Link>
      </MenuItem>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <MenuItem>
          <Link
            style={isActive('/user/dashboard', currentPath)}
            to='/user/dashboard'
          >
            <IconButton aria-label='Dashboard' color='inherit'>
              <DashboardIcon />
            </IconButton>
            Dashboard
          </Link>
        </MenuItem>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <MenuItem>
          <Link
            style={isActive('/admin/dashboard', currentPath)}
            to='/admin/dashboard'
          >
            <IconButton aria-label='Dashboard' color='inherit'>
              <DashboardIcon />
            </IconButton>
            Dashboard
          </Link>
        </MenuItem>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <MenuItem>
            <Link style={isActive('/signin', currentPath)} to='/signin'>
              <IconButton aria-label='Signin' color='inherit'>
                <AccountCircleIcon />
              </IconButton>
              Signin
            </Link>
          </MenuItem>

          <MenuItem>
            <Link style={isActive('/signup', currentPath)} to='/signup'>
              <IconButton aria-label='Signup' color='inherit'>
                <PersonAddIcon />
              </IconButton>
              Signup
            </Link>
          </MenuItem>
        </Fragment>
      )}

      {isAuthenticated() && (
        <MenuItem onClick={handleSignout}>
          <IconButton aria-label='Signout' color='inherit'>
            <ExitToAppIcon />
          </IconButton>
          Signout
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <GrowDiv>
      <AppBar position='fixed'>
        <Toolbar>
          <Link to='/' style={{ color: '#ffffff', textDecoration: 'none' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='brand'
              sx={{ mr: 2 }}
            >
              <StoreIcon />
            </IconButton>
          </Link>
          <Link to='/' style={{ color: '#ffffff', textDecoration: 'none' }}>
            <Typography variant='h6' noWrap component='div'>
              BRAND
            </Typography>
          </Link>

          <GrowDiv />
          <DesktopSection>
            <Link style={isActive('/', currentPath)} to='/'>
              <IconButton aria-label='Home' color='inherit' size='large'>
                <HomeIcon />
                <Typography noWrap sx={{ ml: 1 }}>
                  Home
                </Typography>
              </IconButton>
            </Link>

            <Link style={isActive('/shop', currentPath)} to='/shop'>
              <IconButton aria-label='Shop' color='inherit' size='large'>
                <StorefrontIcon />
                <Typography noWrap sx={{ ml: 1 }}>
                  Shop
                </Typography>
              </IconButton>
            </Link>

            <Link style={isActive('/cart', currentPath)} to='/cart'>
              <IconButton aria-label='Cart' color='inherit' size='large'>
                <Badge badgeContent={itemTotal()} color='secondary'>
                  <ShoppingCartIcon />
                </Badge>
                <Typography noWrap sx={{ ml: 1 }}>
                  Cart
                </Typography>
              </IconButton>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                style={isActive('/user/dashboard', currentPath)}
                to='/user/dashboard'
              >
                <IconButton aria-label='Dashboard' color='inherit' size='large'>
                  <DashboardIcon />
                  <Typography noWrap sx={{ ml: 1 }}>
                    Dashboard
                  </Typography>
                </IconButton>
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                style={isActive('/admin/dashboard', currentPath)}
                to='/admin/dashboard'
              >
                <IconButton aria-label='Dashboard' color='inherit' size='large'>
                  <DashboardIcon />
                  <Typography noWrap sx={{ ml: 1 }}>
                    Dashboard
                  </Typography>
                </IconButton>
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive('/signin', currentPath)} to='/signin'>
                  <IconButton aria-label='Signin' color='inherit' size='large'>
                    <AccountCircleIcon />
                    <Typography noWrap sx={{ ml: 1 }}>
                      Signin
                    </Typography>
                  </IconButton>
                </Link>

                <Link style={isActive('/signup', currentPath)} to='/signup'>
                  <IconButton aria-label='Signup' color='inherit' size='large'>
                    <PersonAddIcon />
                    <Typography noWrap sx={{ ml: 1 }}>
                      Signup
                    </Typography>
                  </IconButton>
                </Link>
              </Fragment>
            )}

            {isAuthenticated() && (
              <IconButton
                aria-label='Signout'
                color='inherit'
                size='large'
                onClick={handleSignout}
              >
                <ExitToAppIcon />
                <Typography noWrap sx={{ ml: 1 }}>
                  Signout
                </Typography>
              </IconButton>
            )}
          </DesktopSection>
          <MobileSection>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
              size='large'
            >
              <MoreIcon />
            </IconButton>
          </MobileSection>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </GrowDiv>
  );
};

export default MaterialAppBar;
