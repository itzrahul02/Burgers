import React, { useContext } from "react";
import { cartContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { paymentAPI } from "../services/api";
import NavBar from "../Nav";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, isLoggedIn, updateQuantity, quantities, removeItem } = useContext(cartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * (quantities[item.id] || item.quantity), 0);

  function handleLogIn() {
    if (!isLoggedIn) {
      toast.info("Please login to checkout");
      navigate("/login");
    } else {
      checkoutHandler();
    }
  }

  async function checkoutHandler() {
    try {
      const { data: keyData } = await paymentAPI.getKey();
      const { data: orderData } = await paymentAPI.checkout(total);

      const options = {
        key: keyData.data.key,
        amount: orderData.data.amount,
        currency: "INR",
        name: "Burgers",
        description: "Order Payment",
        order_id: orderData.data.orderId,
        callback_url: "http://localhost:8080/api/payment/verification",
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment initialization failed");
      console.error("Payment error:", error);
    }
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 pb-32 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {cartItems.length > 0 ? (
            <>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-title text-center mb-10"
              >
                Your Cart
              </motion.h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="glass-card flex flex-col sm:flex-row overflow-hidden hover:border-orange-500/30 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="sm:w-40 w-full h-32 sm:h-auto object-cover"
                      />
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            <p className="text-neutral-400 text-sm">₹{item.price} each</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-2"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xl font-bold text-orange-400">
                            ₹{item.price * (quantities[item.id] || item.quantity)}
                          </p>
                          <div className="flex items-center bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-2 hover:bg-neutral-700 text-neutral-300 transition-colors"
                            >
                              <FontAwesomeIcon icon={faMinus} className="text-xs" />
                            </button>
                            <span className="px-4 text-white font-medium">
                              {quantities[item.id] || item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-2 hover:bg-neutral-700 text-neutral-300 transition-colors"
                            >
                              <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Checkout Bar */}
              <div className="fixed bottom-0 left-0 w-full bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-6 py-4 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                  <div>
                    <p className="text-neutral-400 text-sm">Total ({cartItems.length} items)</p>
                    <p className="text-2xl font-bold text-orange-400">₹{total}</p>
                  </div>
                  <button onClick={handleLogIn} className="btn-primary">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center pt-32"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="text-6xl text-neutral-700 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-2">Cart is Empty</h2>
              <p className="text-neutral-400 mb-8">Add some delicious burgers to get started!</p>
              <button onClick={() => navigate("/order")} className="btn-primary">
                Browse Menu
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
