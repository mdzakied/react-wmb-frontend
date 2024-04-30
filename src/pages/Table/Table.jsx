import { Outlet } from "react-router-dom";

import TableList from "./components/TableList";
import { Link } from "react-router-dom";

export default function Table() {
  return (
    <>
      {/* Outlet for Modal Form */}
      <Outlet />

      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Table</h1>
        <div className="divider-title"></div>
      </div>

      {/* User Modal Form */}
      <div className="flex justify-end gap-4 pt-6">
        <Link to="/dashboard/table/add" className="btn bg-orange">
          Add Table
        </Link>
      </div>

      {/* Table List */}
      <TableList />
    </>
  );
}
