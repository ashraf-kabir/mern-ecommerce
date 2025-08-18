import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from './apiUser';
import UserSidebar from '../components/UserSidebar';

const Profile = () => {
  const { userId } = useParams();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { _id, token } = isAuthenticated();
  const { name, email, password, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    if (userId) {
      init(userId);
    } else if (_id) {
      init(_id);
    }
  }, [userId, _id, token]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const updateId = userId || _id;
    update(updateId, token, { name, email, password }).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Navigate to='/user/dashboard' />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Update Profile
        </Typography>
        <Box component='form' onSubmit={clickSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Name'
            variant='outlined'
            onChange={handleChange('name')}
            value={name}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Email'
            type='email'
            variant='outlined'
            onChange={handleChange('email')}
            value={email}
            disabled
          />
          <TextField
            fullWidth
            margin='normal'
            label='Password'
            type='password'
            variant='outlined'
            onChange={handleChange('password')}
            value={password}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Layout
      title='Profile'
      description='Update your profile'
      className='container-fluid'
    >
      <Grid container spacing={3}>
        {/* LEFT SIDEBAR */}
        <UserSidebar userId={_id} />

        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          {profileUpdate(name, email, password)}
          {redirectUser(success)}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
