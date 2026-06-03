import React, { useEffect, useState } from "react";
import NavBar from "../Nav";
import image1 from "../assets/pexels-xhemphoto-15146310.jpg";
import image2 from "../assets/burger2.jpg";
import image3 from "../assets/burger3.jpeg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import cards from "../data/CardData";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

function Home() {
  const [text] = useTypewriter({
    words: ["Crafted with Passion", "Loaded with Flavor", "Made for You"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 80,
    delaySpeed: 1500,
  });

  const images = [image1, image2, image3];
  const [move, setMove] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMove((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavBar />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[90vh] overflow-hidden">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === move ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <p className="text-orange-400 font-semibold text-lg mb-2 tracking-wider uppercase">
                  Premium Burgers
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                  <span>{text}</span>
                  <Cursor cursorColor="#f97316" />
                </h1>
                <p className="text-neutral-300 text-lg mb-8 max-w-md">
                  Experience the perfect blend of fresh ingredients, secret sauces, and flame-grilled perfection.
                </p>
                <div className="flex gap-4">
                  <Link to="/order" className="btn-primary">
                    Order Now
                  </Link>
                  <Link to="/about" className="btn-secondary">
                    Our Story
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMove(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === move ? "bg-orange-500 w-8" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Items */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title mb-4">Our Signatures</h2>
              <p className="text-neutral-400 text-lg max-w-md mx-auto">
                Handcrafted burgers that keep you coming back for more
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to="/order" className="group block">
                    <div className="glass-card overflow-hidden hover:border-orange-500/30 transition-all duration-300 group-hover:scale-105">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.Name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-orange-400 transition-colors">
                          {card.Name}
                        </h3>
                        <p className="text-orange-400 font-bold mt-1 text-sm">{card.Price}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Happy Customers" },
                { number: "100+", label: "Menu Items" },
                { number: "25+", label: "Locations" },
                { number: "4.8★", label: "Average Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-orange-400">{stat.number}</p>
                  <p className="text-neutral-400 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Home;
