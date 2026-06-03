import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "../services/api";
import NavBar from "../Nav";
import { motion } from "framer-motion";

export function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "", username: "", email: "", phone: "", address: "", password: "", confirmPassword: ""
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!form.email || !form.username || !form.name) {
      toast.error("Name, email, and username are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "confirmPassword") formData.append(key, form[key]);
      });
      if (avatar) formData.append("avatar", avatar);

      const response = await authAPI.register(formData);
      if (response.data.success) {
        toast.success("Registration successful! Please verify your email.");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-neutral-400">Join us for delicious burgers</p>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">Full Name*</label>
                  <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">Username*</label>
                  <input name="username" value={form.username} onChange={handleChange} className="input-field" placeholder="johndoe" />
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Email*</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className="input-field" placeholder="City, State" />
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="input-field file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Password*</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="input-field pr-12"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-orange-400">
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-400 mb-1 block">Confirm Password*</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="input-field pr-12"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-orange-400">
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full !rounded-xl mt-2">
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-neutral-400 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
