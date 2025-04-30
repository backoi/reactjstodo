import App from "./App.jsx";
import "./App.css";
import ReactDOM from "react-dom/client";
import MyComponent from "./component/counter.jsx";
import { StrictMode } from "react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
