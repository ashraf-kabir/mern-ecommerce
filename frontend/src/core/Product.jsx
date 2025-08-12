import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState('');

  const { productId } = useParams();

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setError('');
        listRelated(data._id).then((relatedData) => {
          if (relatedData.error) {
            setError(relatedData.error);
          } else {
            setRelatedProducts(relatedData);
          }
        });
      }
    });
  };

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

  return (
    <Layout
      title={product?.name || 'Product'}
      description={product?.description?.substring(0, 100) || ''}
      className='container-fluid'
    >
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {error && (
          <Alert severity='error' sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4} justifyContent='center'>
          <Grid item xs={12} md={5}>
            <Typography variant='h4' gutterBottom>
              Product Details
            </Typography>
            {product ? (
              <Card product={product} showViewProductButton={false} />
            ) : (
              <Typography>Loading product...</Typography>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant='h5' gutterBottom>
              Related Products
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {relatedProducts.length > 0 ? (
                relatedProducts.map((product, i) => (
                  <Card key={i} product={product} />
                ))
              ) : (
                <Typography>No related products found.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Product;
