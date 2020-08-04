import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

import Copyright from './Copyright';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home page'
      description='MERN E-commerce App'
      className='container-fluid'
    >
      <Search />
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <h2 className='mb-2'>New Arrivals</h2>
          <div className='row'>
            {productsByArrival.map((product, i) => (
              <div key={i} className='col-md-4 col-sm-12'>
                <Card product={product} />
              </div>
            ))}
          </div>

          <h2 className='mb-2 mt-4'>Best Sellers</h2>
          <div className='row'>
            {productsBySell.map((product, i) => (
              <div key={i} className='col-md-4 col-sm-12'>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>

      <Copyright />
    </Layout>
  );
};

export default Home;
