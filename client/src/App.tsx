import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Editor, Home, Snippet, Snippets, Auth } from './containers';
import { AuthContextProvider, SnippetsContextProvider } from './store';
import { ProtectedRoute } from './utils';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <SnippetsContextProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/snippets' component={Snippets} />
            <Route path='/snippet/:id' component={Snippet} />
            <Route path='/snippet/:id' component={Snippet} />
            <Route path='/auth' component={Auth} />
            <ProtectedRoute path='/editor/:id?' component={Editor} />
          </Switch>
        </SnippetsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};
