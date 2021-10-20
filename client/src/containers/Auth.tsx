import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../store';
import { AuthForm } from '../components/Auth';
import { Card, Layout } from '../components/UI';

export const Auth = (): JSX.Element => {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <div className='col-12 col-md-8 mx-auto'>
        <Card>
          <AuthForm />
        </Card>
      </div>
    </Layout>
  );
};
