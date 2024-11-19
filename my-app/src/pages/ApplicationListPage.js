
import  ApplicationItem  from '../components/application-list/ApplicationItem';
import  {useApplicationContext } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';

export const ApplicationList = () => {
  const { applications } = useApplicationContext();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Applications</h1>
        <button 
          onClick={() => navigate('/application/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Application
        </button>
      </div>
      <div className="space-y-4">
        {applications.map(application => (
          <ApplicationItem 
            key={application.id} 
            application={application} 
          />
        ))}
      </div>
    </div>
  );
};