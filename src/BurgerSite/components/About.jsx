import React, { useState } from "react";
import NavBar from "../Nav";
import "./About.css";
import Owner from "../assets/Bhargavee.jpeg";
import Award from "../assets/trophy.png";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function About() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavBar/>
      <div className="mt-[2.8rem] sm:mt-[4rem] h-auto ">
        <div className="bg-white w-[98%] h-[2px] mx-auto"></div>
        <div className="bg-orange-950 text-[#F8F1E7] text-center p-4 py-[3rem] sm:text-[2.5rem] text-[1.8rem] font-bold" style={{ fontFamily: 'Flame, sans' }}>
          About Us
        </div>

        {/*Slogan*/}
        <div className="bg-[#facc15] p-[2rem]">
          <div className="w-[70%] mx-auto space-y-4">
            <p className="text-orange-950 sm:text-[1.5rem] text-[1rem] mt-[1rem] font-bold" style={{ fontFamily: 'Flame, sans' }}>Great Food Comes First</p>
            <p className="text-orange-950 sm:text-[1.2rem] text-[0.8rem] font-semibold">
              Burger King is known for serving high-quality, great-tasting, and affordable food. Founded in 1954, Burger King is the second-largest fast food hamburger chain in the world. The original Home of the Whopper, our commitment to premium ingredients, signature recipes, and family-friendly dining experiences is what has defined our brand for 70 successful years.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-statement bg-orange-950 text-center p-8 my-[2px]">
          <h2 className="text-[#F8F1E7] sm:text-[2rem] text-[1.5rem] font-bold" style={{ fontFamily: 'Flame, sans' }}>Our Mission</h2>
          <p className="text-[#F8F1E7] sm:text-[1.2rem] text-[0.8rem] mt-4">
            To offer affordable, high-quality meals while keeping our customers at the heart of everything we do.
          </p>
        </div>

        {/* Team Section */}
        <div className="team bg-[#fcc737] pt-10 parallax-section text-white">
        {/* Title Section */}
        <div className="text-center text-[1.5rem] sm:text-[2rem] font-bold" style={{ fontFamily: 'Flame, sans' }}>
            Meet Our Founder
        </div>

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-8 sm:space-y-0 w-[90%] sm:w-[80%] lg:w-[60%] mx-auto mt-8">
            {/* Text Section */}
            <div className="lg:w-[50%] space-y-4 text-[0.9rem] sm:text-[1.2rem]">
            <p className="text-[1.1rem] sm:text-[1.5rem] font-bold">
                We are here to serve you
            </p>
            <p>
                At Burger King, our goal is to provide the best experience for all our customers. Whether it's about the quality of the meals or the service we offer, we are committed to excellence.
            </p>
            <p>Enjoy the meals and have a great time with us!</p>
            <p className="font-bold text-[1.2rem] sm:text-[1.3rem] mt-4">
                Founder & CEO
            </p>
            </div>

            {/* Image Section */}
            <div className="flex-shrink-0">
            <img
                src={Owner}
                alt="Founder"
                className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] w-full object-cover rounded-lg shadow-[0_4px_10px] shadow-black"
                onClick={() => setOpen(true)}
            />
            </div>
        </div>
        </div>


        {/* Awards Section */}
        <div className="awards mt-1 p-4 sm:mt-4 parallax-section2 sm:flex items-center justify-center">
          <div className="w-[28%]">
            <img src={Award} alt="" className="sm:h-[200px] lg:h-[300px] h-[150px] " />
          </div>
          <div className="sm:w-[50%]">
            <h2 className="text-[#F8F1E7] sm:text-[2rem] text-[1.5rem] font-bold" style={{ fontFamily: 'Flame, sans' }}>Awards & Recognition</h2>
            <p className="text-[#F8F1E7] text-[0.8rem] sm:text-[1rem] mt-4">Voted Best Fast Food Chain 2023 by Foodies Magazine.</p>
            <p className="text-[#F8F1E7] text-[0.8rem] sm:text-[1rem] mt-4">
              This prestigious award, presented by <span className="font-bold">Foodies Magazine</span>, recognizes our dedication to consistently delivering high-quality food, excellent customer service, and an innovative dining experience. Judged by industry experts and food enthusiasts alike, this accolade reflects our commitment to redefining fast food with fresh ingredients, bold flavors, and a customer-first approach. Being voted the Best Fast Food Chain of 2023 highlights not only the hard work of our entire team but also the loyalty and satisfaction of our customers who have made us their go-to choice for delicious, affordable meals.
            </p>
          </div>
        </div>

        {/* History/Timeline Section */}
        <div className="history py-8 bg-[#fcc737]">
          <h2 className="text-orange-950 text-center sm:text-[2rem] font-bold" style={{ fontFamily: 'Flame, sans' }}>Our Journey</h2>
          <ul className="timeline mt-6 space-y-4 w-[70%] mx-auto text-orange-950 text-[0.8rem] sm:text-[1.2rem] font-semibold">
            <li className="text-orange-950">1954: Burger King was founded.</li>
            <li className="text-orange-950">1967: The first international restaurant opened.</li>
            <li className="text-orange-950">1974: The famous 'Have it Your Way' slogan was introduced.</li>
            {/* Add more milestones as needed */}
          </ul>
        </div>
      </div>
     

      {/* Image Modal */}
      {open && (
  <div className="z-10 bg-black fixed inset-0 backdrop-blur-xl flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg relative max-w-[90vw] max-h-[75vh] overflow-auto">
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() => setOpen(false)}
        className="fixed  bg-black p-1 text-white cursor-pointer"
        style={{ fontSize: '24px' }}
      />
      <div className="flex justify-center items-center mb-4">
        <img
          src={Owner}
          alt="Founder"
          className="w-[500px] bg-black/10 max-h-[60vh] object-contain rounded-lg shadow-lg"
        />
      </div>
      <div className="text-black text-center">
        <p className="font-bold text-lg">Bhargavee</p>
        <p className="italic text-md">The Founder and CEO of The Company</p>
        <p className="mt-4">
          Bhargavee is a visionary leader and the driving force behind the success of our company. With a passion for innovation and excellence, she has transformed the company into a global leader in the fast-food industry. Under her leadership, Burger King has continued to grow, delivering exceptional quality and customer satisfaction. Her commitment to delivering great food and building a strong, customer-first culture has made her a respected figure in the business world.
        </p>
        <p className="mt-4">
          As the Founder and CEO, Bhargavee's leadership continues to inspire and guide the company toward new heights, ensuring that we remain at the forefront of the industry while maintaining our core values of quality, affordability, and customer service.
        </p>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default About;
