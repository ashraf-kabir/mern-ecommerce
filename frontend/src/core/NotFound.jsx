import React, { Fragment } from 'react';
import Layout from './Layout';
import Copyright from './Copyright';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';

const NotFound = () => {
  return (
    <Layout
      title='Error: 404'
      description='Page Not Found'
      className='container-fluid'
    >
      <Typography variant='h3' gutterBottom>
        <WarningIcon style={{ fontSize: 50, color: '#FF7D00' }} /> Sorry, this
        page does not exist!
      </Typography>
      <Copyright />
    </Layout>
  );
};

export default NotFound;
