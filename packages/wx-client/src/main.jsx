import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import wxconfig from './wechat/wxconfig';

async function initializeApp() {
  // TODO: initialize app
  await wxconfig();
}

initializeApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
