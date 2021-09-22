import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Editor, Home, Snippet, Snippets } from './containers';
import { SnippetsContextProvider } from './store';

export const App = () => {
  return (
    <BrowserRouter>
      <SnippetsContextProvider>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/snippets' component={Snippets} />
          <Route path='/snippet/:id' component={Snippet} />
          <Route path='/editor/:id?' component={Editor} />
        </Switch>
      </SnippetsContextProvider>
    </BrowserRouter>
  );
};
