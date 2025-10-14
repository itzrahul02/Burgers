import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useContext } from "react";
import NavBar from "../Nav";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "./Context";
import axios from "axios";

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

    try{
      if (!email||!password){
        console.log("Wrong credentials");
        toast.error("Wrong Credentials")
        setLoading(false); // Reset loading state on error
        return
        
      }
      const response = await axios.post(
          "https://burgers-y7t2.onrender.com//api/user/login"
          ,{email,password},
        {withCredentials:true})
        if (response.data.success){
          toast.success("Login successful")
          setIsLoggedIn(true); // Update context state
          console.log("Login successful", response.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          navigate("/")  
        } 
        else{
          toast.error(response.data.message||"Login failed")
        }
    }
    catch(err){
      console.log("Error during login",err);
      toast.error("Login failed. Please try again.");
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-yellow-400 min-h-screen h-full pb-[2rem] pt-[5rem] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] space-y-[1rem] bg-white p-[2rem] rounded-xl shadow-lg">
          
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
              onKeyDown={(e)=>{
                if (e.key==="Enter") handleLogin(e)}}
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
