
 const ConfirmationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Success!</h3>
            <p className="mt-2 text-gray-500">{message}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

    export default ConfirmationModal;