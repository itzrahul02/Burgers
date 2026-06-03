import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import NavBar from "../Nav";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheckCircle, faTruck, faBoxOpen, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";

const STATUS_CONFIG = {
  PLACED: { icon: faClock, color: "text-blue-400", bg: "bg-blue-400/10", label: "Placed" },
  CONFIRMED: { icon: faCheckCircle, color: "text-cyan-400", bg: "bg-cyan-400/10", label: "Confirmed" },
  PREPARING: { icon: faSpinner, color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Preparing" },
  OUT_FOR_DELIVERY: { icon: faTruck, color: "text-orange-400", bg: "bg-orange-400/10", label: "Out for Delivery" },
  DELIVERED: { icon: faBoxOpen, color: "text-green-400", bg: "bg-green-400/10", label: "Delivered" },
  CANCELLED: { icon: faBan, color: "text-red-400", bg: "bg-red-400/10", label: "Cancelled" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getMyOrders();
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await orderAPI.cancel(orderId);
      if (response.data.success) {
        toast.success("Order cancelled");
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot cancel this order");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-center mb-10"
          >
            My Orders
          </motion.h2>

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center pt-20"
            >
              <FontAwesomeIcon icon={faBoxOpen} className="text-5xl text-neutral-700 mb-4" />
              <p className="text-neutral-400 text-lg">No orders yet. Start ordering!</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {orders.map((order, idx) => {
                  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.PLACED;
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-card p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div>
                          <p className="text-xs text-neutral-500">Order #{order.id?.slice(-8)}</p>
                          <p className="text-xs text-neutral-600">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                          <FontAwesomeIcon icon={config.icon} className={order.status === "PREPARING" ? "animate-spin" : ""} />
                          {config.label}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mb-4">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex justify-between items-center bg-neutral-800/40 rounded-lg px-4 py-2">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                              )}
                              <span className="text-neutral-300 text-sm">{item.name} × {item.quantity}</span>
                            </div>
                            <span className="text-neutral-400 text-sm">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center border-t border-neutral-800 pt-3">
                        <p className="text-lg font-bold text-orange-400">₹{order.totalAmount}</p>
                        {(order.status === "PLACED" || order.status === "CONFIRMED") && (
                          <button
                            onClick={() => handleCancel(order.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
