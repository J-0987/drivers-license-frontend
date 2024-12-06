import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
        <button 
          className="modal__close-btn" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;