import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "./Context";
import NavBar from "../Nav";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { setIsLoggedIn,setAvatar } = useContext(cartContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const handleLogout =async () => {
    console.log(document.cookie);
    try{
      console.log("Logging out...");
      const response= await axios.post("http://localhost:3000/api/user/logout",{},
        {withCredentials:true}
      )
      if (response.data.success){ 
        console.log("Logout successful");
        toast.success("Logout successful");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
      }
      else{
        console.error("Logout failed", response.data.message);
      }
    }
    catch(err){
      console.error("Error during logout:", err);
    }   
  };

  useEffect(() => {
    const profileDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/profile", {
          withCredentials: true
        });
        if (response.data.success) {
          console.log("Profile details fetched successfully", response.data.data);
          setProfile(response.data.data);
          setAvatar(response.data.data.avatar);
          setIsLoggedIn(true);
        } else {
          console.error("Failed to fetch profile details", response.data.message);
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching profile details", err);
      }
    };
    profileDetails();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
          {/* Left side - Avatar and Name */}
          <div className="bg-white flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-200">
            <img
              src={profile?.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Hi, {profile?.name}</h2>
            <p className="text-gray-500 text-sm mt-1">Your personal profile</p>
          </div>

          {/* Right side - Details */}
          <div className="flex-1 p-8 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Profile Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-lg font-medium text-gray-800">{profile?.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-800">{profile?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-medium text-gray-800">{profile?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-medium text-gray-800">{profile?.address}</p>
              </div>
            </div>

            {/* Logout button */}
            <div className="pt-6 flex justify-between space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
              >
                Logout
              </button>
              {profile?.isAdmin?(<Link className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
              to={"/admin"}
              >Add More</Link>):null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
