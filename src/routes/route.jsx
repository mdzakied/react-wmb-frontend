import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "@pages/Authentication/Login";
import Layout from "@layouts/Layout";
import Dashboard from "@pages/Dashboard/Dashboard";
import Menu from "@pages/Menu/Menu";
import Table from "@pages/Table/Table";

import User from "@pages/User/User";
import UserForm from "@pages/User/components/UserForm";

import Order from "@pages/Order/Order";
import Transaction from "@pages/Transaction/Transaction";
import TransactionDetailModal from "@pages/Transaction/components/TransactionDetailModal";
import Account from "@pages/Account/Account";

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
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "transaction",
        element: <Transaction />,
        children: [
          {
            path: "detail/:id",
            element: <TransactionDetailModal />,
          },
        ],
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

export default Router;
