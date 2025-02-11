


// CardsPage.jsx
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import DeleteCardModal from "../DeleteCardModal/DeleteCardModal";


import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";

import CreateCardModal from "../CreateCardModal/CreateCardModal";
import EditCardModal from "../EditCardModal/EditCardModal"; // Ensure the correct path

import styles from './styles.module.css';


const partOfSpeechColors = {
  Noun: 'linear-gradient(225deg, #0066FF, #1F78FF)',
  Verb: 'linear-gradient(225deg, #FF0000, #FF5000)',
  Adjective: 'linear-gradient(225deg, #5F00B8, #931FFF)',
  Article: 'linear-gradient(225deg, #FFD500, #FFE208)',
  default: 'linear-gradient(225deg, #ccc, #f2f2f2)',
};

const partOfSpeechParticleColors = {
  Noun: ['#0066FF', '#1F78FF'],        // Two shades of blue
  Verb: ['#FF0000', '#FF5000'],        // Two shades of red
  Adjective: ['#5F00B8', '#931FFF'],   // Two shades of purple
  Article: ['#FFD500', '#FFE208'],     // Two shades of yellow
  default: ['#CCCCCC', '#F2F2F2'],     // Neutral colors
};

// const partOfSpeechMap = {
//   1: 'Noun',
//   2: 'Verb',
//   3: 'Adjective',
//   4: 'Article',
// };

function CardsPage() {
  // State to store fetched cards
  const [cards, setCards] = useState([]);

  const [activeColor, setActiveColor] = useState(partOfSpeechParticleColors.default);
  const { setModalContent, setModalVisible } = useModal();
  const swiperRef = useRef(null);

// Edit Card
const updateCard = (updatedCard) => {
  console.log("Updated card:", updatedCard); // Log the updated card
  setCards((prevCards) =>
    prevCards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    )
  );
};

const handleEditCardClick = () => {
  const swiper = swiperRef.current; // Access Swiper instance
  const activeIndex = swiper?.realIndex; // Get the current active slide index
  const activeCard = cards[activeIndex]; // Retrieve the active card

  if (activeCard) {
    setModalContent(
      <EditCardModal card={activeCard} updateCard={updateCard} /> // Pass updateCard
    );
    setModalVisible(true); // Open the modal
  }
};



//Delete

const removeCard = (deletedCardId) => {
  setCards((prevCards) => prevCards.filter((card) => card.id !== deletedCardId));
};

