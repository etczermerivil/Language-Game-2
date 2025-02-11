import { useDispatch } from "react-redux";
import { thunkDeleteCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";


function DeleteCardModal({ cardId, cardName, removeCard }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const errors = await dispatch(thunkDeleteCard(cardId)); // Dispatch the delete action

    if (errors) {
      alert("Failed to delete card. Please try again.");
    } else {
      if (removeCard) {
        removeCard(cardId); // Call removeCard to update the local state in CardsPage
      }
      closeModal(); // Close the modal
    }
  };

  return (
<div className="delete-modal">
  <div className="delete-modal-content">
    <h2 className="delete-modal-title">Delete Card</h2>
    <p className="delete-modal-text">
      Are you sure you want to delete the card{" "}
      <span className="delete-modal-card-name">&quot;{cardName}&quot;</span>?
    </p>
    <div className="delete-modal-button-group">
      <button
        className="delete-modal-button delete-modal-button--gray"
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        className="delete-modal-button delete-modal-button--red"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </div>
</div>

  );
}

export default DeleteCardModal;
