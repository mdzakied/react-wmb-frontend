import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "@pages/Authentication/Login";
import WebLayout from "@layouts/WebLayout";
import Dashboard from "@pages/Dashboard/Dashboard";
import Menu from "@pages/Menu/Menu";
import Table from "@pages/Table/Table";

import User from "@pages/User/User";

// import Admin from "@pages/User/Admin";
// import Customer from "@pages/User/Customer";
import Transaction from "@pages/Transaction/Transaction";
import Account from "@pages/Account/Account";

const Router = createBrowserRouter([
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
    element: (
      <ProtectedRoute>
        <WebLayout />
      </ProtectedRoute>
    ),
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

      // User Menu v1
      {
        path: "user",
        element: <User />,
      },
      // User Menu v2
      // {
      //   path: "user",
      //   children: [
      //     {
      //       path: "admin",
      //       element: <Admin />,
      //     },
      //     {
      //       path: "customer",
      //       element: <Customer />,
      //     },
      //   ],
      // },
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

export default Router;