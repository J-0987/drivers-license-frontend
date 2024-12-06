
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './card.scss';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';
import { driverLicenseApi } from '../../api/driverLicense';
import { toast } from 'react-toastify';


const getStatusColor = (status) => {
  switch(status.toLowerCase()) {
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const cardStyle = {
      backgroundColor: getStatusColor(status)
    };
    const handleDeleteClick = () => {
      setIsDeleteModalOpen(true);
    };
  
const handleEditClick = async () => {
    try {
      const response = await driverLicenseApi.getApplication(application.id);
      setSelectedApplication(response.data);
      setIsEditModalOpen(true);
    } catch (error) {
      toast.error('Failed to fetch application details');
      console.error('Error fetching application:', error);
    }
  };
  
    const handleConfirmDelete = async () => {
      try {
        await onDelete(application.id);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Failed to delete method:', error);
      }
    };
  
    const handleEditSubmit = async (updatedData) => {
      try {
        await api.put(`/api/applications/${selectedApplication.id}`, updatedData);
        setIsEditModalOpen(false);
        // Refresh your applications list here
      } catch (error) {
        throw new Error('Failed to update application');
      }
    };

    return (
      <div className="card" style={cardStyle}>
        <div className="card-content">
          {children}
        </div>
        <div className="card-actions">
          {status.toLowerCase() === 'draft' ? (
            <>
              <button className="icon-button" onClick={handleEditClick}>
                <FaEdit />
              </button>
              <button className="icon-button" onClick={handleDeleteClick}>
                <FaTrash />
               
              </button>
            </>
          ) : (
            <button className="icon-button" onClick={onView}>
              <FaEye />
            </button>
          )}
        </div>
        <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete "{}"?</p>
        <div className="modal-buttons">
          <button onClick={handleConfirmDelete} className="confirm-button">Confirm</button>
          <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-button">Cancel</button>
        </div>
      </Modal>
      {isEditModalOpen && (
        <EditForm
          applicationData={selectedApplication}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
      </div>
    );
  };
export default Card;