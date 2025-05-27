import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach((bubble) => {
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubble.style.animationDuration = `${5 + Math.random() * 5}s`;
    });
  }, []);

  const hoverSound = new Audio(
    "https://cdn.pixabay.com/audio/2022/03/15/audio_6b1fbfb151.mp3"
  ); // Example futuristic sound

  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607082349560-8d3c90205f1c?auto=format&fit=crop&w=1920&q=80')", // Replace with a futuristic neon laptop image URL
      }}
    >
      {/* Floating Bubbles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="bubble absolute w-8 h-8 bg-white bg-opacity-10 rounded-full animate-rise"
        ></div>
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center"
      >
        <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6">
          <FiAlertTriangle className="h-12 w-12 text-red-400" />
        </div>
        <h1 className="glitch text-5xl font-extrabold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-300 mb-6 max-w-md mx-auto text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          onMouseEnter={() => hoverSound.play()}
          className="interactive-element inline-flex items-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-cyan-500/50"
        >
          Go back home
        </Link>
      </motion.div>

      <style>
        {`
          .glitch {
            color: white;
            position: relative;
            text-shadow: 2px 0 red, -2px 0 blue;
            animation: glitch 1s infinite;
          }

          @keyframes glitch {
            0% { text-shadow: 2px 0 red; }
            20% { text-shadow: -2px 0 blue; }
            40% { text-shadow: 2px 0 green; }
            60% { text-shadow: -2px 0 yellow; }
            80% { text-shadow: 2px 0 purple; }
            100% { text-shadow: -2px 0 cyan; }
          }

          .bubble {
            bottom: -100px;
          }

          @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0.4; }
            100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
          }

          .animate-rise {
            animation-name: rise;
            animation-timing-function: ease-in;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
