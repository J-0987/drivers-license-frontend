// context/ApplicationContext.jsx
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('driverApplications', []);

  // Save or update application
  const saveApplication = (formData, isSubmitted = false) => {
    const newApplication = {
      id: formData.id || crypto.randomUUID(),
      createdAt: formData.createdAt || new Date().toISOString(),
      status: isSubmitted ? 'submitted' : 'in_progress',
      data: {
        last_name: formData.last_name,
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        license_number: formData.license_number,
        date_of_birth: formData.date_of_birth,
        sex: formData.sex,
        height_cm: formData.height_cm,
        residential_address: formData.residential_address,
        mailing_address: formData.mailing_address,
        province: formData.province,
        postal_code: formData.postal_code
      }
    };

    setApplications(prev => {
      const filtered = prev.filter(app => app.id !== newApplication.id);
      return [...filtered, newApplication];
    });
  };

  // Delete application
  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  // Get single application
  const getApplication = (id) => {
    return applications.find(app => app.id === id);
  };

  const value = {
    applications,
    saveApplication,
    deleteApplication,
    getApplication
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

// Custom hook for using the context
export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplicationContext must be used within an ApplicationProvider');
  }
  return context;
};