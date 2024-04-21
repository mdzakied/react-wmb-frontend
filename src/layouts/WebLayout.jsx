import Sidebar from "@shared/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function WebLayout() {
  return (
    <>
      <div className="flex flex-row sm:gap-10">
        <Sidebar />

        {/* Layout */}
        <div className="flex w-full flex-col p-4">
          {/* Button Sidebar Mobile */}
          <div className="w-fit py-4">
            <label
              htmlFor="sidebar-mobile-fixed"
              className="btn btn-ghost btn sm:hidden px-0"
            >
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

          {/* Outlet or Child Component */}
          <div className="my-4 grid gap-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
