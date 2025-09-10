import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import SecureWrapper from './SecureWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SecureWrapper>
      <App />
    </SecureWrapper>
  </React.StrictMode>,
);
