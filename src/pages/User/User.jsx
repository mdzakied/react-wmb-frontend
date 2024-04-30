import { Outlet } from "react-router-dom";
import AdminModalForm from "./components/AdminForm";
import CustomerModalForm from "./components/CustomerForm";

import UserList from "./components/UserList";

export default function User() {
  // get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Outlet for Modal Form */}
      <Outlet />

      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">User</h1>
        <div className="divider-title"></div>
      </div>

      {/* User Modal Form */}
      <div className="flex justify-end gap-4 pt-6">
        {/* Check Authorization for Add Admin */}
        {currentUser.roles[0] === "ROLE_SUPER_ADMIN" ? (
          <>
            <AdminModalForm />
            <CustomerModalForm />
          </>
        ) : (
          <></>
        )}

        {/* Check Authorization for Add Customer */}
        {currentUser.roles[0] === "ROLE_ADMIN" ? <CustomerModalForm /> : <></>}
      </div>

      {/* User List */}
      <UserList />
    </>
  );
}
