import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Layout from '../core/Layout';
import AdminSidebar from '../components/AdminSidebar';
import { isAuthenticated } from '../auth';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Manage Products'
      description={`Hey ${user.name}, you can manage all the products here`}
    >
      <Grid container spacing={2}>
        {/* LEFT SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Card elevation={3}>
            <CardHeader
              title={`Total Products: ${products.length}`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent>
              {products.length === 0 ? (
                <Typography variant='body1' color='text.secondary'>
                  No products found.
                </Typography>
              ) : (
                <List>
                  {products.map((p, i) => (
                    <React.Fragment key={p._id}>
                      <ListItem
                        secondaryAction={
                          <>
                            <Tooltip title='Edit'>
                              <IconButton
                                component={Link}
                                to={`/admin/product/update/${p._id}`}
                                color='primary'
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete'>
                              <IconButton
                                color='error'
                                onClick={() => destroy(p._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        }
                      >
                        <ListItemText
                          primary={p.name}
                          primaryTypographyProps={{ fontWeight: 'bold' }}
                        />
                      </ListItem>
                      {i < products.length - 1 && <Divider />}
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

export default ManageProducts;
