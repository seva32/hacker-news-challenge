/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';
import Routes from './Routes';

ReactDOM.hydrate(
  <BrowserRouter>
    <div>{renderRoutes(Routes)}</div>
  </BrowserRouter>,
  document.querySelector('#root')
);
