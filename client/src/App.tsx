import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Home, Snippet, Snippets } from './containers';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/snippets' component={Snippets} />
        <Route path='/snippet/:id' component={Snippet} />
      </Switch>
    </BrowserRouter>
  );
};
