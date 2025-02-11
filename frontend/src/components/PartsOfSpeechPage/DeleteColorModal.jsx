
// import './DeleteColorModal.module.css';

const DeleteColorModal = ({ part, onSubmit, onClose }) => {
  const handleDelete = () => {
    fetch(`/api/colors/${part.id}`, {
      method: 'DELETE',
    })
      .then(() => onSubmit(part.id))
      .catch((err) => console.error(err));
  };

  return (
    <div className="modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete &quot;{part.name}&quot;?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteColorModal;
