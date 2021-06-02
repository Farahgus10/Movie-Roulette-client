import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Contexts/UserContext'
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    {/* <UserContext> */}
      <App />
    {/* </UserContext> */}
  </BrowserRouter>,
  document.getElementById('root')
);


