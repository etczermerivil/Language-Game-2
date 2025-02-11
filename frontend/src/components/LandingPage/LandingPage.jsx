
// import styles from './LandingPage.module.css';

// function LandingPage() {
//   return (


//     <div className={styles.landingContainer}>
//       <div className={styles.titleContainer}>
//         <h1 className={styles.landingTitle}>
//           <span className={styles.letter} data-index="1">W</span>
//           <span className={styles.letter} data-index="2">o</span>
//           <span className={styles.letter} data-index="3">r</span>
//           <span className={styles.letter} data-index="4">d</span>
//           &nbsp;
//           <span className={styles.letter} data-index="5">P</span>
//           <span className={styles.letter} data-index="6">a</span>
//           <span className={styles.letter} data-index="7">l</span>
//           <span className={styles.letter} data-index="8">l</span>
//           <span className={styles.letter} data-index="9">e</span>
//           <span className={styles.letter} data-index="10">t</span>
//           <span className={styles.letter} data-index="11">e</span>
//         </h1>
//         <p className={styles.landingText}>Color Your World with Language.</p>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

// import styles from './LandingPage.module.css';

// function LandingPage() {
//   return (
//     <div className={styles.landingContainer}>
//       {/* Matrix Effect Background */}
//       <div id="text-output" className={styles.matrixEffect}>
//         <div id="cp-bg"></div>
//       </div>

//       {/* Main Content */}
//       <div className={styles.titleContainer}>
//         <h1 className={styles.landingTitle}>
//           <span className={styles.letter} data-index="1">W</span>
//           <span className={styles.letter} data-index="2">o</span>
//           <span className={styles.letter} data-index="3">r</span>
//           <span className={styles.letter} data-index="4">d</span>
//           &nbsp;
//           <span className={styles.letter} data-index="5">P</span>
//           <span className={styles.letter} data-index="6">a</span>
//           <span className={styles.letter} data-index="7">l</span>
//           <span className={styles.letter} data-index="8">l</span>
//           <span className={styles.letter} data-index="9">e</span>
//           <span className={styles.letter} data-index="10">t</span>
//           <span className={styles.letter} data-index="11">e</span>
//         </h1>
//         <p className={styles.landingText}>Color Your World with Language.</p>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

import { useEffect } from "react";
import styles from "./LandingPage.module.css";

function LandingPage() {
  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    const chars = [
      "Hello", "World", "Language", "Hi",
      "Hola", "Mundo", "Idioma", "¡Hola!",
      "Bonjour", "Monde", "Langue", "Salut",
      "こんにちは", "世界", "言語", "やあ",
      "Hallo", "Welt", "Sprache", "Hi",
      "Ciao", "Mondo", "Lingua", "Ehi",
      "안녕하세요", "세계", "언어", "안녕",
    ];
    const colors = ["#0066FF", "#FF0000", "#5F00B8", "#FFD500", "#4AE056"];
    const minStringDelay = 100;
    const maxStringDelay = 300;
    const minStringLength = 4;
    const maxStringLength = 10;
    const minStringSpeed = 0.5;
    const maxStringSpeed = 1;

    const MAX_LINES = 100; // Maximum number of active lines
    let activeLines = 0;

    const matrixString = () => {
      if (!isMounted || activeLines >= MAX_LINES) return;

      activeLines++;
      const ranTime = Math.random() * (maxStringDelay - minStringDelay) + minStringDelay;
      const ranLen = Math.random() * (maxStringLength - minStringLength) + minStringLength;
      const leftPos = Math.random() * window.innerWidth;

      const div = document.createElement("div");
      div.className = styles.matrixString;
      div.style.left = `${leftPos}px`;
      div.style.top = "-50px";

      for (let i = 0; i < ranLen; i++) {
        const word = chars[Math.floor(Math.random() * chars.length)];
        const span = document.createElement("span");
        span.innerText = word;
        span.style.display = "block";
        span.style.marginBottom = "5px";
        div.appendChild(span);
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      div.style.color = color;
      div.style.textShadow = `0px 0px 15px ${color}, 0px 0px 10px ${color}, 0px 0px 5px ${color}`;

      const textOutput = document.getElementById("text-output");
      if (textOutput) textOutput.appendChild(div);

      const speed = Math.random() * (maxStringSpeed - minStringSpeed) + minStringSpeed;

      const animate = () => {
        if (!isMounted) {
          div.remove();
          return;
        }
        const top = parseFloat(div.style.top.replace("px", ""));
        if (top > window.innerHeight) {
          div.remove();
          activeLines--;
        } else {
          div.style.top = `${top + speed}px`;
          requestAnimationFrame(animate);
        }
      };

      animate();
      setTimeout(matrixString, ranTime);
    };

    matrixString();

    return () => {
      isMounted = false;
      const textOutput = document.getElementById("text-output");
      if (textOutput) textOutput.innerHTML = "";
      activeLines = 0;
    };
  }, []);

  return (
    <div className={styles.landingContainer}>
      <div id="text-output" className={styles.matrixEffect}></div>
      <div className={styles.titleContainer}>
        <h1 className={styles.landingTitle}>
          <span className={styles.word} data-index="1">Word</span>
          &nbsp;
          <span className={styles.word} data-index="2">Pallete</span>
        </h1>
        <p className={styles.landingText}>
          <span className={styles.highlightedWord}>Color</span> your world with language
          <span className={`${styles.highlightedPeriod}`}>.</span>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
