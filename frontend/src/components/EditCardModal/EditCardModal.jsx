import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkEditCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";


function EditCardModal({ card, updateCard }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // State for each editable field
  const [wordText, setWordText] = useState(card.word_text || "");
  const [pronunciation, setPronunciation] = useState(card.pronunciation || "");
  const [partOfSpeech, setPartOfSpeech] = useState(card.part_of_speech || "");
  const [definition, setDefinition] = useState(card.definition || "");
  const [exampleSentence, setExampleSentence] = useState(card.example_sentence || "");
  const [exampleTranslation, setExampleTranslation] = useState(card.example_translation || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      word_text: wordText,
      pronunciation,
      part_of_speech: partOfSpeech,
      definition,
      example_sentence: exampleSentence,
      example_translation: exampleTranslation,
    };

    const response = await dispatch(thunkEditCard({ id: card.id, ...updatedData }));

    if (response.errors) {
      setErrors(response.errors); // Handle errors from the backend
    } else {
      updateCard(response); // Update local state in the CardsPage
      closeModal(); // Close modal after successful submission
    }
  };

  return (
      <form onSubmit={handleSubmit} className="edit-card-modal">
        <h1>Edit Card</h1>

        {/* Word */}
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

        {/* Pronunciation */}
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Pronunciation"
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
          />
        </div>

        {/* Part of Speech */}
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Part of Speech"
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value)}
            required
          />
        </div>

        {/* Definition */}
        <div className="input-group">
          <textarea
            className="textarea-field"
            placeholder="Definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            required
          />
          {errors.definition && <p className="error-text">{errors.definition}</p>}
        </div>

        {/* Example Sentence */}
        <div className="input-group">
          <textarea
            className="textarea-field"
            placeholder="Example Sentence"
            value={exampleSentence}
            onChange={(e) => setExampleSentence(e.target.value)}
          />
        </div>

        {/* Example Translation */}
        <div className="input-group">
          <textarea
            className="textarea-field"
            placeholder="Example Translation"
            value={exampleTranslation}
            onChange={(e) => setExampleTranslation(e.target.value)}
          />
        </div>

        <button type="submit" className="form-button form-button--green">
          Save Changes
        </button>
      </form>
    );
}

export default EditCardModal;
