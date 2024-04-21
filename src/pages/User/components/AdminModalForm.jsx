import AuthService from "@services/AuthService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// create schema for validator with zod
const schema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function AdminModalForm() {
  // use service and sweet alert with useMemo -> prevent re-render
  const authService = useMemo(() => AuthService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use form hook with schema from zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // handle close modal
  const handleCloseModal = () => {
    document.getElementById("modal-1").checked = false;
  };

  // handle submit login
  const onSubmit = async (data) => {
    try {
      const response = await authService.registerAdmin(data);

      if (response && response.statusCode === 201) {
        // close modal
        handleCloseModal();

        // notification
        sweetAlert.success("Add successfully, admin created !");
      }
    } catch (error) {
      // close modal
      handleCloseModal();

      // notification
      sweetAlert.error("Add admin failed !");
    }

    // reset form
    reset();
  };

  return (
    <>
      <label className="btn btn-outline-primary" htmlFor="modal-1">
        Add Admin
      </label>
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5">
          {/* Close Button Modal */}
          <label
            htmlFor="modal-1"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
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

          {/* Form */}
          <div className="bg-gray-3 p-8 shadow-lg">
            <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
              {/* Title Form */}
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold pb-6">Sign Up</h1>
                <h2 className="text-2xl font-semibold pb-2">
                  Adventure starts here 🚀
                </h2>
                <p className="text-sm pb-5">
                  Make your <span className="text-primary">admin </span>
                  account for your app management !
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <div className="form-field">
                    {/* Username Field */}
                    <label className="form-label">Username</label>
                    <input
                      {...register("username")}
                      placeholder="username"
                      type="text"
                      className={`input max-w-full${
                        errors.username && "input-error"
                      }`}
                    />
                    {errors.username && (
                      <label className="form-label">
                        <span className="form-label-alt text-error">
                          {errors.username.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="form-field">
                    <label className="form-label">Password</label>
                    <input
                      {...register("password")}
                      placeholder="********"
                      type="password"
                      className={`input max-w-full${
                        errors.password && "input-error"
                      }`}
                    />
                    {errors.password && (
                      <label className="form-label">
                        <span className="form-label-alt text-error">
                          {errors.password.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Button Sign In */}
                  <div className="form-field pt-5">
                    <div className="form-control justify-between">
                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={!isValid}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
