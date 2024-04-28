import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";

import SweetAlert from "@shared/components/Modal/SweetAlert";

export default function Sidebar() {
  // use sweet alert with useMemo -> prevent re-render
  const sweetAlert = useMemo(() => SweetAlert(), []);
  // use navigate hook -> redirect
  const navigate = useNavigate();

  // get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // handle logout
  const handleLogout = () => {
    // alert confirmation with sweetalert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0072f5",
      cancelButtonColor: "#f31260",
      confirmButtonText: "Yes, logout !",
    }).then((result) => {
      if (result.isConfirmed) {
        // remove user from local storage
        localStorage.removeItem("user");

        // redirect
        navigate("/login");

        // notification
        sweetAlert.success("Logout success !");
      }
    });
  };

  return (
    <>
      {/* Sidebar Mobile Config */}
      <div className="sm:w-full sm:max-w-[18rem]">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>

        {/* Sidebar */}
        <aside className="sidebar sidebar-fixed-left sidebar-mobile bg-dark h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          {/* Sidebar Header */}
          <section className="sidebar-title items-center p-4">
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              height="2em"
              width="2em"
              className="mr-2 p-0.5"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M57.49 47.74l368.43 368.43a37.28 37.28 0 010 52.72h0a37.29 37.29 0 01-52.72 0l-90-91.55a32 32 0 01-9.2-22.43v-5.53a32 32 0 00-9.52-22.78l-11.62-10.73a32 32 0 00-29.8-7.44h0a48.53 48.53 0 01-46.56-12.63l-85.43-85.44C40.39 159.68 21.74 83.15 57.49 47.74z"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M400 32l-77.25 77.25A64 64 0 00304 154.51v14.86a16 16 0 01-4.69 11.32L288 192M320 224l11.31-11.31a16 16 0 0111.32-4.69h14.86a64 64 0 0045.26-18.75L480 112M440 72l-80 80M200 368l-99.72 100.28a40 40 0 01-56.56 0h0a40 40 0 010-56.56L128 328"
              />
            </svg>

            <div className="flex flex-col">
              <span>WMB</span>
              <span className="text-xs font-normal text-content2">
                Warung Makan Bahari
              </span>
            </div>
          </section>

          <div className="divider my-0"></div>

          <section className="sidebar-content">
            <nav className="menu rounded-md">
              {/* Dashboard */}
              <section className="menu-section pb-2 px-4">
                <span className="menu-title">Dashboard</span>
                <ul className="menu-items">
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        isActive ? "menu-item menu-active" : "menu-item"
                      }
                      end
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
                          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                        />
                      </svg>
                      <span>Dashboard</span>
                    </NavLink>
                  </li>
                </ul>
              </section>

              {/* Menu */}
              <section className="menu-section pb-2 px-4">
                <span className="menu-title">Main menu</span>
                <ul className="menu-items">
                  <li>
                    <NavLink
                      to={"/dashboard/menu"}
                      className={({ isActive }) =>
                        isActive ? "menu-item menu-active" : "menu-item"
                      }
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
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                      <span>Menu</span>
                    </NavLink>
                  </li>

                  {/* Table */}
                  <li>
                    <NavLink
                      to={"/dashboard/table"}
                      className={({ isActive }) =>
                        isActive ? "menu-item menu-active" : "menu-item"
                      }
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
                          d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                        />
                      </svg>

                      <span>Table</span>
                    </NavLink>
                  </li>

                  {/* User */}
                  <li>
                    <NavLink
                      to={"/dashboard/user"}
                      className={({ isActive }) =>
                        isActive ? "menu-item menu-active" : "menu-item"
                      }
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
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                      <span>User</span>
                    </NavLink>
                  </li>
                </ul>
              </section>

              {/* Order */}
              <section className="menu-section pb-2 px-4">
                <span className="menu-title">Order</span>
                <ul className="menu-items">
                  <NavLink
                    to={"/dashboard/order"}
                    className={({ isActive }) =>
                      isActive ? "menu-item menu-active" : "menu-item"
                    }
                  >
                    <li className="flex gap-2">
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
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                        />
                      </svg>
                      <span>Order</span>
                    </li>
                  </NavLink>
                </ul>
              </section>

              {/* Transaction */}
              <section className="menu-section pb-2 px-4">
                <span className="menu-title">Transaction</span>
                <ul className="menu-items">
                  <NavLink
                    to={"/dashboard/transaction"}
                    className={({ isActive }) =>
                      isActive ? "menu-item menu-active" : "menu-item"
                    }
                  >
                    <li className="flex gap-2">
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
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <span>Transaction</span>
                    </li>
                  </NavLink>
                </ul>
              </section>

              {/* Account */}
              <section className="menu-section pb-2 px-4">
                <span className="menu-title">Account</span>
                <ul className="menu-items">
                  <NavLink
                    to={"/dashboard/account"}
                    className={({ isActive }) =>
                      isActive ? "menu-item menu-active" : "menu-item"
                    }
                  >
                    <li className="flex gap-2">
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
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <span>Profile</span>
                    </li>
                  </NavLink>

                  <li onClick={handleLogout} className="menu-item">
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    <span>Logout</span>
                  </li>
                </ul>
              </section>
            </nav>
          </section>

          {/* Sidebar Footer -> Hidden in mobile */}
          <section className="sidebar-footer justify-end pt-2 hidden lg:block">
            <div className="divider my-0"></div>
            <div className="">
              <label className="whites mx-2 flex h-fit" tabIndex="0">
                <div className="flex flex-row gap-4 p-4 ">
                  <div className="avatar-square avatar avatar-sm my-auto">
                    <img
                      src="https://cdn-icons-png.freepik.com/256/3135/3135715.png?ga=GA1.1.1505588938.1704985907&semt=ais_hybrid"
                      alt="avatar"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span>{currentUser?.username}</span>
                    <span className="text-xs mt-1">
                      {currentUser?.roles[0]}
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
