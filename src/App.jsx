import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import { Cart } from './components/ViewCart';
import { CartProvider } from './components/Context';
import { Login } from './components/login';
import { Registration } from './components/register';
import Profile from './components/Profile';

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