import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./global.scss"
import { AuthContextProvider } from './api/auth/authContext';


const rootEl = document.getElementById('root');
if (rootEl) {
  document.title = "HeartLink"
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
