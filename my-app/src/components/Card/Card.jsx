import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './card.scss';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { toast } from 'react-toastify';
import MainForm from '../../pages/ApplicationFormPage';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'submitted':
      return '#e1e9c8';
    case 'draft':
      return '#e5d4ec';
    default:
      return '#ffffff';
  }
};

const Card = ({ application, onEdit, onDelete, onView, children }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const { status } = application;

  const cardStyle = {
    backgroundColor: getStatusColor(status),
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  const handleViewClick = () => {
    setIsViewModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(application.id);
      setIsDeleteModalOpen(false);
      toast.success('Application deleted successfully');
    } catch (error) {
      toast.error('Failed to delete application');
      console.error('Failed to delete application:', error);
    }
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-content">{children}</div>

      <div className="card-actions">
        {status.toLowerCase() === 'draft' ? (
          <>
            <button
              className="icon-button"
              onClick={() => onEdit(application)} // Calls the onEdit function passed from ApplicationList
            >
              <FaEdit />
            </button>
            <button
              className="icon-button"
              onClick={handleDeleteClick}
            >
              <FaTrash />
            </button>
          </>
        ) : (
          <button className="icon-button" onClick={handleViewClick}>
            <FaEye />
          </button>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="modal-content">
          <p>Are you sure you want to delete this application?</p>
          <div className="modal-buttons">
            <button
              onClick={handleConfirmDelete}
              className="confirm-button"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <div className="modal-content">
          <MainForm 
            initialData={application} 
            isDisabled={true} 
            isViewMode={true}
          />
          <div className="modal-buttons">
            <button onClick={() => setIsViewModalOpen(false)} className="close-button">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
