import React from "react";
import "./Success.scss";
{/* Success Confirmation Modal */ }
const Success = ({ isOpen, onClose, message, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
          <p>{message}</p>
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
}


export default Success;
