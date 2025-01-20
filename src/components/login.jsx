import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useContext } from "react";
import NavBar from "../Nav";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { cartContext } from "./Context";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const {setIsLoggedIn}=useContext(cartContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-yellow-400 min-h-screen h-full pb-[2rem] pt-[5rem] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] space-y-[1rem] bg-white p-[2rem] rounded-xl shadow-lg">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile pic"
            className="rounded-full border-4 w-[6rem] h-[6rem] border-black/50"
          />
          <div className="w-full border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#D5DDE7] outline-none w-full "
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <div className="flex justify-between w-full items-center space-x-2 border-2 rounded-lg border-black/70 bg-slate-300/80 p-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#D5DDE7] outline-none w-full"
              placeholder="Password"
              aria-label="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-xl" // Increase icon size for better touch targets
            />
          </div>
          <button
            type="button"
            className="bg-orange-700 w-full p-[0.5rem] rounded-lg text-white font-bold hover:bg-orange-800 mt-4"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <div className="mt-4">
          <Link to="/register">
            <u>New here? Create an account</u>
          </Link>
        </div>
      </div>
    </>
  );
}
