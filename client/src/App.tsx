import { Fragment, useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Editor, Home, Snippet, Snippets, Auth } from './containers';
import { ProtectedRoute } from './utils';
import { AuthContext } from './store';

export const App = () => {
  const { autoLogin } = useContext(AuthContext);

  useEffect(() => {
    // autoLogin();
    // const checker = setInterval(() => {
    //   autoLogin();
    //   console.log('cake');
    // }, 1000);
    // return () => window.clearInterval(checker);
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/snippets' component={Snippets} />
        <Route path='/snippet/:id' component={Snippet} />
        <Route path='/snippet/:id' component={Snippet} />
        <Route path='/auth' component={Auth} />
        <ProtectedRoute path='/editor/:id?' component={Editor} />
      </Switch>
    </Fragment>
  );
};
