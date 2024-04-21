import UserService from "@services/UserService";
import SweetAlert from "@shared/components/Modal/SweetAlert";
import UserForm from "./UserForm";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Swal from "sweetalert2/dist/sweetalert2.js";

// create schema for validator with zod
const schema = z.object({
  name: z.any(),
  phoneNumber: z.any(),
});

export default function UserList() {
  // use state for data users and search params
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // use service and sweet alert with useMemo -> prevent re-render
  const userService = useMemo(() => UserService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use form hook with schema from zod resolver
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // search
  const search = searchParams.get("name" || "");

  // handle onSubmit search
  const onSubmitSearch = ({ search }) => {
    setSearchParams({ name: search || "", page: 1, size: 100 });
  };

  // handle close modal edit
  //   const handleCloseModal = (id) => {
  //     document.getElementById(`modal-${id}`).checked = false;
  //   };

  // handle delete user
  const handleDelete = async (id) => {
    // alert confirmation with sweetalert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0072f5",
      cancelButtonColor: "#f31260",
      confirmButtonText: "Yes, logout !",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          // delete
          const response = await userService.deleteById(id);

          // check response
          if (response.statusCode === 200) {
            // notification
            sweetAlert.success("Account inactive !");

            // get all users
            const data = await userService.getAll();
            setUsers(data.data);
          }
        }
      } catch (error) {
        console.log("error");
      }
    });
  };

  // use effect -> get users suitable with authorization
  useEffect(() => {
    const getUsers = async () => {
      try {
        // get all users
        const data = await userService.getAll({
          name: search,
        });

        // set users
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [userService, search, searchParams, search]);

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-end py-4">
        <form onSubmit={handleSubmit(onSubmitSearch)}>
          <div className="form-control">
            <input
              {...register("search")}
              type="text"
              className="input input-lg w-screen pl-10"
              placeholder="Search by name"
            />

            <span className="absolute inset-y-0 left-3 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="flex w-full overflow-x-auto">
        <table className="table-hover table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              <>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber ? user.phoneNumber : "-"}</td>
                    <td>{user.userAccount.roles[0].role}</td>
                    <td>{user.status ? "Active" : "Inactive"}</td>
                    <td>
                      <div className="flex gap-3">
                        {/* Button Edit */}
                        {/* <UserForm user={(user.id, user)} /> */}
                        {/* Button Inactive */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-outline-error btn-sm"
                        >
                          Inactive
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan={5} className="bg-transparent">
                    <span className="flex justify-center">data not found.</span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
