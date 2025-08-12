import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Layout from '../core/Layout.jsx';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Copyright from '../core/Copyright.jsx';
import { signin, authenticate, isAuthenticated } from '../auth/index.js';

// Create styled components using MUI v5 styled API
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const FormContainer = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
    rememberMe: false,
  });

  const { email, password, loading, error, redirectToReferrer, rememberMe } =
    values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    const value =
      name === 'rememberMe' ? event.target.checked : event.target.value;
    setValues({ ...values, error: '', [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    signin({ email, password, rememberMe }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () =>
    error && (
      <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
        {error}
      </Alert>
    );

  const showLoading = () =>
    loading && (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <CircularProgress />
      </Box>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to='/admin/dashboard' />;
      } else {
        return <Navigate to='/user/dashboard' />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to='/' />;
    }
  };

  return (
    <Layout
      title='Signin page'
      description='Signin to MERN E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showError()}
          {showLoading()}
          {redirectUser()}

          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>

          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <FormContainer onSubmit={clickSubmit} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={handleChange('email')}
              type='email'
              value={email}
              autoFocus
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={handleChange('password')}
              value={password}
              autoComplete='current-password'
            />

            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  checked={rememberMe}
                  onChange={handleChange('rememberMe')}
                />
              }
              label='Remember me'
            />

            <SubmitButton
              type='submit'
              fullWidth
              variant='contained'
              disabled={loading}
            >
              Sign In
            </SubmitButton>

            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography variant='body2'>
                  <Link to='/forgot-password' variant='body2'>
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='body2'>
                  {"Don't have an account? "}
                  <Link to='/signup' variant='body2'>
                    {'Sign Up'}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </FormContainer>
        </Box>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}
