import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";
import "./CreateCardModal.css";

function CreateCardModal({ onCardCreated }) {
  console.log('onCardCreated:', onCardCreated);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // State for form fields
  const [wordText, setWordText] = useState(""); // Word text
  const [pronunciation, setPronunciation] = useState(""); // Pronunciation
  const [language, setLanguage] = useState(""); // Language
  const [partOfSpeech, setPartOfSpeech] = useState(""); // Part of speech
  const [definition, setDefinition] = useState(""); // Definition
  const [exampleSentence, setExampleSentence] = useState(""); // Example sentence
  const [exampleTranslation, setExampleTranslation] = useState(""); // Example translation

  // State for validation errors
  const [errors, setErrors] = useState({});

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const cardData = {
  //     word_text: wordText,
  //     ipa,
  //     language,
  //     part_of_speech: partOfSpeech,
  //     lemma,
  //     definition,
  //   };

  //   const errors = await dispatch(thunkCreateCard(cardData));
  //   if (errors) {
  //     setErrors(errors); // Display validation errors
  //   } else {
  //     closeModal(); // Close the modal on success
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = {
      word_text: wordText.trim(), // Ensure no extra spaces
      pronunciation: pronunciation.trim(), // Use pronunciation instead of ipa
      language: language.trim(), // Trim language input
      part_of_speech: partOfSpeech.trim(), // Trim part of speech input
      definition: definition.trim(), // Trim definition input
      example_sentence: exampleSentence.trim(), // Trim example sentence input
      example_translation: exampleTranslation.trim(), // Trim example translation input
    };

    console.log("Part of Speech being sent:", partOfSpeech);

    const response = await dispatch(thunkCreateCard(cardData)); // Dispatch the thunk

    if (response.errors) {
      setErrors(response.errors); // Display validation errors
    } else {
      if (onCardCreated) {
        onCardCreated(); // Notify parent to refetch cards
      }
      closeModal(); // Close the modal on success
    }
  };


  return (
<form onSubmit={handleSubmit} className="create-card-modal">
  <h1>Create a New Card</h1>

  {/* Word Text (Required) */}
  <div className="input-group">
    <input
      type="text"
      className="input-field"
      placeholder="Word"
      value={wordText}
      onChange={(e) => setWordText(e.target.value)}
      required
    />
    {errors.word_text && <p className="error-text">{errors.word_text}</p>}
  </div>

  {/* Pronunciation (Optional) */}
  <div className="input-group">
    <input
      type="text"
      className="input-field"
      placeholder="Pronunciation"
      value={pronunciation}
      onChange={(e) => setPronunciation(e.target.value)}
    />
  </div>

  {/* Language (Required) */}
  <div className="input-group">
    <input
      type="text"
      className="input-field"
      placeholder="Language"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      required
    />
    {errors.language && <p className="error-text">{errors.language}</p>}
  </div>

  {/* Part of Speech (Required) */}
  <div className="input-group">
    <input
      type="text"
      className="input-field"
      placeholder="Part of Speech"
      value={partOfSpeech}
      onChange={(e) => setPartOfSpeech(e.target.value)}
      required
    />
    {errors.part_of_speech && <p className="error-text">{errors.part_of_speech}</p>}
  </div>

  {/* Definition (Required) */}
  <div className="input-group">
    <input
      type="text"
      className="input-field"
      placeholder="Definition"
      value={definition}
      onChange={(e) => setDefinition(e.target.value)}
      required
    />
    {errors.definition && <p className="error-text">{errors.definition}</p>}
  </div>

  {/* Example Sentence (Optional) */}
  <div className="input-group">
    <textarea
      className="input-field"
      placeholder="Example Sentence"
      value={exampleSentence}
      onChange={(e) => setExampleSentence(e.target.value)}
    />
  </div>

  {/* Example Translation (Optional) */}
  <div className="input-group">
    <textarea
      className="input-field"
      placeholder="Example Translation"
      value={exampleTranslation}
      onChange={(e) => setExampleTranslation(e.target.value)}
    />
  </div>

  <button type="submit" className="form-button form-button--green">
    Create Card
  </button>
</form>



  );
}

export default CreateCardModal;
