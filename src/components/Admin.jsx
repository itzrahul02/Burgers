import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Admin() {
  const [burger, setBurger] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setBurger({ ...burger, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", burger.name);
  formData.append("category", burger.category);
  formData.append("image", burger.image); // this is a File object
  formData.append("description", burger.description);
  formData.append("price", burger.price);

  try {
    await axios.post("https://burgers-y7t2.onrender.com//api/burgers/addburger", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization": `Bearer ${yourToken}` if you are using authentication
      },
      withCredentials: true, // if cookies are involved (like accessToken)
    });

    toast.success("Burger added successfully!");
    setBurger({
      name: "",
      category: "",
      image: "",
      description: "",
      price: "",
    });
  } catch (err) {
    console.error(err);
    toast.error("Failed to add burger");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel - Add New Burger</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Burger Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={burger.name}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Category</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="category"
                value="Veg"
                checked={burger.category === "Veg"}
                onChange={handleChange}
                required
              />{" "}
              Veg
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Non-Veg"
                checked={burger.category === "Non-Veg"}
                onChange={handleChange}
              />{" "}
              Non-Veg
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">Image</label>
          <input
            type="file"
            onChange={(e)=>setBurger({...burger,image:e.target.files[0]})}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={burger.description}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={burger.price}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Burger
        </button>
      </form>
      
    </div>
  );
}
