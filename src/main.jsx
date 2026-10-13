import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import CursorGlow from "./components/CursorGlow.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <CursorGlow />
  </StrictMode>,
);
