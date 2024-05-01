import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import TableService from "@services/TableService";
import SweetAlert from "@shared/components/Modal/SweetAlert";


// create schema for validator with zod
const schema = z.object({
  search: z.optional(z.string()),
});

export default function TableList() {
  // Access the client
  const queryClient = useQueryClient();

  // use state for data tables and search params
  const [searchParams, setSearchParams] = useSearchParams();

  // use service and utils with useMemo -> prevent re-render
  const tableService = useMemo(() => TableService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use form hook with schema from zod resolver
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // search and pagination
  const search = searchParams.get("name" || "");
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;

  // handle search and pagination
  const onSubmitSearch = ({ search }) => {
    setSearchParams({ name: search || "", page: 1, size: 10 });
  };

  const handleNextPage = (search) => {
    setSearchParams({ name: search || "", page: +page + 1, size: size });
  };

  const handlePreviousPage = (search) => {
    setSearchParams({ name: search || "", page: +page - 1, size: size });
  };

  const navigatePage = (search, page) => {
    setSearchParams({ name: search || "", page: page, size: size });
  };

  // delete table -> useMutation react query
  const { mutate: deleteTable } = useMutation({
    mutationFn: async (id) => {
      // alert confirmation with sweetalert
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0072f5",
        cancelButtonColor: "#f31260",
        confirmButtonText: "Yes, Deleted !",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // delete
          const response = await tableService.deleteById(id);

          // check response
          if (response.statusCode === 200) {
            // update cache tables
            queryClient.invalidateQueries({ queryKey: ["tables"] });

            // notification
            sweetAlert.success("Table deleted !");
          }
        }
      });
    },
  });

  // get all table -> react query
  const { data, isLoading } = useQuery({
    queryKey: ["tables", search, page, size],
    queryFn: async () => {
      return await tableService.getAll({
        name: search,
        page: page,
        size: size,
      });
    },
  });

  // loading get all table -> react query
  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {/* Action Table */}
      <div className="flex flex-row justify-between gap-4 pt-6">
        {/* Size */}
        <div className="flex justify-start w-20">
          <select
            onChange={(e) => {
              setSearchParams({
                name: search || "",
                page,
                size: e.target.value,
              });
            }}
            className="select bg-grey"
            value={size}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end">
          <form onSubmit={handleSubmit(onSubmitSearch)}>
            <div className="form-control">
              <input
                {...register("search")}
                type="text"
                className="input bg-grey pl-10"
                placeholder="Search by name"
              />

              <span className="absolute inset-y-0 left-3 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="flex w-full rounded-2xl overflow-x-auto">
        <table className="table-hover bg-grey table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.length > 0 ? (
              <>
                {data.data.map((table, index) => (
                  <tr key={table.id}>
                    {/* Index  */}
                    {page == 1 ? (
                      <td>{index + 1}</td>
                    ) : (
                      <td>{index + 1 + Number(size * (page - 1))}</td>
                    )}
                    <td>{table.name}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <div className="flex gap-3">
                        {/* Button Edit */}
                        <Link
                          to={`/dashboard/table/update/${table.id}`}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          Edit
                        </Link>
                        {/* Button Delete */}
                        <button
                          onClick={() => deleteTable(table.id)}
                          className="btn btn-outline-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan={7} className="bg-transparent">
                    <span className="flex justify-center">data not found.</span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.data.length === 0 ? (
        <></>
      ) : (
        <div className="grid gird-cols-12 md:grid-cols-2 mx-1">
          {/* Pagination Info */}
          <div className="flex justify-start">
            <div className="pagination">
              <span className="text-sm">
                Showing {size * (page - 1) + 1} to{" "}
                {size * (page - 1) + data.data.length} of{" "}
                {data.paging.totalElement} entries
              </span>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 md:justify-end md:mt-0">
            <div className="pagination">
              {/* Previous */}
              <button
                disabled={!data.paging.hasPrevious}
                onClick={() => handlePreviousPage(search)}
                className="btn bg-grey"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
                    fill="#969696"
                  />
                </svg>
              </button>

              {/* Pages */}
              <button
                className={`btn ${page == 1 ? "bg-orange" : "bg-grey"}`}
                onClick={() => navigatePage(search, 1)}
              >
                1
              </button>
              <button disabled className={`btn ${page <= 2 ? "hidden" : ""}`}>
                ...
              </button>
              <button
                className={`btn bg-orange ${
                  page == 1 || page == data.paging.totalPages ? "hidden" : ""
                }`}
              >
                {page}
              </button>
              <button
                disabled
                className={`btn ${
                  page == data.paging.totalPages - 1 ||
                  page == data.paging.totalPages
                    ? "hidden"
                    : ""
                }`}
              >
                ...
              </button>
              <button
                className={`btn ${
                  page == data.paging.totalPages ? "bg-orange" : "bg-grey"
                } ${data.paging.totalPages == 1 ? "hidden" : ""}`}
                onClick={() => navigatePage(search, data.paging.totalPages)}
              >
                {data.paging.totalPages}
              </button>

              {/* Next */}
              <button
                disabled={!data.paging.hasNext}
                onClick={() => handleNextPage(search)}
                className="btn bg-grey"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z"
                    fill="#969696"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
