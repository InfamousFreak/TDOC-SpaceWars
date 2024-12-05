import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Profile = ({ userName, ownedNFTs }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const nftSectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power4.out" }
    );

    gsap.fromTo(
      nftSectionRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.7, ease: "power4.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col items-center text-white">
      <div className="text-center mt-10">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          userName's Profile
        </h1>
        <p
          ref={subtitleRef}
          className="text-gray-400 mt-2 text-lg md:text-xl"
        >
          Your collection of exclusive NFTs
        </p>
      </div>
      <div
        ref={nftSectionRef}
        className="mt-10 w-11/12 md:w-3/4 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">
          Owned NFTs
        </h2>
        {ownedNFTs?.skins?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-300 mb-4">
              Rocket Skins
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ownedNFTs.skins.map((skin, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg bg-gradient-to-r ${skin.color} shadow-md`}
                >
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h4 className="text-lg font-bold">{skin.name}</h4>
                  <p className="mt-2 text-gray-100">{skin.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {ownedNFTs?.backgrounds?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">
              Space Backgrounds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ownedNFTs.backgrounds.map((background, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg bg-gradient-to-r ${background.color} shadow-md`}
                >
                  <img
                    src={background.image}
                    alt={background.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h4 className="text-lg font-bold">{background.name}</h4>
                  <p className="mt-2 text-gray-100">{background.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-20 w-16 h-16 bg-blue-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Profile;
