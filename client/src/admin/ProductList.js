import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getProducts } from './apiAdmin';

const ProductList = () => {
  const { user } = isAuthenticated();
  const [products, setProducts] = React.useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  React.useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Product List'
      description={`Hey ${user.name} ready to manage products?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h2 className='text-center'>Total {products.length} products</h2>
          <hr />
          <ul className='list-group'>
            {products.length > 0 ? (
              products.map((p, i) => (
                <li key={i} className='list-group-item'>
                  {p.name}
                </li>
              ))
            ) : (
              <h4 className='text-center'>No products found</h4>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
