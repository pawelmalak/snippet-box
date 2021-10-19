import { AuthForm } from '../components/Auth';
import { Card, Layout } from '../components/UI';

export const Auth = (): JSX.Element => {
  return (
    <Layout>
      <div className='col-12 col-md-6 mx-auto'>
        <Card>
          <AuthForm />
        </Card>
      </div>
    </Layout>
  );
};
