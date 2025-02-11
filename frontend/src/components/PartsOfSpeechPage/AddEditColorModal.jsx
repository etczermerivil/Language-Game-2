import { useState } from 'react';
import { useModal } from '../../context/Modal';


const AddEditColorModal = ({ part, onSubmit, onClose, onDelete }) => {
  const [name, setName] = useState(part ? part.name : '');
  const [colorCode, setColorCode] = useState(part ? part.color_code : '');
  const { closeModal } = useModal();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedPart = { ...part, name, color_code: colorCode };
  //   fetch(`/api/colors/${part ? part.id : ''}`, {
  //     method: part ? 'PUT' : 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(updatedPart),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       onSubmit(data);
  //       closeModal(); // Close the modal after submission
  //     })
  //     .catch((err) => console.error(err));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPart = { id: part?.id, name, color_code: colorCode };

    fetch(`/api/colors/${part ? part.id : ''}`, {
      method: part ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPart),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Updated/Added Part:', data); // Log for debugging
        onSubmit(data); // Pass the new or updated part back to parent
        closeModal();
      })
      .catch((err) => console.error('Error saving part of speech:', err));
  };


  return (
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content">
        <h1>{part ? 'Edit Part of Speech' : 'Add Part of Speech'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📝</span>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon">🎨</span>
            <input
              type="color"
              className="input-field"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              placeholder="Color"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Save Changes</button>
            {part && (
            <button
              className="delete-modal-button--red"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${part.name}"?`)) {
                  onDelete(part.id);
                }
              }}
            >
              Delete Color
          </button>

            )}
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditColorModal;
