import React, { useContext, useEffect, useState } from "react";
import ImageArea from "./ImageArea";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import Loader from "../custom/Loader";
import { UserContext } from "../context/UserContext";

export default function ProfileArea() {
  const token = localStorage.getItem("userToken");
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/order/cancel/${id}`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (response.status == 200) {
        toast.success("The order canceled", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      getOrders();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="user-area-wrap ptb-100 container">
      <h4 className="user-header">User Profile</h4>

      <div className="user-info flex space-x-5 items-center">
        <div>
          <ImageArea user={user} />
        </div>
        <div className="w-full">
          <table className="table m-0">
            <tbody>
              <tr>
                <th scope="row">Username:</th>
                <td>{user.userName}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Role:</th>
                <td>{user.role}</td>
              </tr>
              <tr>
                <th scope="row">Number of orders:</th>
                <td>{orders.length}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowOrders(!showOrders)}
          >
            {isLoading
              ? "Loading..."
              : showOrders
              ? "Hide Orders"
              : "Show Orders"}
          </button>
        </div>
      </div>
      {orders.length != 0 ? (
        showOrders && (
          <div className="orders-table mt-5">
            <h5>Orders List</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th># Of products</th>
                  <th>Final Price</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>{order.products.length}</td>
                    <td>${order.finalPrice.toFixed(2)}</td>
                    <td>{order.address}</td>
                    <td>{order.phoneNumber}</td>
                    <td>
                      {order.status === "deliverd" ? (
                        <span className="text-success">{order.status}</span>
                      ) : order.status === "cancelled" ? (
                        <span className="text-warning">{order.status}</span>
                      ) : (
                        <div className="d-flex gap-3">
                          <span className="text-danger">{order.status}</span>
                          <button
                            className="btn btn-danger"
                            onClick={() => cancelOrder(order._id)}
                          >
                            cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <h2 className="text-center">No Orders Found</h2>
      )}
    </div>
  );
}
