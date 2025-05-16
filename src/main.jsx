import App from "./App.jsx";
import "./App.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./component/ThemeContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
