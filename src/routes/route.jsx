import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "@pages/Authentication/Login";
import Layout from "@layouts/Layout";
import Dashboard from "@pages/Dashboard/Dashboard";
import Menu from "@pages/Menu/Menu";
import Table from "@pages/Table/Table";

import User from "@pages/User/User";

import Transaction from "@pages/Transaction/Transaction";
import Account from "@pages/Account/Account";
import UserForm from "@pages/User/components/UserForm";

import Error404 from "@pages/Error/Error404";

const Router = createBrowserRouter([
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
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
        children: [
          {
            path: "update/:id",
            element: <UserForm />,
          },
        ],
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
