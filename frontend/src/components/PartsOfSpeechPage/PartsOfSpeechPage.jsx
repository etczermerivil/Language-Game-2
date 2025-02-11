import { useState, useEffect } from "react";
import AddEditColorModal from "./AddEditColorModal";
import styles from "./PartsOfSpeechPage.module.css";
import NewParticlesBackground from "../ParticlesBackgroundTwo/ParticlesBackgroundTwo";

const PartsOfSpeechPage = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null); // Tracks the part being edited or null for adding

  // Define gradients for parts of speech
const partOfSpeechColors = {
  Noun: "linear-gradient(225deg, #0066FF, #1F78FF)",
  Verb: "linear-gradient(225deg, #FF0000, #FF5000)",
  Adjective: "linear-gradient(225deg, #5F00B8, #931FFF)",
  Article: "linear-gradient(225deg, #FFD500, #FFE208)",
  default: "linear-gradient(225deg, #ccc, #f2f2f2)",
};



  // useEffect(() => {
  //   fetch("/api/colors/")
  //     .then((res) => res.json())
  //     .then((data) => setPartsOfSpeech(data))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    fetch("/api/colors/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched partsOfSpeech:", data); // Debugging log
        setPartsOfSpeech(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const openModal = (part) => {
    setSelectedPart(part);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPart(null);
    setIsModalOpen(false);
  };

  // const handleSubmit = (updatedPart) => {
  //   if (selectedPart) {
  //     // Editing an existing part
  //     setPartsOfSpeech((prevParts) =>
  //       prevParts.map((part) =>
  //         part.id === updatedPart.id ? updatedPart : part
  //       )
  //     );
  //   } else {
  //     // Adding a new part
  //     setPartsOfSpeech((prevParts) => [...prevParts, updatedPart]);
  //   }
  //   closeModal();
  // };

  const handleSubmit = (updatedPart) => {
    if (selectedPart) {
      // Editing an existing part
      setPartsOfSpeech((prevParts) =>
        prevParts.map((part) =>
          part.id === updatedPart.id ? updatedPart : part
        )
      );
    } else {
      // Adding a new part
      setPartsOfSpeech((prevParts) => [...prevParts, updatedPart]);
    }
    closeModal();
  };


  const handleDelete = (colorId) => {
    fetch(`/api/colors/${colorId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete color");
        }
        return res.json();
      })
      .then(() => {
        // Remove the deleted color from the state
        setPartsOfSpeech((prevParts) =>
          prevParts.filter((part) => part.id !== colorId)
        );
        closeModal(); // Close the modal after deletion
      })
      .catch((err) => {
        console.error("Failed to delete color:", err);
      });
  };


  return (
    <div className={styles.container}>
      <div className={styles.particlesBackground}>
        <NewParticlesBackground />
      </div>

      <div className={styles.titleBox}>
        <h1 className={styles.title}>Parts Of Speech</h1>
      </div>

      <div className={styles.partsBox}>
        <div className={styles.partsGrid}>
          {partsOfSpeech.map((part) => (
            <div
              key={part.id}
              className={styles.partContainer}
              onClick={() => openModal(part)}
            >
              <div
                className={`${styles.partBox} ${styles[part.name.toLowerCase()] || ""}`}
                style={{
                  // background: partOfSpeechColors[part.name] || partOfSpeechColors.default,

                    background: part.color_code || partOfSpeechColors.default,


                }}
              >
                {part.name}
              </div>
            </div>
          ))}

          <div className={styles.partContainer}>
            <button
              className={styles.addCircleButton}
              onClick={() => openModal(null)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddEditColorModal
          part={selectedPart}
          onSubmit={handleSubmit}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default PartsOfSpeechPage;
