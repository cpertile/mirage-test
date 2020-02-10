import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeServer } from './server'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

ReactDOM.render(<App />, document.getElementById('root'));