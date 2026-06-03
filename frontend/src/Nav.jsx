import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faClose, faFire } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { cartContext } from "./components/Context";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { name: "Home", dir: "/" },
  { name: "Menu", dir: "/order" },
  { name: "Orders", dir: "/orders" },
  { name: "About", dir: "/about" },
  { name: "Profile", dir: "/profile" },
];

function NavBar() {
  const [menu, setMenu] = useState(false);
  const { loginCheck, avatar, cartItems } = useContext(cartContext);
  const location = useLocation();

  return (
    <>
      <nav className="fixed w-full top-0 z-50">
        <div className="bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Menu Toggle */}
              <button
                onClick={() => setMenu(!menu)}
                className="text-neutral-300 hover:text-orange-400 transition-colors p-2"
              >
                <FontAwesomeIcon icon={menu ? faClose : faBars} className="text-xl" />
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFire} className="text-orange-500 text-2xl" />
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  BURGERS
                </span>
              </Link>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {loginCheck() ? (
                  <Link to="/profile">
                    <img
                      src={avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      className="w-9 h-9 rounded-full border-2 border-orange-500 object-cover hover:scale-110 transition-transform"
                      alt="avatar"
                    />
                  </Link>
                ) : (
                  <Link to="/login" className="btn-secondary !px-4 !py-2 text-sm">
                    Login
                  </Link>
                )}
                <Link to="/cart" className="relative group">
                  <div className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full transition-all group-hover:scale-110">
                    <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                  </div>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMenu(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-neutral-900/95 backdrop-blur-xl border-r border-neutral-800 z-50 p-6"
            >
              <div className="flex items-center gap-2 mb-10">
                <FontAwesomeIcon icon={faFire} className="text-orange-500 text-2xl" />
                <span className="text-xl font-bold text-white">BURGERS</span>
              </div>
              <ul className="space-y-2">
                {nav.map((e, i) => (
                  <li key={i}>
                    <Link
                      to={e.dir}
                      onClick={() => setMenu(false)}
                      className={`block px-4 py-3 rounded-xl transition-all font-medium ${
                        location.pathname === e.dir
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      {e.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-8 left-6 right-6">
                <div className="glass-card p-4">
                  <p className="text-neutral-400 text-sm">Need help?</p>
                  <p className="text-orange-400 font-semibold mt-1">Call 860-440-08xx</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
