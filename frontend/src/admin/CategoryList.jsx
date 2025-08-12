import React from 'react';
import Layout from '../core/Layout';
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
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h2 className='text-center'>Total {categories.length} categories</h2>
          <hr />
          <ul className='list-group'>
            {categories.length > 0 ? (
              categories.map((c, i) => (
                <li key={i} className='list-group-item'>
                  {c.name}
                </li>
              ))
            ) : (
              <h4 className='text-center'>No categories found</h4>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryList;
