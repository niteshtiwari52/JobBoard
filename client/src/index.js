import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

if (localStorage.JBUser) {
  const { token } = JSON.parse(localStorage.JBUser);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

