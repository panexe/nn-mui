import * as React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme';

import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  
  document.querySelector('#root'),
);
