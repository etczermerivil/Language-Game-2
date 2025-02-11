import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParallaxParticles({ color }) {
    // console.log("Received Color Prop:", color);

    const [particleOptions, setParticleOptions] = useState({
        autoPlay: true,
        background: {
          color: { value: "#111111" },
          opacity: 0.1,
        },
        fullScreen: { enable: false, zIndex: -1 },
        detectRetina: true,

        particles: {
          number: {
            value: 250, // Increase particle count
            density: { enable: true, value_area: 800 },
          },
          color: { value: ["#FFFFFF"] },
          shape: { type: "circle" }, // Keep one definition of "shape"
          opacity: {
            value: 0.5, // Set default opacity for circles
            random: true, // Allow random opacity values
            animation: {
              enable: true, // Enable opacity animation
              speed: 2, // Speed of opacity animation
              minimumValue: 0.1, // Minimum opacity value during animation
              sync: false, // Animate independently for each circle
            },
          },
          size: {
            value: 7,
            random: true,
          },
          move: {
            enable: true, // Enable particle movement
            speed: 2, // Adjust speed
            direction: "top", // Move particles upward
            random: false,
            straight: false,
            outModes: { default: "out" }, // Particles exit and reappear on the opposite side
          },
          links: {
            enable: true, // Enable links between particles
            distance: 150, // Maximum link distance
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
      });


  useEffect(() => {
    console.log("Updating particle colors to:", color); // Debugging log

    setParticleOptions((prevOptions) => ({
      ...prevOptions,
      particles: {
        ...prevOptions.particles,
        color: { value: color }, // Update particle color dynamically
      },
    }));
  }, [color]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
<Particles
  key={color.join(',')} // Unique key forces re-render
  id="tsparticles"
  init={particlesInit}
  options={{
    ...particleOptions,
    particles: {
      ...particleOptions.particles,
      color: { value: color || ["#FFFFFF"] }, // Use dynamic color or fallback
    },
  }}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    pointerEvents: "none",
  }}
/>

  );
}

export default ParallaxParticles;
