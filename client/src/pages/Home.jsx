import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  // Refs for animation targets
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const decorationsRef = useRef([]);

  useEffect(() => {
    // Title and Subtitle Animations
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power4.out" }
    );

    // Form Animation
    gsap.fromTo(
      formRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
    );

    // Decorations Animation
    decorationsRef.current.forEach((decoration, i) => {
      gsap.fromTo(
        decoration,
        { opacity: 0, scale: 0 },
        {
          opacity: 0.2,
          scale: 1,
          duration: 1.5,
          delay: 1 + i * 0.3,
          ease: "elastic.out(1, 0.5)",
        }
      );
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col justify-center items-center text-white relative overflow-hidden">
      <h1
        ref={titleRef}
        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        SPACEWARS
      </h1>
      <p ref={subtitleRef} className="text-gray-400 mt-4 text-lg md:text-xl">
        The Ultimate Space Shooter Game
      </p>
      <div ref={formRef} className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-200 mb-4 text-center">
          Enter the Battle Zone
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-64 md:w-80 p-3 mb-4 text-black text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-64 md:w-80 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={(el) => (decorationsRef.current[0] = el)}
          className="absolute top-10 left-20 w-16 h-16 bg-blue-500 rounded-full blur-2xl"
        ></div>
        <div
          ref={(el) => (decorationsRef.current[1] = el)}
          className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full blur-3xl"
        ></div>
        <div
          ref={(el) => (decorationsRef.current[2] = el)}
          className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-500 rounded-full blur-3xl"
        ></div>
      </div>
    </div>
  );
};

export default Home;
