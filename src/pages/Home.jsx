"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/Data-img/Home/1.png";
import img2 from "../assets/Data-img/Home/2.png";
import img3 from "../assets/Data-img/Home/3.png";

const images = [img1, img2, img3];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-center">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-2">Bienvenido a Brownny Store</h1>
      <p className="text-lg mb-6">
        ¡Personaliza tus prendas y mantén tu estilo único!
      </p>

      {/* Slider */}
      <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg aspect-video mb-8">
        {images.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt={`slide-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Botón hacia Personalizar */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
        whileTap={{ scale: 0.95 }}
        className="mt-100 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-lg font-semibold shadow-xl flex items-center justify-center gap-2"
        onClick={() => navigate("/personalizar")}
      >
        <Sparkles className="w-6 h-6" />
        Personaliza tu prenda
      </motion.button>
    </div>
  );
}
