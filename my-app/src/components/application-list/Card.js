// Card.jsx
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './card.css';

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

const Card = ({ status, onEdit, onDelete, onView, children }) => {
    const cardStyle = {
      backgroundColor: getStatusColor(status)
    };
  
    return (
      <div className="card" style={cardStyle}>
        <div className="card-content">
          {children}
        </div>
        <div className="card-actions">
          {status.toLowerCase() === 'draft' ? (
            <>
              <button className="icon-button" onClick={onEdit}>
                <FaEdit />
              </button>
              <button className="icon-button" onClick={onDelete}>
                <FaTrash />
              </button>
            </>
          ) : (
            <button className="icon-button" onClick={onView}>
              <FaEye />
            </button>
          )}
        </div>
      </div>
    );
  };
export default Card;