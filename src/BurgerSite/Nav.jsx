import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faClose, faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/pngwing.com.png';
import {Link} from "react-router-dom"
import { useState } from "react";
import { cartContext } from "./components/Context";
import { useContext } from "react";
const nav = [
  {
    name : "Home",
    dir : "/"
  },{
    name : "Menu",
    dir :"/order"
  },{
    name : "About",
    dir :"/about"
  }
]

function NavBar(props) {
  const [menu,setMenu] = useState(true)
  const { isLoggedIn }= useContext(cartContext);
  return (
    <>
    <nav className="shadow-custom-shadow fixed w-full top-0 z-20">
      <div
        className="flex justify-between items-center bg-yellow-400 px-6 sm:px-16 p-2 text-white font-semibold"
        style={{ color: 'rgb(80, 35, 20)', fontFamily: 'Flame, sans-serif' }}       
      >
        {/* Menu Icon */}
        <div className="button1 cursor-pointer">
          {menu ? (
            <FontAwesomeIcon icon={faBars} onClick={()=>setMenu(!menu)} className="hover:scale-110 transition-transform duration-200 sm:text-[24px]"/>
          ):(
            <FontAwesomeIcon icon={faClose} onClick={()=>setMenu(!menu)} className="hover:scale-110 transition-transform duration-200 text-[20px] sm:text-[28px]"/>
          )}
        </div>

        {/* Logo and Title */}
        <div className="logoandtitle">
          <Link to="/" className="flex items-center justify-center gap-2 sm:gap-4 font-bold text-[2rem]">
          <img src={logo} alt="Logo" className="h-6 sm:h-10"/>
          <h3 className="title text-[1.6rem] lg:text-[2rem]" style={{ fontFamily: 'Flame, sans-serif' }}>Burger King</h3> {/* Apply Flamenco font */}
          </Link>
        </div>

        {/* User and Cart Icons */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="">
            {isLoggedIn?(
              <Link to="/profile">
              <FontAwesomeIcon icon={faUser} className="hover:scale-110 transition-transform duration-200 sm:text-[1.5rem] " />
            </Link>
            ):
            (
              <>
              <Link to='/login' className="
              bg-white sm:px-4 sm:py-2 px-2 py-1 rounded-2xl sm:text-[1rem] text-[0.8rem] 
              ">
              <button>LogIn</button>
              </Link>
              </>
            )
            }
            
          </div>
          <Link to="/cart">
          <div className="bg-red-700 hover:bg-red-900 font-sans text-white px-3 py-2 rounded-full flex items-center gap-2 shadow-[0_4px_3px_rgba(0,0,0,0.5)]">
            <FontAwesomeIcon icon={faCartShopping} className="text-[0.8rem] sm:text-[1.2rem]" />
            <span className="hidden sm:block sm:text-[1rem]">View Cart</span>
          </div>
          </Link>
        </div>
      </div>
    </nav>

    {!menu && (
      <div className="side-bar mt-[2px] absolute top-[3rem] sm:top-[3.5rem] lg:top-[4rem]">
      <div className="opacity-95 fixed z-20 w-[50%] sm:w-[35%] md:w-[28%] lg:w-[20%] shadow-[4px_4px_8px] pb-[2rem]" 
           style={{ backgroundColor: 'rgb(248, 241, 231)', color: 'rgb(80, 35, 20)', fontFamily: 'Flame, sans' }} >
      <ul className="pt-[2rem] px-[8px] text-center text-[1rem] sm:text-[1.5rem] leading-[3rem] sm:leading-[4rem]" >
        {nav && nav.map((e,i)=>{
          return <Link to={e.dir} key={i}>
            <li className="border-2 border-orange-900 rounded-md mb-2 hover:bg-black/10 ">{e.name}</li>
          </Link>
        })}
      </ul>
      <div className="flex p-[1rem] justify-center gap-4 pt-[1rem] font-medium text-black items-center" style={{fontFamily:'sans-serif'}}>
      <FontAwesomeIcon icon={faPhone} className="text-[0.8rem] sm:text-[1.5rem]"/>
        <div className="text-[0.8rem] md:text-[1rem] w-full">
          <div className="hidden sm:block md:text-[0.9rem] lg:text-[1rem]">We are here to help you.</div>
          <div>Call us at <span className="text-indigo-800 font-bold md:text-[0.9rem] lg:text-[1rem]">86044008xx</span></div>
        </div>
        
      </div>      
      </div>
    </div>
    )}
    </>
  );
}

export default NavBar;
