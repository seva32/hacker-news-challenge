/* eslint-disable no-undef */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.hydrate(
  <BrowserRouter>
    <div>Hacker News</div>
  </BrowserRouter>,
  document.querySelector('#root')
);
