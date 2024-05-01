import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

import TransactionService from "@services/TransactionService";
import SweetAlert from "@shared/components/Modal/SweetAlert";
import NumberFormatter from "@shared/utils/NumberFormatter";

import foodDefaultImg from "@assets/images/food-default.png";

export default function OrderAddDrawer({
  props,
  handleDecrementCart,
  handleIncrementCart,
}) {
  // use service and utils with useMemo -> prevent re-render
  const numberFormatter = useMemo(() => NumberFormatter(), []);

  // use props
  const { user, tables, cart } = props;

  // use state for selected table
  const [table, setTable] = useState(null);

  // use service and sweet alert with useMemo -> prevent re-render
  const transactionService = useMemo(() => TransactionService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // use navigate hook -> redirect
  const navigate = useNavigate();

  // update menu -> useMutation react query
  const { mutate: addOrder } = useMutation({
    mutationFn: async (payload) => {
      // create
      return await transactionService.create(payload);
    },
    onSuccess: () => {
      // close modal
      navigate("/dashboard/transaction");

      // notification
      sweetAlert.success("Add order success !");
    },
    onError: () => {
      // close modal
      navigate("/dashboard/transaction");

      // notification
      sweetAlert.error("Add order failed !");
    },
  });

  const handleAddOrder = () => {
    const order = {
      userId: user.id,
      tableId: table,
      transactionDetails: cart.map((item) => ({
        menuId: item.id,
        qty: item.qty,
      })),
    };

    // create order
    addOrder(order);
  };

  return (
    <>
      {/* Button */}
      <label htmlFor="drawer-right" className="btn bg-orange">
        Add Order
      </label>

      {/* Modal */}
      <div>
        <input type="checkbox" id="drawer-right" className="drawer-toggle" />
        <div className="drawer drawer-right bg-dark">
          <div className="drawer-content pt-10 flex flex-col h-full">
            {/* Close Button Modal */}
            <label
              htmlFor="drawer-right"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>

            {/* Tittle */}
            <div className="mb-4">
              <h1 className="text-xl font-semibold mb-4">Add Order</h1>
              <div className="divider-title w-full"></div>

              {/* User */}
              <div className="my-4">
                <h2 className="text-sm mb-2">User</h2>
                <input
                  type="name"
                  className="input input-sm bg-grey max-w-full"
                  readOnly
                  value={user.name ? user.name : "-"}
                />
              </div>

              {/* Table Form */}
              <div className="my-4">
                <h2 className="text-sm mb-2">Table</h2>
                <select
                  onChange={(e) => setTable(e.target.value)}
                  className="select select-sm bg-grey cursor-pointer"
                >
                  <option value={table}> Take Away</option>
                  {tables.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Items */}
            <h1 className="text-xl font-semibold mb-2">Items</h1>
            <div className="divider-title w-full mb-6"></div>
            {cart &&
              cart.map((item) => (
                <div key={item.id}>
                  {/* Menu */}
                  <div className="card bg-grey mb-3">
                    <div className="card-body flex flex-row px-4">
                      {/* Image */}
                      <div className="my-auto w-20">
                        <img
                          src={
                            item.image ? `/${item.image.url}` : foodDefaultImg
                          }
                          alt="menuImg"
                        />
                      </div>

                      {/* Menu */}
                      <div className="my-auto w-full px-1">
                        <div className="text-md">{item.name}</div>
                        <div className="text-sm mt-1 mb-2">
                          {numberFormatter.formatRupiah(item.price)}{" "}
                          <span className="text-sm my-auto ml-1">
                            x {item.qty}
                          </span>
                        </div>
                        <div className="divider-title"></div>
                        <div className="text-sm text-orange font-semibold mt-2">
                          {numberFormatter.formatRupiah(item.price * item.qty)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Action */}
                  <div className="btn-group btn-group-scrollable mb-6 ml-auto">
                    <button
                      onClick={() => handleDecrementCart(item.id)}
                      className="btn bg-grey h-8"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleIncrementCart(item.id)}
                      className="btn bg-orange ml-1 h-8"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

            {/* Sub Total */}
            <div className="card bg-grey mb-8">
              <div className="card-body flex flex-row justify-between px-4 py-4">
                <div className="text-sm flex flex-row font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="my-auto">Sub Total :</span>
                </div>
                <div className="text-orange font-semibold">
                  {numberFormatter.formatRupiah(
                    cart.reduce((a, b) => a + b.price * b.qty, 0)
                  )}
                </div>
              </div>
            </div>

            {/* Close Button Drawer */}
            <div className="h-full flex flex-row justify-end items-end gap-2">
              {/* Close Button Modal */}
              <label htmlFor="drawer-right" className="btn bg-grey">
                Close
              </label>
              {/* Add Button Drawer */}
              <button
                disabled={cart.length === 0}
                onClick={handleAddOrder}
                htmlFor="drawer-right"
                className="btn bg-orange"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

OrderAddDrawer.propTypes = {
  props: PropTypes.any,
  handleAddToChart: PropTypes.func,
  user: PropTypes.any,
  tables: PropTypes.array,
  cart: PropTypes.array,
  handleDecrementCart: PropTypes.func,
  handleIncrementCart: PropTypes.func,
};
