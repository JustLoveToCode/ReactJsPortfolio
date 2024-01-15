import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

// dev-vodp3xp2np7eyj8v.us.auth0.com
// YAPKCkZ1fCbjD50sKRrAaonykcW3Tson

const root = ReactDOM.createRoot(document.getElementById('root'));
// This is the domain:
// dev-vodp3xp2np7eyj8v.us.auth0.com
// This is the clientId
// YAPKCkZ1fCbjD50sKRrAaonykcW3Tson
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-vodp3xp2np7eyj8v.us.auth0.com"
    clientId="YAPKCkZ1fCbjD50sKRrAaonykcW3Tson"
    redirectUri={window.location.origin}
    // Persist the Username in the LocalStorage:
    cacheLocation='localstorage'>
       <GithubProvider>
                   <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
