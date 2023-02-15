import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Route
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { Provider } from "react-redux";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);


