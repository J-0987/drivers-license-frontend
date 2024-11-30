// context/ApplicationContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  // Fetch all applications
  const fetchApplications = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }, []);

  // Save or update application
  const saveApplication = async (formData, isSubmitted = false) => {
    try {
      const applicationData = {
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
        postal_code: formData.postal_code,
        status: isSubmitted ? 'submitted' : 'in_progress'
      };

      let response;
      if (formData.id) {
        // Update existing application
        response = await axios.put(
          `${API_BASE_URL}/applications/${formData.id}`,
          applicationData
        );
      } else {
        // Create new application
        response = await axios.post(
          `${API_BASE_URL}/applications`,
          applicationData
        );
      }

      // Refresh applications list
      await fetchApplications();
      return response.data;
    } catch (error) {
      console.error('Error saving application:', error);
      throw error;
    }
  };

  // Delete application
  const deleteApplication = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/applications/${id}`);
      // Refresh applications list
      await fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  };

  // Get single application
  const getApplication = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  };

  const value = {
    applications,
    fetchApplications,
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