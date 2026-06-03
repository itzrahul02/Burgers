import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "./Context";
import NavBar from "../Nav";
import { burgerAPI } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const categories = ["ALL", "VEG", "NON_VEG", "PREMIUM", "COMBO", "SIDES", "BEVERAGES"];

function Menu() {
  const { additems, updateQuantity, quantities } = useContext(cartContext);
  const [active, setActive] = useState("ALL");
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBurgers();
  }, []);

  const fetchBurgers = async () => {
    try {
      setLoading(true);
      const response = await burgerAPI.getAll();
      if (response.data.success) {
        const data = response.data.data.map((item, index) => ({
          ...item,
          id: item.id || index + 1,
        }));
        setBurgers(data);
      }
    } catch (error) {
      console.error("Error fetching burgers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBurgers = burgers.filter((item) => {
    const matchesCategory = active === "ALL" || item.category === active;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleAddItem(item) {
    additems({ ...item, quantity: 1 });
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 pb-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="section-title mb-4">Our Menu</h1>
            <p className="text-neutral-400 max-w-md mx-auto">
              Fresh ingredients, bold flavors, unforgettable taste
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search burgers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  active === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {cat.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse">
                  <div className="w-full h-48 bg-neutral-800 rounded-xl mb-4" />
                  <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-neutral-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            /* Menu Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredBurgers.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-card overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-orange-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                          {item.category?.replace("_", " ")}
                        </span>
                      </div>
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-red-400 font-bold text-lg">Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                      <p
                        className="text-neutral-400 text-sm mb-3 cursor-pointer hover:text-orange-400 transition-colors"
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.description?.slice(0, 60)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-400">₹{item.price}</span>
                        {quantities[item.id] >= 1 ? (
                          <div className="flex items-center bg-orange-500 rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-2 hover:bg-orange-600 transition-colors"
                            >
                              <FontAwesomeIcon icon={faMinus} className="text-white text-xs" />
                            </button>
                            <span className="px-3 text-white font-bold">{quantities[item.id]}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-2 hover:bg-orange-600 transition-colors"
                            >
                              <FontAwesomeIcon icon={faPlus} className="text-white text-xs" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddItem(item)}
                            disabled={!item.available}
                            className="bg-neutral-800 hover:bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add +
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {filteredBurgers.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-xl">No burgers found</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white">{selectedItem.name}</h3>
                  <span className="text-2xl font-bold text-orange-400">₹{selectedItem.price}</span>
                </div>
                <span className="inline-block bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full mb-4">
                  {selectedItem.category?.replace("_", " ")}
                </span>
                <p className="text-neutral-300 leading-relaxed">{selectedItem.description}</p>
                <button
                  onClick={() => {
                    handleAddItem(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="btn-primary w-full mt-6"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;


// {(active ? NonVegData : VegData).map((item) => (
//       <div
//         key={item.id}
//         className="bg-[#1e1e1e] rounded-2xl shadow-md hover:shadow-orange-400/20 p-4 sm:p-6 transition-transform duration-300 hover:scale-[1.03] relative"
//       >
//         <img src={item.type} alt="" className="w-5 h-5 absolute top-4 right-4" />
//         <div className="flex justify-center">
//           <img src={item.image} alt="Burger" className="w-40 h-28 object-cover rounded-md mb-4" />
//         </div>
//         <div className="text-center space-y-2">
//           <h3 className="text-xl font-bold text-orange-200">{item.name}</h3>
//           <div className="flex items-center justify-between mt-3 w-[80%] mx-auto text-orange-300 font-semibold text-lg">
//             <p>₹{quantities[item.id] > 0 ? quantities[item.id] * item.price : item.price}</p>

//             {/* Quantity Controls or Add */}
//             {quantities[item.id] >= 1 ? (
//               <div className="flex items-center bg-orange-500/90 px-3 py-1 rounded-full text-white text-sm sm:text-base gap-2 font-bold">
//                 <button onClick={() => handleUpdateQuantity(item.id, -1)} className="hover:text-gray-200">−</button>
//                 <span>{quantities[item.id]}</span>
//                 <button onClick={() => handleUpdateQuantity(item.id, 1)} className="hover:text-gray-200">+</button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => handleAddItem(item)}
//                 className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded-full text-sm sm:text-base"
//               >
//                 Add
//               </button> 
//             )}
//           </div>
//         </div>
//       </div>
//     ))}