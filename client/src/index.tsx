import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider, SnippetsContextProvider } from './store';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SnippetsContextProvider>
          <App />
        </SnippetsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
