import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import Routing from "./Routing.jsx";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Spin spinning />}>
        <Routing />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
