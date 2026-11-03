import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); //Creates a TanStack Query manager that stores and manages API data.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/*Makes TanStack Query available to the entire app*/}
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
