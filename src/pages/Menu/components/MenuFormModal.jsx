import { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import MenuService from "@services/MenuService";
import SweetAlert from "@shared/components/Modal/SweetAlert";

// create schema for validator with zod
const schema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, "name cannot be empty"),
  price: z.string().min(1, "price must be at least 1 digit"),
  image: z
    .any()
    .optional()
    .refine((files) => {
      if (files?.length === 0) return true;
      return ["image/png", "image/jpg", "image/jpeg"].includes(files[0].type);
    }, "format gambar tidak sesuai"),
});

export default function MenuFormModal() {
  // Access the client
  const queryClient = useQueryClient();

  // use service and sweet alert with useMemo -> prevent re-render
  const menuService = useMemo(() => MenuService(), []);
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

  // update menu -> useMutation react query
  const { mutate: serviceMenu } = useMutation({
    mutationFn: async (payload) => {
      // conditional create or update
      if (id) {
        // update
        return await menuService.update(payload);
      } else {
        // create
        return await menuService.create(payload);
      }
    },
    onSuccess: () => {
      // update cache menus
      queryClient.invalidateQueries({ queryKey: ["menus"] });

      // close modal
      navigate("/dashboard/menu");

      // notification
      sweetAlert.success(
        `${id ? "Edit" : "Add"} successfully, menu ${
          id ? "updated" : "created"
        } !`
      );

      // reset form
      reset();
    },
    onError: () => {
      // close modal
      navigate("/dashboard/menu");

      // notification
      sweetAlert.error(`${id ? "Edit" : "Add"} menu failed !`);

      // reset form
      reset();
    },
  });

  // handle submit update
  const onSubmit = async (data) => {
    // set form and data edited
    const form = new FormData();
    let menu = {};

    // conditional create or update
    if (data.id) {
      menu = {
        id: data.id,
        name: data.name,
        price: data.price,
      };
    } else {
      menu = {
        name: data.name,
        price: data.price,
      };
    }

    form.append("menu", JSON.stringify(menu));

    if (data.image) {
      form.append("image", data.image[0]);
    }

    // service menu -> useMutation react query
    await serviceMenu(form);
  };

  // get menu by id
  useEffect(() => {
    // update form
    if (id) {
      const getMenuById = async () => {
        try {
          // set data to form
          const response = await menuService.getById(id);
          const currentMenu = response.data;
          setValue("id", currentMenu.id);
          setValue("name", currentMenu.name);
          setValue("price", currentMenu.price);
        } catch (error) {
          console.log(error);
        }
      };
      getMenuById();
    }
  }, [id, menuService, setValue]);

  return (
    <>
      {/* Modal Edit Menu */}
      <input
        className="modal-state"
        id="modal-update-menu"
        type="checkbox"
        checked={true}
        readOnly
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-update-menu"></label>
        <div className="modal-content rounded-2xl flex flex-col gap-5">
          {/* Close Button Modal */}
          <Link to={"/dashboard/menu"}>
            <label
              htmlFor="modal-update-menu"
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
                  {id ? "Edit" : "Add"} Menu
                </h1>
                <h2 className="text-2xl font-semibold pb-2">
                  {id ? "Update" : "Create"} here 📝
                </h2>
                <p className="text-sm pb-5">
                  {id ? "Update" : "Create"} your{" "}
                  <span className="text-orange">menu </span>
                  dish for your app management !
                </p>
              </div>

              {/* Menu Form */}
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

                  {/* Price Field */}
                  <div className="form-field">
                    <label className="form-label mb-1">Price</label>
                    <input
                      {...register("price")}
                      placeholder="30xxxx"
                      type="number"
                      className={`input bg-grey max-w-full ${
                        errors.price && "input-error"
                      }`}
                      min={0}
                    />
                    {errors.price && (
                      <label className="form-label">
                        <span className="form-label-alt text-red">
                          {errors.price.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Image Field */}
                  <div className="form-field">
                    <label className="form-label mb-1">Image</label>
                    <input
                      {...register("image")}
                      size="20"
                      type="file"
                      className={`input bg-grey max-w-full py-1.5 text-xs ${
                        errors.image && "input-error"
                      }`}
                    />
                    {errors.image && (
                      <label className="form-label">
                        <span className="form-label-alt text-red">
                          {errors.image.message}
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
