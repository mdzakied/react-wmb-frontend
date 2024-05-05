import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import MenuService from "@services/MenuService";
import foodDefaultImg from "@assets/images/food-default.png";
import SweetAlert from "@shared/components/Modal/SweetAlert";
import NumberFormatter from "@shared/utils/NumberFormatter";

// create schema for validator with zod
const schema = z.object({
  search: z.optional(z.string()),
  minPrice: z.optional(z.string()),
  maxPrice: z.optional(z.string()),
});

export default function MenuList() {
  // Access the client
  const queryClient = useQueryClient();

  // use state for data menus and search params
  const [searchParams, setSearchParams] = useSearchParams();

  // use service and utils with useMemo -> prevent re-render
  const menuService = useMemo(() => MenuService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);
  const numberFormatter = useMemo(() => NumberFormatter(), []);

  // use form hook with schema from zod resolver
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  // search and pagination
  const search = searchParams.get("name" || "");
  const minPrice = searchParams.get("minPrice" || 0);
  const maxPrice = searchParams.get("maxPrice" || 100000);
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;

  // handle search and pagination
  const onSubmitSearch = ({ search, minPrice, maxPrice }) => {
    setSearchParams({
      name: search || "",
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 100000,
      page: 1,
      size: 10,
    });
  };

  const handleNextPage = (search, minPrice, maxPrice) => {
    setSearchParams({
      name: search || "",
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 100000,
      page: +page + 1,
      size: size,
    });
  };

  const handlePreviousPage = (search, minPrice, maxPrice) => {
    setSearchParams({
      name: search || "",
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 100000,
      page: +page - 1,
      size: size,
    });
  };

  const navigatePage = (search, minPrice, maxPrice, page) => {
    setSearchParams({
      name: search || "",
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 100000,
      page: page,
      size: size,
    });
  };

  // delete menu -> useMutation react query
  const { mutate: deleteMenu } = useMutation({
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
          const response = await menuService.deleteById(id);

          // check response
          if (response.statusCode === 200) {
            // update cache menus
            queryClient.invalidateQueries({ queryKey: ["menus"] });

            // notification
            sweetAlert.success("Menu deleted !");
          }
        }
      });
    },
  });

  // get all menu -> react query
  const { data, isLoading } = useQuery({
    queryKey: ["menus", search, minPrice, maxPrice, page, size],
    queryFn: async () => {
      return await menuService.getAll({
        name: search,
        minPrice: minPrice,
        maxPrice: maxPrice,
        page: page,
        size: size,
      });
    },
  });

  // loading get all menu -> react query
  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {/* Action Table */}
      <div className="flex flex-row justify-between gap-4 pt-6">
        {/* Size */}
        <div className="flex justify-start items-end w-20">
          <select
            onChange={(e) => {
              setSearchParams({
                name: search || "",
                minPrice: minPrice || 0,
                maxPrice: maxPrice || 100000,
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
            {/* Search */}
            <div className="flex flex-row justify-end mb-3">
              {/* Name */}
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
            </div>

            {/* Filter Price */}
            <div className="flex flex-row gap-3">
              {/* Min Price */}
              <div className="form-control">
                <input
                  {...register("minPrice")}
                  type="number"
                  className="input bg-grey pl-10"
                  placeholder="Min Price"
                />

                <span className="absolute inset-y-0 left-3 inline-flex items-center">
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
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
              </div>

              {/* Max Price */}
              <div className="form-control">
                <input
                  {...register("maxPrice")}
                  type="number"
                  className="input bg-grey pl-10"
                  placeholder="Max Price"
                  defaultValue={100000}
                />

                <span className="absolute inset-y-0 left-3 inline-flex items-center">
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
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn hidden">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="flex w-full rounded-2xl overflow-x-auto">
        <table className="table-hover bg-grey table">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.length > 0 ? (
              <>
                {data.data.map((menu, index) => (
                  <tr key={menu.id}>
                    {/* Index  */}
                    {page == 1 ? (
                      <td>{index + 1}</td>
                    ) : (
                      <td>{index + 1 + Number(size * (page - 1))}</td>
                    )}
                    <td>
                      <div className="my-auto">
                        <img
                          src={
                            menu.image ? `/${menu.image.url}` : foodDefaultImg
                          }
                          alt="menu image"
                          width={80}
                          height={80}
                        />
                      </div>
                    </td>
                    <td>{menu.name}</td>
                    <td>{numberFormatter.formatRupiah(menu.price)}</td>
                    <td>
                      <div className="flex gap-3">
                        {/* Button Edit */}
                        <Link
                          to={`/dashboard/menu/update/${menu.id}`}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          Edit
                        </Link>
                        {/* Button Delete */}
                        <button
                          onClick={() => deleteMenu(menu.id)}
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
                onClick={() => handlePreviousPage(search, minPrice, maxPrice)}
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
                onClick={() => navigatePage(search, minPrice, maxPrice, 1)}
              >
                1
              </button>
              <button disabled className={`btn ${page <= 2 ? "hidden" : ""}`}>
                ...
              </button>
              {/* First Page */}
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
              {/* Last Page */}
              <button
                className={`btn ${
                  page == data.paging.totalPages ? "bg-orange" : "bg-grey"
                } ${data.paging.totalPages == 1 ? "hidden" : ""}`}
                onClick={() =>
                  navigatePage(
                    search,
                    minPrice,
                    maxPrice,
                    data.paging.totalPages
                  )
                }
              >
                {data.paging.totalPages}
              </button>

              {/* Next */}
              <button
                disabled={!data.paging.hasNext}
                onClick={() => handleNextPage(search, minPrice, maxPrice)}
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