const handleDeleteCardClick = () => {
  const swiper = swiperRef.current; // Access Swiper instance
  const activeIndex = swiper?.realIndex; // Get the current active slide index
  const activeCard = cards[activeIndex]; // Retrieve the active card

  if (activeCard) {
    setModalContent(
      <DeleteCardModal
        cardId={activeCard.id}
        cardName={activeCard.word_text}
        removeCard={removeCard} // Pass removeCard to the modal
      />
    );
  } else {
    console.error("No active card selected for deletion.");
  }
};





  // Fetch cards from the backend
  // useEffect(() => {
  //   fetch('/api/cards') // Replace with your actual API endpoint
  //     .then((response) => response.json())
  //     .then((data) => setCards(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  // useEffect(() => {
  //   fetch('/api/cards')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Fetched cards:', data); // Log the cards
  //       setCards(data);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);


  useEffect(() => {
    fetch('/api/cards') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setTimeout(() => {
          const swiper = swiperRef.current;
          if (swiper) {
            swiper.update(); // Force Swiper to refresh and apply coverflow effect
          }
        }, 100); // Ensure Swiper updates after data is set
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);




  //Create
  // const handleCreateCardClick = () => {
  //   setModalContent(<CreateCardModal />);
  //   setModalVisible(true);
  // };

  const handleCreateCardClick = () => {
    setModalContent(
      <CreateCardModal
        onCardCreated={async () => {
          const response = await fetch('/api/cards'); // Fetch all cards
          const cardsData = await response.json();

          console.log('Updated cards after refetch:', cardsData);

          setCards(cardsData); // Update the parent state with all cards

          setTimeout(() => {
            const swiper = swiperRef.current;
            if (swiper) {
              // Center the newly created card
              swiper.slideTo(cardsData.length - Math.floor(swiper.params.slidesPerView / 2));
            }
          }, 100); // Adding a slight delay ensures Swiper has updated

        }}
      />
    );

    // Ensure the modal is visible
    setModalVisible(true);
  };





  //Slide change
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex;
    const activeCard = cards[activeIndex];
    if (activeCard) {
      // Retrieve gradient for cards
      const color =
        partOfSpeechColors[activeCard.part_of_speech] || partOfSpeechColors.default;

      // Retrieve particle colors for particles
      const particleColors =
        partOfSpeechParticleColors[activeCard.part_of_speech] ||
        partOfSpeechParticleColors.default;

      // Update the active color state for particles
      setActiveColor(particleColors);

      // Optionally, log both for debugging
      console.log("Card Gradient (Color):", color);
      console.log("Particle Colors:", particleColors);
    }
  };



  return (
    // Use position: relative so #particles-js can sit behind it (z-index layering)
    <div
      className={styles.pageContainer}
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {/* The fiery particles behind everything */}
      <ParticlesBackground color={activeColor} />

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {/* Swiper Section */}
        <div className={styles.swiperBox}>

        <Swiper
            ref={swiperRef} // Attach the ref
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 90,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            style={{
              height: "100%",
              width: "100%",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper; // Set Swiper instance to the ref
              console.log("Swiper initialized:", swiper); // Optional debugging log
            }}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >



            {cards.map((card) => (
              <SwiperSlide key={card.id} className={styles.cardWrapper}>
                <div
                  className={styles.flipCard}
                  data-color={card.part_of_speech.toLowerCase()}
                >
                  {/* Front of the Card */}
                  <div
                    className={`${styles.cardSide} ${styles.front}`}
                    style={{
                      backgroundImage:
                        partOfSpeechColors[card.part_of_speech] ||
                        partOfSpeechColors.default,
                    }}
                  >
                    <p className={styles.partOfSpeechTop}>
                      {card.part_of_speech}
                    </p>
                    <p className={styles.cardTitle}>{card.word_text}</p>
                    <p className={styles.partOfSpeechBottom}>
                      {card.part_of_speech}
                    </p>
                  </div>

                  {/* Back of the Card */}
                  <div
                    className={`${styles.cardSide} ${styles.back}`}
                    style={{
                      backgroundImage:
                        partOfSpeechColors[card.part_of_speech] ||
                        partOfSpeechColors.default,
                    }}
                  >
                    <div className={styles.cardContent}>
                      {card.pronunciation && (
                        <div className={styles.cardSection}>
                          <p className={styles.key}>Pronunciation:</p>
                          <p className={styles.value}>{card.pronunciation}</p>
                        </div>
                      )}
                      <div className={styles.cardSection}>
                        <p className={styles.key}>Definition:</p>
                        <p className={styles.value}>{card.definition}</p>
                      </div>
                      {card.example_sentence && (
                        <div className={styles.cardSection}>
                          <p className={styles.key}>Example:</p>
                          <p className={styles.value}>{card.example_sentence}</p>
                        </div>
                      )}
                      {card.example_translation && (
                        <div className={styles.cardSection}>
                          <p className={styles.key}>Translation:</p>
                          <p className={styles.value}>{card.example_translation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Menu for Buttons */}
        <div className={styles.buttonBox}>
          <button
            className={styles.circleButton}
            onClick={handleCreateCardClick}
          >
            +
          </button>

          <button
            className={`${styles.circleButton} ${styles.editButton}`}
            onClick={handleEditCardClick}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>

          <button
          className={`${styles.circleButton} ${styles.deleteButton}`}
          onClick={handleDeleteCardClick}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>


        </div>
      </div>
    </div>
  );

}

export default CardsPage;
