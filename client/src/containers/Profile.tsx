import { Fragment, useContext } from 'react';
import { AuthContext } from '../store';
import { Button, Card, Layout } from '../components/UI';
import { dateParser } from '../utils';

export const Profile = (): JSX.Element => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Layout>
      <div className='col-12 col-md-5'>
        <Card title='User profile'>
          {!user ? (
            <span>Loading...</span>
          ) : (
            <Fragment>
              <hr />
              <div className='d-flex justify-content-between'>
                <span>Email</span>
                <span className='text-success'>{user.email}</span>
              </div>

              <div className='d-flex justify-content-between'>
                <span>Role</span>
                <span className='text-success'>{user.role}</span>
              </div>

              <div className='d-flex justify-content-between'>
                <span>Created</span>
                <span className='text-success'>
                  {dateParser(user.createdAt).relative}
                </span>
              </div>

              <hr />
              <div className='d-grid'>
                <Button
                  text='Logout'
                  color='secondary'
                  outline
                  small
                  handler={logout}
                />
              </div>
            </Fragment>
          )}
        </Card>
      </div>
    </Layout>
  );
};
