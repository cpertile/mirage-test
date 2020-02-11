import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { startMirage } from './server'

if (process.env.NODE_ENV === 'development') {
  startMirage()
}

ReactDOM.render(<App />, document.getElementById('root'));