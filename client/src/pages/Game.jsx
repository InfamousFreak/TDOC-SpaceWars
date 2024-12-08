import React, { useState, useEffect, useRef } from "react";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [kills, setKills] = useState(0);
  const [lasers, setLasers] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [spaceshipX, setSpaceshipX] = useState(window.innerWidth / 2); // Spaceship X position
  const spaceshipRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
    setLives(3);
    setKills(0);
    setLasers([]);
    setEnemies([]);
  };

  const handleMouseMove = (e) => {
    if (!gameStarted || !spaceshipRef.current) return;
    const spaceshipWidth = spaceshipRef.current.offsetWidth;
    let x = e.pageX - spaceshipWidth / 2;

    // Constrain spaceship within bounds
    x = Math.max(0, Math.min(x, window.innerWidth - spaceshipWidth));
    setSpaceshipX(x);
  };

  const handleMouseClick = () => {
    if (!gameStarted || !spaceshipRef.current) return;
    const spaceshipWidth = spaceshipRef.current.offsetWidth;
    const x = spaceshipX + spaceshipWidth / 2 - 4; // Center of the spaceship
    const y = window.innerHeight - 100; // Just above the bottom
    setLasers((prev) => [...prev, { x, y }]);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      const x = Math.random() * (window.innerWidth - 50); // Spawn within screen
      setEnemies((prev) => [...prev, { x, y: -50 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      // Move lasers up
      setLasers((prev) =>
        prev
          .map((laser) => ({ ...laser, y: laser.y - 10 }))
          .filter((laser) => laser.y > 0)
      );

      // Move enemies down
      setEnemies((prev) =>
        prev
          .map((enemy) => ({ ...enemy, y: enemy.y + 5 }))
          .filter((enemy) => enemy.y < window.innerHeight)
      );

      // Collision detection
      setEnemies((enemies) =>
        enemies.filter((enemy) => {
          const isHit = lasers.some(
            (laser) =>
              laser.x > enemy.x &&
              laser.x < enemy.x + 50 &&
              laser.y > enemy.y &&
              laser.y < enemy.y + 50
          );
          if (isHit) {
            setKills((prev) => prev + 1);
            return false;
          }
          return true;
        })
      );

      // Detect if enemies hit the bottom
      setEnemies((prev) => {
        const remaining = prev.filter((enemy) => {
          if (enemy.y >= window.innerHeight - 50) {
            setLives((lives) => lives - 1);
            return false;
          }
          return true;
        });
        return remaining;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, lasers]);

  useEffect(() => {
    if (lives <= 0) {
      setGameStarted(false);
    }
  }, [lives]);

  const Spaceship = () => (
    <div
      id="spaceship"
      ref={spaceshipRef}
      className="absolute bottom-12 w-10 h-12 bg-red-500 border-r-4 border-red-700"
      style={{ left: spaceshipX }}
    >
      {/* Top Fin */}
      <div className="absolute top-[-20px] left-0 w-0 h-0 border-b-[25px] border-b-red-700 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent"></div>
      <div className="absolute top-[-18px] left-0 w-0 h-0 border-b-[20px] border-b-red-500 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent"></div>

      {/* Wings */}
      <div className="absolute bottom-[10px] left-[-10px] w-2.5 h-5 bg-red-500"></div>
      <div className="absolute bottom-[10px] right-[-10px] w-2.5 h-5 bg-red-700"></div>

      {/* Flames */}
      <div className="absolute bottom-0 left-2.5 w-0 h-0 border-t-[25px] border-t-orange-500 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent animate-flame"></div>
      <div className="absolute bottom-0 left-[20px] w-0 h-0 border-t-[25px] border-t-orange-500 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent animate-flame"></div>
    </div>
  );

  return (
    <div
      id="space"
      className={`relative w-full h-screen bg-gray-900 overflow-hidden ${
        gameStarted ? "cursor-none" : ""
      }`}
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
    >
      {!gameStarted && (
        <div
          id="start"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white bg-red-600 px-10 py-5 cursor-pointer hover:bg-red-700"
          onClick={startGame}
        >
          Start Game
        </div>
      )}

      {gameStarted && (
        <>
          <h1 id="killCount" className="absolute top-2 left-2 text-green-500 text-4xl">
            Kills: {kills}
          </h1>
          <h1 id="livesCount" className="absolute top-2 right-2 text-red-500 text-4xl">
            Lives: {lives}
          </h1>

          <Spaceship />

          {lasers.map((laser, index) => (
            <div
              key={index}
              className="absolute w-2 h-4 bg-green-400"
              style={{ left: laser.x, top: laser.y }}
            ></div>
          ))}

          {enemies.map((enemy, index) => (
            <div
              key={index}
              className="absolute w-12 h-12 bg-yellow-500"
              style={{ left: enemy.x, top: enemy.y }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
