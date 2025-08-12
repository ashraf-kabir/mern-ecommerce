import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getUsers } from './apiAdmin';

const UsersList = () => {
  const { user } = isAuthenticated();

  const [users, setUsers] = React.useState([]);

  const loadUsers = () => {
    getUsers(user._id, user.token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Users List'
      description={`Hey ${user.name} ready to manage users?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h2 className='text-center'>Total {users.length} users</h2>
          <hr />
          <ul className='list-group'>
            {users.length > 0 ? (
              users.map((u, i) => (
                <li key={i} className='list-group-item'>
                  {u.name}
                </li>
              ))
            ) : (
              <h4 className='text-center'>No users found</h4>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default UsersList;
