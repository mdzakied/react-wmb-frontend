import React from "react";

export default function Login() {
  return (
    <>
      {/* Login Section */}
      <section
        id="login"
        className="rounded-xl flex justify-center items-center w-100 h-screen"
      >
        <div className="bg-gray-3 p-8 shadow-lg">
          <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
            {/* Title Form */}
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-semibold pb-6">Sign In</h1>
              <h2 className="text-2xl font-semibold pb-2">
                Welcome to Materio! 👋🏻
              </h2>
              <p className="text-sm pb-5">
                Please sign-in to your account and start the adventure
              </p>
            </div>

            {/* Login Form */}
            <form action="">
              <div className="form-group">
                <div className="form-field">
                  {/* Username Field */}
                  <label className="form-label">Email address</label>
                  <input
                    placeholder="superadmin"
                    type="email"
                    className="input max-w-full"
                  />
                  <label className="form-label">
                    <span className="form-label-alt">
                      Please enter a valid email.
                    </span>
                  </label>
                </div>

                {/* Password Field */}
                <div className="form-field">
                  <label className="form-label">Password</label>
                  <div className="form-control">
                    <input
                      placeholder="password"
                      type="password"
                      className="input max-w-full"
                    />
                  </div>
                </div>

                {/* Button Sign In */}
                <div className="form-field pt-5">
                  <div className="form-control justify-between">
                    <button type="button" className="btn btn-primary w-full">
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
