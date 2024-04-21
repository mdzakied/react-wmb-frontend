import UserService from "@services/UserService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

import { useState, useMemo, useEffect, useParams } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// create schema for validator with zod
const schema = z.object({
  name: z.any(),
  phoneNumber: z.any(),
});

export default function UserForm(id, user) {
  // use state for data users and search params
  const [users, setUsers] = useState([]);

  // use service and sweet alert with useMemo -> prevent re-render
  const userService = useMemo(() => UserService(), []);
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

  //    handle close modal edit
  const handleCloseModal = (id) => {
    document.getElementById(`modal-${id}`).checked = false;
  };

  // handle submit login
  const onSubmit = async (data) => {
    //console.log(id);

    console.log(data);


    try {
      const response = await userService.update(id);

      if (response && response.statusCode === 201) {
        // close modal
        handleCloseModal();

        // notification
        sweetAlert.success("Update successfully, user updated !");
      }
    } catch (error) {
      // close modal
      handleCloseModal();

      // notification
      sweetAlert.error("Update admin failed !");
    }

    // reset form
    reset();
  };

  //const { id, user } = this.props;

  console.log(id);
  console.log(user);

  return (
    <>
      <div>
        <label
          className="btn btn-outline-secondary btn-sm "
          htmlFor={`modal-${user.id}`}
        >
          Edit
        </label>

        {/* Modal Edit User */}
        <input
          className="modal-state"
          id={`modal-${user.id}`}
          type="checkbox"
        />
        <div className="modal">
          <label className="modal-overlay" htmlFor={`modal-${user.id}`}></label>
          <div className="modal-content flex flex-col gap-5">
            <label
              htmlFor={`modal-${user.id}`}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>

            {/* Form */}
            <div className="bg-gray-3 p-8 shadow-lg">
              <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                {/* Title Form */}
                <div className="flex flex-col items-center">
                  <h1 className="text-3xl font-semibold pb-6">
                    Sign Up #{user.name}
                  </h1>
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
                      {/* Name Field */}
                      <label className="form-label">Name</label>
                      <input
                        {...register("name")}
                        placeholder="name"
                        type="text"
                        className={`input max-w-full ${
                          errors.name && "input-error"
                        }`}
                      />
                      {errors.name && (
                        <label className="form-label">
                          <span className="form-label-alt text-error">
                            {errors.name.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Phone Number Field */}
                    <div className="form-field">
                      <label className="form-label">Phone Number</label>
                      <input
                        {...register("phoneNumber")}
                        placeholder="08xxxxxxxxx"
                        type="number"
                        className={`input max-w-full ${
                          errors.phoneNumber && "input-error"
                        }`}
                      />
                      {errors.phoneNumber && (
                        <label className="form-label">
                          <span className="form-label-alt text-error">
                            {errors.phoneNumber.message}
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
      </div>
    </>
  );
}
