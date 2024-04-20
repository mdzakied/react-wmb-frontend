import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "@pages/Authentication/Login";
import WebLayout from "@layouts/WebLayout";
import Dashboard from "@pages/Dashboard/Dashboard";
import Menu from "@pages/Menu/Menu";
import Table from "@pages/Table/Table";
import User from "@pages/User/User";
import Transaction from "@pages/Transaction/Transaction";
import Account from "@pages/Account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "table",
        element: <Table />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

export default router;
