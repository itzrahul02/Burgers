import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Home from "./BurgerSite/components/Home";
import Menu from "./BurgerSite/components/Menu";
import About from "./BurgerSite/components/About";
import { Cart } from './BurgerSite/components/ViewCart';
import { CartProvider } from './BurgerSite/components/Context';
import { Login } from './BurgerSite/components/login';
import { Registration } from './BurgerSite/components/register';
import Profile from './BurgerSite/components/Profile';

function App() {
  
  return(
    <React.StrictMode>
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/blog" element={<div>Blog</div>} />
          <Route path="/order" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </CartProvider>
      <ToastContainer />
    </Router>
  </React.StrictMode>
  );
}
  
export default App;