import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Avatar,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';
import Layout from '../core/Layout';
import UserSidebar from '../components/UserSidebar';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    init(_id, token);
  }, [_id, token]);

  const UserLinksCard = () => (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardHeader
        title='User Actions'
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <List>
        <ListItem button component={Link} to='/cart'>
          <ListItemText primary='My Cart' />
        </ListItem>
        <Divider component='li' />
        <ListItem button component={Link} to={`/profile/${_id}`}>
          <ListItemText primary='Update Profile' />
        </ListItem>
      </List>
    </Card>
  );

  const UserInfoCard = () => (
    <Card elevation={4} sx={{ borderRadius: 3, mb: 3 }}>
      <CardHeader
        title='User Information'
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              mr: 2,
              width: 48,
              height: 48,
              fontSize: 22,
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant='h6'>{name}</Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemText primary='Email' secondary={email} />
          </ListItem>
          <Divider component='li' />
          <ListItem>
            <ListItemText
              primary='Role'
              secondary={
                <Chip
                  label={role === 1 ? 'Admin' : 'Registered User'}
                  color={role === 1 ? 'primary' : 'default'}
                  size='small'
                />
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  const PurchaseHistoryCard = () => (
    <Card elevation={4} sx={{ borderRadius: 3 }}>
      <CardHeader
        title='Purchase History'
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Typography>Loading history...</Typography>
        ) : history.length === 0 ? (
          <Typography>No purchase history found</Typography>
        ) : (
          <List>
            {history.map((h, i) => (
              <React.Fragment key={i}>
                {h.products.map((p, j) => (
                  <Paper
                    key={j}
                    elevation={2}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.01)' },
                    }}
                  >
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='subtitle1' fontWeight='bold'>
                          {p.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          ${p.price.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ textAlign: { xs: 'left', sm: 'right' } }}
                      >
                        <Typography variant='caption' color='text.secondary'>
                          Purchased {moment(p.createdAt).fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout title='Dashboard' description={`Welcome back, ${name}`}>
      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <UserSidebar userId={_id} />

        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <UserInfoCard />
          <PurchaseHistoryCard />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
