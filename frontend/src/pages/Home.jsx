import React from "react";
import chessImage from "./image.png";
import "./Home.css";

function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="home-page-container">
      {/* PARTICLES */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="particles-bg"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: {
              value: 70,
              density: { enable: true, area: 800 },
            },
            color: { value: "#00f0ff" },
            links: {
              enable: true,
              color: "#00f0ff",
              distance: 150,
              opacity: 0.15,
            },
            move: {
              enable: true,
              speed: 0.6,
            },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* CONTENT */}
      <div className="page-content">
        <h1>Welcome to Chesscrash</h1>
        <p>Your journey to mastering chess starts here!</p>
        <div className="image-container">
          <img src={chessImage} alt="Chess players" />
        </div>
      </div>
    </div>
  );
}

export default Home;
