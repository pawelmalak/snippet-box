import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import { App } from './App';
import { SnippetsContextProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
    <SnippetsContextProvider>
      <App />
    </SnippetsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
