import UserService from "@services/UserService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


// create schema for validator with zod
const schema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  phoneNumber: z.number().min(10, "phone number must be at least 10 digits"),
});

export default function Account() {
  // use service and sweet alert with useMemo -> prevent re-render
  const userService = useMemo(() => UserService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use form hook with schema from zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    // defaultValues: {
    //   username: "superadmin",
    //   password: "password",
    // },
  });

  // use effect -> check user always when service or route change
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const currentUser = async () => {
        // get user from local storage
        const data = await userService.getById(localStorage.getItem("user"));
      };
      currentUser();
    }
  }, [userService]);

  return (
    <>
      <section id="account">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold">Account</h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Card Account */}
          <div className="card mt-10">
            <div className="card-body">
              <h2 className="card-header">Profile</h2>

              <div className="divider m-0"></div>

              <div className="py-2">
                {/* Profile Form */}
                <form className="space-y-4">
                  {/* Name Field */}
                  <div className="w-full">
                    <label className="form-label mb-2">Name</label>
                    <input
                      className="input input-solid max-w-full"
                      placeholder="name"
                      type="text"
                      id="name"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div className="w-full">
                    <label className="form-label mb-2">Phone Number</label>
                    <input
                      className="input input-solid"
                      placeholder="08xxxx"
                      type="number"
                      id="phoneNumbe"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="w-full">
                    <label className="form-label mb-2">Status</label>
                    <span className=" mr-2">
                      <span className="badge badge-outline-success px-2">
                        <span className="px-2">Active</span>
                      </span>
                    </span>
                  </div>
                </form>
              </div>

              {/* Profile Action */}
              <div className="card-footer mt-2 flex justify-end gap-5">
                {/* Button Save */}
                <button disabled className="btn-secondary btn btn-md">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Card Account */}
          <div className="card mt-10 h-full">
            <div className="card-body">
              <h2 className="card-header">User Account</h2>

              <div className="divider m-0"></div>

              <div className="py-2">
                {/* Profile Form */}
                <form className="space-y-4">
                  {/* Username Field */}
                  <div className="w-full">
                    <label className="form-label mb-2">Username</label>
                    <input
                      disabled
                      className="input input-solid max-w-full"
                      placeholder="username"
                      type="text"
                      id="username"
                    />
                  </div>

                  {/* Roles Badge */}
                  <div className="w-full">
                    <label className="form-label mb-2">Roles</label>

                    <div className="flex flex-row gap-4 pt-1">
                      <span className="badge badge-outline-success px-2">
                        <span className="px-2">Super Admin</span>
                      </span>
                      <span className="badge badge-outline-warning px-2">
                        <span className="px-2">Admin</span>
                      </span>
                      <span className="badge badge-outline-primary px-2">
                        <span className="px-2">Customer</span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
