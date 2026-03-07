import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "@/App";
import "@/index.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>
  </StrictMode>
);
