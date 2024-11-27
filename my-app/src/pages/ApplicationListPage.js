
//request database to render list of applications

import ApplicationItem from '../components/application-list/ApplicationItem';
import { useApplicationContext } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ApplicationList = () => {
  const { applications, fetchApplications, loading, error } = useApplicationContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (loading) {
    return <div className="text-center py-4">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

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
        {applications.length === 0 ? (
          <p className="text-center text-gray-500">
            No applications found. Create a new one!
          </p>
        ) : (
          applications.map(application => (
            <ApplicationItem 
              key={application.id} 
              application={application} 
            />
          ))
        )}
      </div>
    </div>
  );
};