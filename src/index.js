import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { startMirage } from './server'

/* As the app detects the development environment, the server is started */
if (process.env.NODE_ENV === 'development') {
  startMirage()
}

ReactDOM.render(<App />, document.getElementById('root'));