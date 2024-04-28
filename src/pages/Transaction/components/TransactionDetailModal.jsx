import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import TransactionService from "@services/TransactionService";

import foodDefaultImg from "@assets/images/food-default.png";

export default function TransactionDetailModal() {
  // use service with useMemo -> prevent re-render
  const transactionService = useMemo(() => TransactionService(), []);

  // use search params for id
  const { id } = useParams();

  // get by id transaction -> react query
  const { data, isLoading } = useQuery({
    queryKey: ["transDetail"],
    queryFn: async () => {
      return await transactionService.getById(id);
    },
  });

  // loading get all transaction -> react query
  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <>
      {/* Modal */}
      <div>
        <input
          type="checkbox"
          id="drawer-right"
          className="drawer-toggle"
          checked={true}
          readOnly
        />
        <div className="drawer drawer-right bg-dark">
          <div className="drawer-content pt-10 flex flex-col h-full">
            {/* Close Button Modal */}
            <Link to={"/dashboard/transaction"}>
              <label
                htmlFor="drawer-right"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
            </Link>

            {/* Tittle */}
            <div className="mb-8">
              <h1 className="text-xl font-semibold mb-2">
                Transaction Details
              </h1>
              <h2 className="text-sm text-grey mb-4">
                Transaction #{data.data.id}
              </h2>
              <div className="divider-title w-full"></div>
            </div>

            {/* Items */}
            {data.data.transactionDetails.map((transDetail) => (
              <div key={transDetail.id} className="card bg-grey mb-6">
                <div className="card-body flex flex-row px-4">
                  {/* Image */}
                  <div className="my-auto w-20">
                    <img
                      src={
                        transDetail.menu.image
                          ? transDetail.menu.image
                          : foodDefaultImg
                      }
                      alt="menuImg"
                    />
                  </div>
                  {/* Menu */}
                  <div className="my-auto w-full px-1">
                    <div className="text-md">{transDetail.menu.name}</div>
                    <div className="text-sm mt-1 mb-2">
                      {transDetail.menu.price}{" "}
                      <span className="text-sm my-auto ml-1">
                        x {transDetail.qty}
                      </span>
                    </div>
                    <div className="divider-title"></div>
                    <div className="text-sm text-orange font-semibold mt-2">
                      {transDetail.price}
                    </div>
                  </div>
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
                  {data.data.transactionDetails.reduce((a, b) => {
                    return a.price + b.price;
                  })}
                </div>
              </div>
            </div>

            {/* Close Button Modal */}
            <div className="h-full flex flex-row justify-end items-end gap-2">
              <Link to={"/dashboard/transaction"}>
                <button className="btn btn-sm bg-orange">Close</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
