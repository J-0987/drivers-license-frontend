import React from "react";
const ConfirmDialog = ({ isOpen, onSave, onDiscard }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal confirm-dialog">
          <h3>Save Changes?</h3>
          <p>You have unsaved changes. Would you like to save them?</p>
          <div className="modal-buttons">
            <button 
              className="save-button" 
              onClick={onSave}
            >
              Save Changes
            </button>
            <button 
              className="discard-button" 
              onClick={onDiscard}
            >
              Don't Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ConfirmDialog;