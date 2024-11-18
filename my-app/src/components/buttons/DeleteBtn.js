
import { useState } from 'react';
import { ConfirmationModal } from '../ConfirmationModal';
import { useApplicationContext } from '../../context/ApplicationContext';

export const DeleteButton = ({ applicationId }) => {
  const [showModal, setShowModal] = useState(false);
  const { deleteApplication } = useApplicationContext();

  const handleDelete = () => {
    deleteApplication(applicationId);
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 px-3 py-1 rounded"
      >
        Delete
      </button>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Application successfully deleted!"
      />
    </>
  );
};