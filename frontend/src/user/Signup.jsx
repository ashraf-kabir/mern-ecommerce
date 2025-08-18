import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Copyright from '../core/Copyright.jsx';
import Layout from '../core/Layout.jsx';
import { signup } from '../auth/index.js';

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
  padding: theme.spacing(1.5),
}));

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    loading: false,
  });

  const { name, email, password, success, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: '', [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
          loading: false,
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

  const showSuccess = () =>
    success && (
      <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
        New account created successfully! Please{' '}
        <Link to='/signin'>Sign In</Link>.
      </Alert>
    );

  return (
    <Layout
      title='Signup page'
      description='Signup to MERN E-commerce App'
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
          {showSuccess()}
          {showError()}

          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>

          <Typography component='h1' variant='h5'>
            Create Account
          </Typography>

          <FormContainer onSubmit={clickSubmit} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Full Name'
              name='name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={handleChange('name')}
              sx={{ mb: 2 }}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              value={email}
              onChange={handleChange('email')}
              sx={{ mb: 2 }}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
              value={password}
              onChange={handleChange('password')}
              inputProps={{ minLength: 6 }}
              sx={{ mb: 2 }}
            />

            <SubmitButton
              type='submit'
              fullWidth
              variant='contained'
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </SubmitButton>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Typography variant='body2'>
                  Already have an account? <Link to='/signin'>Sign in</Link>
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
