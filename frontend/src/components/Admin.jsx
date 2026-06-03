import React, { useState } from "react";
import { toast } from "react-toastify";
import { burgerAPI } from "../services/api";
import NavBar from "../Nav";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = ["VEG", "NON_VEG", "PREMIUM", "COMBO", "SIDES", "BEVERAGES"];

export default function Admin() {
  const [burger, setBurger] = useState({
    name: "",
    category: "VEG",
    image: null,
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setBurger({ ...burger, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBurger({ ...burger, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!burger.name || !burger.price || !burger.image) {
      toast.error("Name, price, and image are required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", burger.name);
      formData.append("category", burger.category);
      formData.append("image", burger.image);
      formData.append("description", burger.description);
      formData.append("price", burger.price);

      await burgerAPI.add(formData);
      toast.success("Burger added successfully!");
      setBurger({ name: "", category: "VEG", image: null, description: "", price: "" });
      setPreview(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add burger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
              <p className="text-neutral-400">Add a new burger to the menu</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Burger Name*</label>
                <input
                  name="name"
                  value={burger.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Classic Whopper"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-2 block">Category*</label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setBurger({ ...burger, category: cat })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        burger.category === cat
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-orange-500/50"
                      }`}
                    >
                      {cat.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Image*</label>
                {preview && (
                  <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mb-3" />
                )}
                <label className="flex items-center justify-center gap-2 input-field cursor-pointer hover:border-orange-500/50">
                  <FontAwesomeIcon icon={faUpload} className="text-orange-400" />
                  <span className="text-neutral-400">{burger.image ? burger.image.name : "Choose file"}</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Description</label>
                <textarea
                  name="description"
                  value={burger.description}
                  onChange={handleChange}
                  className="input-field resize-none h-24"
                  placeholder="A flame-grilled patty with fresh toppings..."
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Price (₹)*</label>
                <input
                  type="number"
                  name="price"
                  value={burger.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="199"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full !rounded-xl">
                {loading ? "Adding..." : "Add Burger"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
