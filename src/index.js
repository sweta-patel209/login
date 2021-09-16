import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from '../src/State/Store'
//import configureStore from ''
//you need to import this for bootrap use after giving npm i react-bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

let user = localStorage.getItem('User')
let token = localStorage.getItem('token')

// export const store = configureStore({
//   auth: {
//     isAuthenticated: !!user,
//     session: { user, token },
//   }
// })
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
