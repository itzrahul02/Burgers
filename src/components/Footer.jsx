import React from "react";

function Footer() {
  return (
    <>
      <div className="bg-orange-950/90 text-white pt-8">
        <div className="flex flex-col lg:flex-row justify-evenly items-center w-full space-y-8 lg:space-y-0 lg:space-x-16 px-4 lg:px-0">
          {/* Left Section: Links */}
          <ul className="sm:space-y-4 space-y-2 text-center lg:text-left">
            <li className="text-xl font-semibold">BK Info</li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Expansion
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Media
              </a>
            </li>
          </ul>

          {/* Division */}
          <div className="hidden lg:block bg-white h-44 w-px"></div>

          {/* Middle Section: Contact & Social Media */}
          <div className="flex flex-col items-center space-y-4">
            {/* Contact Info */}
            <div className="space-y-1 text-center lg:text-left">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@burgerking.com</p>
              <p>Address: 123 Burger Street, Food City</p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="#" className="hover:text-yellow-400">
                Instagram
              </a>
              <a href="#" className="hover:text-yellow-400">
                Facebook
              </a>
              <a href="#" className="hover:text-yellow-400">
                Twitter
              </a>
            </div>
          </div>

          {/* Division */}
          <div className="hidden lg:block bg-white h-44 w-px"></div>

          {/* Right Section: Newsletter Subscription */}
          <div className="flex flex-col space-y-2 items-center lg:items-start">
            <h3 className="text-lg font-semibold text-center lg:text-left">
              Subscribe to our Newsletter
            </h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded text-black w-64"
            />
            <button className="bg-yellow-600 w-64 hover:bg-yellow-700 p-2 rounded text-white">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Section: Footer Disclaimer and Payment Methods */}
        <div className="bg-white w-full h-px mt-8"></div>
        <div className="mt-8 text-center text-sm pb-4">
          <p>© 2024 Burger King. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <img src="/path/to/visa.png" alt="Visa" className="h-6" />
            <img src="/path/to/mastercard.png" alt="MasterCard" className="h-6" />
            <img src="/path/to/paypal.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
