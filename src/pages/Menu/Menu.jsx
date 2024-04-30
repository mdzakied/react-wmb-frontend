import { Outlet } from "react-router-dom";

import MenuList from "./components/MenuList";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      {/* Outlet for Modal Form */}
      <Outlet />

      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Menu</h1>
        <div className="divider-title"></div>
      </div>

      {/* User Modal Form */}
      <div className="flex justify-end gap-4 pt-6">
        <Link to="/dashboard/menu/add" className="btn bg-orange">
          Add Menu
        </Link>
      </div>

      {/* Menu List */}
      <MenuList />
    </>
  );
}
