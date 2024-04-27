import {useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {useMutation, useQueryClient } from "@tanstack/react-query";

import UserService from "@services/UserService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

// create schema for validator with zod
const schema = z.object({
  id: z.string(),
  name: z.string().min(1, "name cannot be empty"),
  phoneNumber: z.string().max(13, "phone number must be at most 13 digits").nullable(),
  status: z.optional(z.boolean()),
});

export default function UserForm() {
  // Access the client
  const queryClient = useQueryClient();

  // use service and sweet alert with useMemo -> prevent re-render
  const userService = useMemo(() => UserService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use search params for id
  const { id } = useParams();

  // use navigate hook -> redirect
  const navigate = useNavigate();

  // use form hook with schema from zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors},
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // update user -> useMutation react query
  const { mutate: updateUser } = useMutation({
    mutationFn: async (payload) => {
      // update
      return await userService.update(payload);
    },
    onSuccess: () => {
      // update cache users
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // close modal
      navigate("/dashboard/user");
      // notification
      sweetAlert.success("Update successfully, user updated !");

      // reset form
      reset();
    },
    onError: () => {
      // close modal
      navigate("/dashboard/user");
      // notification
      sweetAlert.error("Update user failed !");

      // reset form
      reset();
    },
  });

  // handle submit update
  const onSubmit = async (data) => {
    // update user -> useMutation react query
    updateUser(data);
  };

  // get user by id
  useEffect(() => {
    if (id) {
      const getUserById = async () => {
        try {
          // set data to form
          const response = await userService.getById(id);
          const currentUser = response.data;
          setValue("id", currentUser.id);
          setValue("name", currentUser.name);
          setValue("phoneNumber", currentUser.phoneNumber);
          setValue("status", currentUser.status);
        } catch (error) {
          console.log(error);
        }
      };
      getUserById();
    }
  }, [id, userService, setValue]);

  return (
    <>
      <div>
        <label
          className="btn btn-outline-secondary btn-sm "
          htmlFor="modal-update-user"
        >
          Edit
        </label>

        {/* Modal Edit User */}
        <input
          className="modal-state"
          id="modal-update-user"
          type="checkbox"
          checked={true}
          readOnly
        />
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal-update-user"></label>
          <div className="modal-content rounded-2xl flex flex-col gap-5">
            {/* Close Button Modal */}
            <Link to={"/dashboard/user"}>
              <label
                htmlFor="modal-update-user"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-7"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </label>
            </Link>

            {/* Form */}
            <div className="bg-gray-3 rounded-2xl p-8 shadow-lg">
              <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                {/* Title Form */}
                <div className="flex flex-col text-center items-center">
                  <h1 className="text-3xl font-semibold pb-6">Edit User</h1>
                  <h2 className="text-2xl font-semibold pb-2">
                    Update here ✏️
                  </h2>
                  <p className="text-sm pb-5">
                    Update your <span className="text-orange">user </span>
                    account for your app management !
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <div className="form-field">
                      {/* Name Field */}
                      <label className="form-label mb-1">Name</label>
                      <input
                        {...register("name")}
                        placeholder="name"
                        type="text"
                        className={`input bg-grey max-w-full ${
                          errors.name && "input-error"
                        }`}
                      />
                      {errors.name && (
                        <label className="form-label">
                          <span className="form-label-alt text-red">
                            {errors.name.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Phone Number Field */}
                    <div className="form-field">
                      <label className="form-label mb-1">Phone Number</label>
                      <input
                        {...register("phoneNumber")}
                        placeholder="08xxxxxxxxx"
                        type="number"
                        className={`input bg-grey max-w-full ${
                          errors.phoneNumber && "input-error"
                        }`}
                      />
                      {errors.phoneNumber && (
                        <label className="form-label">
                          <span className="form-label-alt text-red">
                            {errors.phoneNumber.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Button Save */}
                    <div className="form-field pt-5">
                      <div className="form-control justify-between">
                        <button
                          type="submit"
                          className="btn bg-orange w-full"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
