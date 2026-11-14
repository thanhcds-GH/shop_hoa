import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Bao bọc App bằng Provider và truyền store vào */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

