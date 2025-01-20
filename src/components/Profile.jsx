import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "./Context";
import NavBar from "../Nav";
const Profile = () => {
  const { setIsLoggedIn } = useContext(cartContext) // Access the setter for login state
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state to false
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300"
        />
        <h1 className="text-2xl font-bold mb-2">Welcome, User!</h1>
        <p className="text-gray-600 mb-4">This is your profile page.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
    </>
    
  );
};

export default Profile;
