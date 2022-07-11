import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Netconfig from "./routes/netconfig";
import Dataset from "./routes/dataset";
import Netconfig_copy from './routes/netconfig_copy.jsx';
import Labeling from './routes/labeling';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='netconfig' element={<Netconfig />} />
      <Route path='netconfig_copy' element={<Netconfig_copy />} />
      <Route path='dataset' element={<Dataset />} />
      <Route path='labeling' element={<Labeling />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
