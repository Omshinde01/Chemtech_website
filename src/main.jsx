import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { matchPage } from "./routes";
import "./index.css";

const container = document.getElementById("root");
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>;

// After a deploy, a tab on an old build may ask for a chunk that's gone: reload once.
window.addEventListener("vite:preloadError", (e) => {
  if (sessionStorage.getItem("reloaded")) return;
  sessionStorage.setItem("reloaded", "1");
  e.preventDefault();
  window.location.reload();
});

matchPage(window.location.pathname).preload().catch(() => {}).then(() => {
  if (container.firstElementChild) hydrateRoot(container, app);
  else createRoot(container).render(app);
});
