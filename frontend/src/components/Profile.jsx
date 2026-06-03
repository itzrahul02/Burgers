import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "./Context";
import NavBar from "../Nav";
import { userAPI, authAPI } from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faSignOutAlt, faShoppingBag, faPlus } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { setIsLoggedIn, setAvatar, setUser } = useContext(cartContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        if (response.data.success) {
          setProfile(response.data.data);
          setAvatar(response.data.data.avatar);
          setIsLoggedIn(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-hidden"
          >
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-orange-600 to-amber-500 relative">
              <div className="absolute -bottom-12 left-8">
                <img
                  src={profile?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-neutral-900 object-cover shadow-xl"
                />
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-16 px-8 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile?.name}</h2>
                  <p className="text-neutral-400">@{profile?.username}</p>
                  {profile?.role === "ADMIN" && (
                    <span className="inline-block mt-2 bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full font-medium">
                      ADMIN
                    </span>
                  )}
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                  <Link to="/orders" className="btn-secondary !px-4 !py-2 text-sm">
                    <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                    My Orders
                  </Link>
                  {profile?.role === "ADMIN" && (
                    <Link to="/admin" className="btn-primary !px-4 !py-2 text-sm">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Add Burger
                    </Link>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-800/50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Email</p>
                    <p className="text-white">{profile?.email}</p>
                  </div>
                </div>
                <div className="bg-neutral-800/50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhone} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Phone</p>
                    <p className="text-white">{profile?.phone || "Not set"}</p>
                  </div>
                </div>
                <div className="bg-neutral-800/50 rounded-xl p-4 flex items-center gap-3 sm:col-span-2">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Address</p>
                    <p className="text-white">{profile?.address || "Not set"}</p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="mt-8 flex items-center gap-2 text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
