import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";
import { toast } from "react-toastify";
import NavBar from "../Nav";

export function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!email || !username) {
      toast.error("Email and username are required!");
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
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome ${username.toUpperCase()} 😊`);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-yellow-400 min-h-screen h-full pb-[2rem] pt-[5rem] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center w-[90%] sm:w-[60%] md:w-[45%] lg:w-[25%] space-y-[1rem] bg-white p-[2rem] rounded-xl shadow-lg">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile pic"
            className="rounded-full border-4 w-[6rem] h-[6rem] border-black/50"
          />
          <div className="w-full border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#D5DDE7] outline-none w-full "
              placeholder="Username"
            />
          </div>
          <div className="w-full border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#D5DDE7] outline-none w-full "
              placeholder="Email"
            />
          </div>
          <div className="flex justify-between w-full items-center space-x-2 border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#D5DDE7] outline-none w-full "
              placeholder="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-xl"
            />
          </div>
          <div className="flex justify-between w-full items-center space-x-2 border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#D5DDE7] outline-none w-full "
              placeholder="Confirm Password"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer text-xl"
            />
          </div>
          <button
            type="button"
            onClick={handleRegistration}
            className="bg-orange-700 text-center w-full p-[0.5rem] rounded-lg text-white font-bold hover:bg-orange-800 mt-4"
          >
            Register
          </button>
        </div>
        <div className="mt-4 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] text-center">
          <Link to="/login">
            <u>Go to Login</u>
          </Link>
        </div>
      </div>
    </>
  );
}
