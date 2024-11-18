
const StatusIndicator = ({ status }) => {
    const statusStyles = {
      in_progress: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
  
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

export default StatusIndicator;