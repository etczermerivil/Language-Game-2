import { useCallback, useState, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const NewParticlesBackground = () => {
  const [particleColor, setParticleColor] = useState("#3498db"); // Initial color (blue)
  const [particleDirection, setParticleDirection] = useState("top"); // Initial direction

  // Array of colors to cycle through
  const colorCycle = useMemo(
    () => ["#0066FF", "#FF0000", "#5F00B8", "#FFD500"],
    []
  );

  // Array of directions to cycle through
  const directionCycle = useMemo(
    () => ["top-right", "top-left", "bottom-right", "bottom-left"],
    []
  );

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // Ensures tsparticles engine is loaded
  }, []);

  const particlesLoaded = useCallback((container) => {
    let colorIndex = 0;
    let directionIndex = 0;

    const interval = setInterval(() => {
      // Cycle through colors
      colorIndex = (colorIndex + 1) % colorCycle.length;
      const newColor = colorCycle[colorIndex];
      setParticleColor(newColor);

      // Cycle through directions
      directionIndex = (directionIndex + 1) % directionCycle.length;
      const newDirection = directionCycle[directionIndex];
      setParticleDirection(newDirection);

      // Dynamically update particle options
      container.options.particles.color.value = newColor;
      container.options.particles.move.direction = newDirection;
      container.refresh(); // Apply the new settings immediately
    }, 10000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [colorCycle, directionCycle]);

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: -1 }, // Particles cover the full background
    background: {
      color: { value: "#222" }, // Match desired background color
    },
    particles: {
      number: {
        value: 250, // Increase particle count
        density: { enable: true, value_area: 800 },
      },
      color: { value: particleColor }, // Dynamically set color
      shape: { type: "circle" },
      opacity: {
        value: 0.5, // Set default opacity for circles
        random: true,
        animation: {
          enable: true, // Enable opacity animation
          speed: 2, // Speed of opacity animation
          minimumValue: 0.1, // Minimum opacity value during animation
          sync: false,
        },
      },
      size: {
        value: 4,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: particleDirection, // Dynamically set direction
        random: false,
        straight: false,
        outModes: { default: "out" },
        trail: {
          enable: true,
          length: 2, // Length of the trail
          fillColor: "#000000", // Background color for the trail
        },
      },
      links: {
        enable: true, // Enable links between particles
        distance: 200, // Maximum link distance
        color: "#ffffff",
        opacity: 0.1,
      },
    },
    interactivity: {
      detectsOn: "window", // Ensure interaction across the entire window
      events: {
        onHover: {
          enable: true, // Enable hover interactions
          mode: "grab", // Use "grab" mode
        },
        onClick: {
          enable: true, // Enable click interactions
          mode: "push", // Add particles on click
        },
      },
      modes: {
        grab: {
          distance: 200, // Interaction distance
          links: {
            opacity: 0.5, // Opacity of the grab effect
          },
        },
        push: {
          quantity: 4, // Number of particles added on click
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded} // Loaded callback to set interval
      options={particlesOptions}
    />
  );
};

export default NewParticlesBackground;
