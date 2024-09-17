import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./global.scss"
import { AuthContextProvider } from './api/auth/authContext';
import Notification from './app/components/Notification/Notification';

const rootEl = document.getElementById('root');
if (rootEl) {
  document.title = "HeartLink"
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Notification>
        <BrowserRouter>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </BrowserRouter>
      </Notification>
    </React.StrictMode>,
  );
}
