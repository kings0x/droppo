import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import "./index.css";
import "./navbar.css";
import App from "./App.tsx";

// Product analytics (PostHog). The public project token lives in
// VITE_POSTHOG_KEY (.env locally, Pages build env in production) and is
// never committed. Must be the `phc_` project token — never a `phs_`
// secret key (those are server-only and get rejected with 401 in browsers).
// Skipped under automation (e.g. the prerender snapshot) so headless
// loads never pollute real traffic.
if (!navigator.webdriver && import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY as string, {
    api_host: (import.meta.env.VITE_POSTHOG_HOST as string) || "https://us.i.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
