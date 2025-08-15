import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { getUsers } from './apiAdmin';

const UsersList = () => {
  const { user } = isAuthenticated();
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    getUsers(user._id, user.token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Users List'
      description={`Hey ${user.name}, ready to manage users?`}
    >
      <Grid container spacing={2}>
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader
              title={`Total Users: ${users.length}`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent>
              {users.length === 0 ? (
                <Typography
                  variant='body1'
                  color='text.secondary'
                  align='center'
                >
                  No users found.
                </Typography>
              ) : (
                <List>
                  {users.map((u, i) => (
                    <React.Fragment key={u._id || i}>
                      <ListItem>
                        <ListItemText
                          primary={u.name}
                          secondary={u.email}
                          primaryTypographyProps={{ fontWeight: 'bold' }}
                        />
                      </ListItem>
                      {i < users.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UsersList;
