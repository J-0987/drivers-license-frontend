import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;