import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { RouterProvider } from "react-router-dom";
import Router from "@/routes/Route";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client for react-query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  </React.StrictMode>
);
