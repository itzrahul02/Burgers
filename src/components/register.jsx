import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import NavBar from "../Nav";

export function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!email || !username || !name) {
      toast.error("Name, email, and username are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      if (avatar) formData.append("avatar", avatar);

      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("Registration failed. Please try again.");
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="bg-yellow-400 min-h-screen flex flex-col items-center justify-center pt-20 pb-10">
        <form
          onSubmit={handleRegistration}
          className="flex flex-col justify-center items-center w-[90%] sm:w-[60%] md:w-[45%] lg:w-[30%] space-y-4 bg-white p-8 rounded-xl shadow-lg"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 bg-slate-300/80 border-2 rounded-lg border-black/70"
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 bg-slate-300/80 border-2 rounded-lg border-black/70"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 bg-slate-300/80 border-2 rounded-lg border-black/70"
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full p-2 bg-slate-300/80 border-2 rounded-lg border-black/70"
          />

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-2 bg-slate-300/80 border-2 rounded-lg border-black/70"
          />

          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full p-2 bg-slate-300/80 border-2 rounded-lg border-black/70"
          />

          <div className="flex items-center w-full space-x-2 border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#D5DDE7] outline-none w-full"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-xl"
            />
          </div>

          <div className="flex items-center w-full space-x-2 border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="bg-[#D5DDE7] outline-none w-full"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer text-xl"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-700 w-full p-2 rounded-lg text-white font-bold hover:bg-orange-800 mt-2"
          >
            Register
          </button>

          <div className="text-center mt-4">
            <Link to="/login">
              <u>Go to Login</u>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
