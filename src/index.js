import React from "react";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
// src/main.js or src/main.ts

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
