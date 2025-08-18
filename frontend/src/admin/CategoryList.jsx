import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { getCategories } from './apiAdmin';

const CategoryList = () => {
  const { user } = isAuthenticated();

  const [categories, setCategories] = React.useState([]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  React.useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title='Category List'
      description={`Hey ${user.name} ready to manage categories?`}
    >
      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader
              title='Category List'
              sx={{
                bgcolor: 'background.paper',
              }}
            />
            <Divider />
            <CardContent>
              <List dense>
                {categories.map((category) => (
                  <ListItem key={category._id}>
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CategoryList;
