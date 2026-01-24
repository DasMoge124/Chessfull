// src/components/Particles.jsx
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="particles-bg"
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 200, density: { enable: true, area: 1200 } },
          color: { value: "#00bfff" },
          links: {
            enable: true,
            color: "#00bfff",
            distance: 120,
            opacity: 0.2,
          },
          move: { enable: true, speed: 1.2, outModes: "out" },
          opacity: { value: 0.5 },
          size: { value: { min: 2, max: 4 } },
          shape: { type: "circle" },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "attract" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            attract: { distance: 180, duration: 0.2, speed: 3.0 },
            push: { quantity: 5 },
          },
        },
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;
