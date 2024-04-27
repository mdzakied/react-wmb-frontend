import { Outlet } from "react-router-dom";

import Sidebar from "@shared/components/Sidebar/Sidebar";

export default function Layout() {
  // get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Mobile Layout */}
      <div id="Layout">
        {/* Nav Mobile */}
        <div className="navbar bg-dark py-4 px-0 flex sm:hidden">
          {/* Button Sidebar Mobile */}
          <div className="navbar-start">
            <label htmlFor="sidebar-mobile-fixed" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </label>
          </div>

          {/* Profile */}
          <div className="navbar-end pr-4">
            <div className="avatar avatar-ring avatar-md">
              <div className="dropdown-container">
                <div className="dropdown">
                  <label
                    className="btn btn-ghost flex cursor-pointer px-0"
                    tabIndex="0"
                  >
                    <img
                      src="https://cdn-icons-png.freepik.com/256/3135/3135715.png?ga=GA1.1.1505588938.1704985907&semt=ais_hybrid"
                      alt="avatar"
                    />
                  </label>
                  <div className="dropdown-menu dropdown-menu-bottom-left">
                    {/* User */}
                    <a className="dropdown-item text-sm flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                      <span className="my-auto">{currentUser?.username}</span>
                    </a>

                    {/* Role */}
                    <a className="dropdown-item text-sm flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                        />
                      </svg>
                      <span className="my-auto">{currentUser?.roles[0]}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-row">
          {/* Sidebar */}
          <Sidebar />

          {/* Outlet or Child Component */}
          <div id="contentPage" className=" grid gap-4 mx-7 py-6 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
