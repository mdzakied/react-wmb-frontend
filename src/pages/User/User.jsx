import AdminModalForm from "./components/AdminModalForm";
import CustomerModalForm from "./components/CustomerModalForm";

import UserList from "./components/UserList";

export default function User() {
  // get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <section id="userAdmin">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold">User</h1>
        </div>

        {/* Content */}
        {/* User Modal Form */}
        <div className="flex justify-end gap-4 py-4">
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
          {currentUser.roles[0] === "ROLE_ADMIN" ? (
            <CustomerModalForm />
          ) : (
            <></>
          )}
        </div>

        {/* User List */}
        <UserList />
      </section>
    </>
  );
}
