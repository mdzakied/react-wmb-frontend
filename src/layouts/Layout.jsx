import Sidebar from "@shared/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
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
                    <a className="dropdown-item text-sm">Profile</a>
                    <a tabIndex="-1" className="dropdown-item text-sm">
                      Account settings
                    </a>
                    <a tabIndex="-1" className="dropdown-item text-sm">
                      Subscriptions
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
          <div className="my-4 grid gap-4 ml-7 py-6 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
