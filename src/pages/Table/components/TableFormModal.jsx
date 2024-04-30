import { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import TableService from "@services/TableService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

// create schema for validator with zod
const schema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, "name cannot be empty"),
});

export default function TableFormModal() {
  // Access the client
  const queryClient = useQueryClient();

  // use service and sweet alert with useMemo -> prevent re-render
  const tableService = useMemo(() => TableService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use search params for id
  const { id } = useParams();

  // use navigate hook -> redirect
  const navigate = useNavigate();

  // use form hook with schema from zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // update table -> useMutation react query
  const { mutate: serviceTable } = useMutation({
    mutationFn: async (payload) => {
      // conditional create or update
      if (id) {
        // update
        return await tableService.update(payload);
      } else {
        // create
        return await tableService.create(payload);
      }
    },
    onSuccess: () => {
      // update cache tables
      queryClient.invalidateQueries({ queryKey: ["tables"] });

      // close modal
      navigate("/dashboard/table");

      // notification
      sweetAlert.success(
        `${id ? "Edit" : "Add"} successfully, table ${
          id ? "updated" : "created"
        } !`
      );

      // reset form
      reset();
    },
    onError: () => {
      // close modal
      navigate("/dashboard/table");

      // notification
      sweetAlert.error(`${id ? "Edit" : "Add"} table failed !`);

      // reset form
      reset();
    },
  });

  // handle submit update
  const onSubmit = async (data) => {
    // service table -> useMutation react query
    await serviceTable(data);
  };

  // get table by id
  useEffect(() => {
    // update form
    if (id) {
      const getTableById = async () => {
        try {
          // set data to form
          const response = await tableService.getById(id);
          const currentTable = response.data;
          setValue("id", currentTable.id);
          setValue("name", currentTable.name);
        } catch (error) {
          console.log(error);
        }
      };
      getTableById();
    }
  }, [id, tableService, setValue]);

  return (
    <>
      {/* Modal Edit Table */}
      <input
        className="modal-state"
        id="modal-update-table"
        type="checkbox"
        checked={true}
        readOnly
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-update-table"></label>
        <div className="modal-content rounded-2xl flex flex-col gap-5">
          {/* Close Button Modal */}
          <Link to={"/dashboard/table"}>
            <label
              htmlFor="modal-update-table"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-7"
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </label>
          </Link>

          {/* Form */}
          <div className="bg-gray-3 rounded-2xl p-8 shadow-lg">
            <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
              {/* Title Form */}
              <div className="flex flex-col text-center items-center">
                <h1 className="text-3xl font-semibold pb-6">
                  {id ? "Edit" : "Add"} Table
                </h1>
                <h2 className="text-2xl font-semibold pb-2">
                  {id ? "Update" : "Create"} here 📝
                </h2>
                <p className="text-sm pb-5">
                  {id ? "Update" : "Create"} your{" "}
                  <span className="text-orange">table </span>
                  dish for your app management !
                </p>
              </div>

              {/* Table Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <div className="form-field">
                    {/* Name Field */}
                    <label className="form-label mb-1">Name</label>
                    <input
                      {...register("name")}
                      placeholder="name"
                      type="text"
                      className={`input bg-grey max-w-full ${
                        errors.name && "input-error"
                      }`}
                    />
                    {errors.name && (
                      <label className="form-label">
                        <span className="form-label-alt text-red">
                          {errors.name.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Button Save */}
                  <div className="form-field pt-5">
                    <div className="form-control justify-between">
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="btn bg-orange w-full"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
