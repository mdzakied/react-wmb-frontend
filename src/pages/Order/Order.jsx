import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import OrderList from "./components/OrderList";
import OrderAddDrawer from "./components/OrderAddDrawer";

import UserService from "@services/UserService";
import TableService from "@services/TableService";

import SweetAlert from "@shared/components/Modal/SweetAlert";

export default function Order() {
  // use state from props
  const [user, setUser] = useState({});
  const [tables, setTables] = useState([]);
  const [cart, setCart] = useState([]);

  // use service with useMemo -> prevent re-render
  const userService = useMemo(() => UserService(), []);
  const tableService = useMemo(() => TableService(), []);
  const sweetAlert = useMemo(() => SweetAlert(), []);

  // get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // handle add to chart
  const handleAddToChart = (menu) => {
    const currentItem = cart.find((item) => item.id === menu.id);

    if (currentItem) {
      const newCart = cart.map((item) => {
        if (item.id === menu.id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(newCart);
    } else {
      menu["qty"] = 1;
      setCart([...cart, menu]);
    }

    // notification
    sweetAlert.success("Add to chart successfully !");
  };

  // handle increment to chart
  const handleIncrementCart = (id) => {
    // increment qty
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  // handle decrement to chart
  const handleDecrementCart = (id) => {
    const currentItem = cart.find((item) => item.id === id);

    // delete from cart when qty is 0
    if (currentItem.qty === 1) {
      const newCart = cart.filter((item) => item.id !== id);
      setCart(newCart);
      return;
    }

    // decrement qty
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  // get all user and filter currentUser -> react query
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await userService.getAll({
        name: currentUser.username,
      });

      // set user
      setUser(
        res.data.filter((user) => {
          return user.userAccount.username === currentUser.username;
        })[0]
      );

      return res.data;
    },
  });

  // get all table (50)  -> react query
  useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await tableService.getAll({
        size: 50,
      });

      // set user
      setTables(res.data);

      return res.data;
    },
  });

  return (
    <>
      {/* Outlet for Modal Form */}
      <Outlet />

      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Order</h1>
        <div className="divider-title"></div>
      </div>

      {/* Order Add Drawer */}
      <div className="flex justify-end gap-4 pt-6">
        <OrderAddDrawer
          props={{ user, tables, cart }}
          handleIncrementCart={handleIncrementCart}
          handleDecrementCart={handleDecrementCart}
        />
      </div>

      {/* Order List */}
      <OrderList handleAddToChart={handleAddToChart} />
    </>
  );
}
