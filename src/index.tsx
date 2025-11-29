import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { getModule, getStoreBasePath } from "./utils";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
const module = getModule();

root.render(
  <React.StrictMode>
    <BrowserRouter
      basename={module === "storefront" ? getStoreBasePath() : undefined}
    >
      {/* <BrowserRouter> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
