import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import "./index.css";
import "./navbar.css";
import App from "./App.tsx";

// Product analytics (PostHog). The key lives in VITE_POSTHOG_KEY
// (.env locally, Pages build env in production) and is never committed.
// Skipped under automation (e.g. the prerender snapshot) so headless
// loads never pollute real traffic.
if (!navigator.webdriver && import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY as string, {
    api_host: "https://us.i.posthog.com",
    defaults: "2025-05-24",
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
