import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import "./../app/globals.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import "./i18n";
createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
