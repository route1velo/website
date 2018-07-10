import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'babel-polyfill';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
