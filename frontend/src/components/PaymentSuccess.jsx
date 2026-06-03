import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "./Context";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHome, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  const { setCartItems } = useContext(cartContext);
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment successful! Your order is being prepared.");
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="glass-card p-10 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-400 mb-6" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
        <p className="text-neutral-400 mb-6">Your delicious burgers are being prepared</p>

        {referenceNum && (
          <div className="bg-neutral-800/50 rounded-xl p-4 mb-6">
            <p className="text-xs text-neutral-500 mb-1">Reference Number</p>
            <p className="text-orange-400 font-mono font-medium">{referenceNum}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="btn-secondary flex-1"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="btn-primary flex-1"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
            My Orders
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
