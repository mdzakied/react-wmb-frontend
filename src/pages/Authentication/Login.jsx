import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthService from "@services/AuthService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

// create schema for validator with zod
const schema = z.object({
  username: z.string().min(1, "Username cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  // use service and sweet alert with useMemo -> prevent re-render
  const authService = useMemo(() => AuthService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use navigate hook -> redirect
  const navigate = useNavigate();

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

  // handle submit login
  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);

      if (response && response.statusCode === 200) {
        // save user to local storage -> json stringify
        localStorage.setItem("user", JSON.stringify(response.data));

        // redirect
        navigate("/dashboard");

        // notification
        sweetAlert.success("Login successfully, welcome back !");
      }
    } catch (error) {
      if (error.response.status == 500) {
        // notification
        sweetAlert.error("Internal server error !");
      } else {
        // notification
        sweetAlert.error("Username or password is incorrect !");
      }
    }

    // reset form
    reset();
  };

  // use effect -> check token always when service or route change
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const checkToken = async () => {
        const isValidToken = await authService.validateToken();

        if (isValidToken) {
          // notification
          sweetAlert.info("You are already logged in !");

          // redirect
          navigate("/dashboard");
        }
      };
      checkToken();
    }
  }, [authService, sweetAlert, navigate]);

  return (
    <>
      {/* Login Section */}
      <section
        id="login"
        className="rounded-xl flex justify-center items-center w-100 h-screen"
      >
        <div className="bg-dark rounded-2xl  p-8 shadow-lg">
          <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
            {/* Title Form */}
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-semibold pb-6">Sign In</h1>
              <h2 className="text-2xl font-semibold pb-2">
                Welcome to WMB ! 👋🏻
              </h2>
              <p className="text-sm pb-5">
                Please <span className="text-orange">sign-in</span> to your
                account and start the adventure
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="form-field">
                  {/* Username Field */}
                  <label className="form-label mb-1">Username</label>
                  <input
                    {...register("username")}
                    placeholder="username"
                    type="text"
                    className={`input max-w-full${
                      errors.username && "input-error"
                    }`}
                  />
                  {errors.username && (
                    <label className="form-label mb-1">
                      <span className="form-label-alt text-red ">
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
                    placeholder="password"
                    type="password"
                    className={`input max-w-full${
                      errors.password && "input-error"
                    }`}
                  />
                  {errors.password && (
                    <label className="form-label">
                      <span className="form-label-alt text-red">
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
                      className="btn btn-primary bg-orange w-full"
                      disabled={!isValid}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
