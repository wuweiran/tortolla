import "./index.css";
import "./i18n/config.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import MessageProvider from "./components/MessageProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <MessageProvider>
    <BrowserRouter>
        <App />
        </BrowserRouter>
      </MessageProvider>
    </FluentProvider>
  </React.StrictMode>
);
