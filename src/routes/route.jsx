import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "@pages/Authentication/Login";
import Layout from "@layouts/Layout";
import Dashboard from "@pages/Dashboard/Dashboard";

import Menu from "@pages/Menu/Menu";
import MenuFormModal from "@pages/Menu/components/MenuFormModal";

import Table from "@pages/Table/Table";
import TableFormModal from "@pages/Table/components/TableFormModal";

import User from "@pages/User/User";
import UserForm from "@pages/User/components/UserForm";

import Order from "@pages/Order/Order";
import Transaction from "@pages/Transaction/Transaction";
import TransactionDetailModal from "@pages/Transaction/components/TransactionDetailModal";
import Account from "@pages/Account/Account";

import ErrorBoundary from "@shared/components/Error/ErrorBoundary";
import Error404 from "@shared/components/Error/Error404";


const Router = createBrowserRouter([
  {
    path: "*",
    element: <Error404 />,
  },
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
      <ErrorBoundary>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "menu",
        element: <Menu />,
        children: [
          {
            path: "add",
            element: <MenuFormModal />,
          },
          {
            path: "update/:id",
            element: <MenuFormModal />,
          },
        ],
      },
      {
        path: "table",
        element: <Table />,
        children: [
          {
            path: "add",
            element: <TableFormModal />,
          },
          {
            path: "update/:id",
            element: <TableFormModal />,
          },
        ],
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
