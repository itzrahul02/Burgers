import React, { useEffect, useState } from "react";
import NavBar from "../Nav";
import image1 from "../assets/pexels-xhemphoto-15146310.jpg";
import image2 from "../assets/burger2.jpg";
import image3 from "../assets/burger3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useTypewriter, Cursor } from "react-simple-typewriter";
import cards from "../data/CardData";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const [text] = useTypewriter({
    words: ["Most Popular", "Burgers", "You Have ever Eaten!"],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 120,
    delaySpeed: 1000,
  });
  const images = [image1, image2, image3];
  const [move, setMove] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src; // Preload the image by setting the src
    });
  }, [images]);

  const moveLeft = () => {
    setMove((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const moveRight = () => {
    setMove((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <NavBar />
      <div className="mt-[3rem] sm:mt-[4.2rem]">
        {/* Slider Section */}
        <div className="relative mt-2 w-full flex items-center justify-between">
          {/* Left Arrow */}
          <div
            className="absolute hover:bg-white/25 pl-4 w-10 sm:w-[10rem] h-full flex items-center text-white cursor-pointer z-10"
            onClick={moveLeft}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
          </div>

          {/* Image Content */}
          <div className="relative w-full">
            <div className="relative mx-auto overflow-hidden h-[60vh] md:h-[80vh] w-full">
              <div
                className="template w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${images[move]})`,
                }}
              >
                <div
                  className="bg-black/50 w-[80%] md:w-[50%] h-full absolute right-0 text-white flex flex-col justify-center items-center p-4 md:p-8"
                  style={{ clipPath: "ellipse(100% 100% at 100% 0%)" }}
                >
                  <h1>
                    <span className="text-2xl md:text-4xl font-bold mb-4">
                      {text}
                    </span>
                    <span className="text-white text-3xl md:text-5xl">
                      <Cursor />
                    </span>
                  </h1>
                  <h2 className="text-lg md:text-2xl font-semibold mb-6">
                    Are You Hungry?
                  </h2>
                  <Link to="/order">
                    <div className="border-4 rounded-full text-center text-[0.8rem] sm:text-[1rem] md:w-32 p-2 cursor-pointer hover:bg-white hover:text-black transition">
                      <p>Order Now</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <div
            className="absolute w-12 sm:w-[10rem] hover:bg-white/25 pr-2 text-white right-0 h-full flex items-center cursor-pointer z-10"
            onClick={moveRight}
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-2xl absolute sm:right-10 right-4 " />
          </div>
        </div>

        {/* Home Content */}
        <div className="bg-yellow-400">
          {/* Bar */}
          <div className="bar bg-orange-950 w-[90%] mx-auto h-1"></div>

          {/* Items Section */}
          <div className="signature w-[90%] mx-auto">
            <p
              className="text-center font-bold text-2xl md:text-4xl pt-8"
              style={{ fontFamily: "flame", color: "rgb(80, 35, 20)" }}
            >
              Desi Burgers and Meals
            </p>
            <div className="section mt-6 pb-4 sm:pb-8">
              <div className="card flex flex-wrap items-center gap-2 sm:gap-4 justify-center">
                {cards.map((card, index) => (
                  <Link to="/order" key={index} className="sm:size-[15rem] hover:cursor-pointer hover:rounded-xl hover:bg-yellow-600/50 height-[10rem]">
                    <div className=" mb-4 sm:mb-8 flex flex-col justify-between">
                      <img
                        src={card.image}
                        alt={card.Name}
                        className="object-cover h-40 w-full rounded-t-xl"
                      />
                      <h3
                        className="text-lg sm:p-4 md:text-xl text-center text-orange-950/90 font-semibold mb-auto"
                        style={{ fontFamily: "Flame" }}
                      >
                        {card.Name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
