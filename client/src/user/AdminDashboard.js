import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/categories'>
              Category List
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Add Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Add Product
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/orders'>
              View Orders
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/products'>
              Manage Products
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/users'>
              Manage Users
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
