
import api from './axios';

export const driverLicenseApi = {

createApplication: async (data) => {
  try {
    const response = await api.post('/applications/', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

editApplication: async (id, data) => {
  try {
    const response = await api.patch(`/applications/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

submitApplication: async (formData) => {
  try {
    const response = await api.post(`/applications/submit`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

deleteApplication: async (id) => {
  try {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

getAllApplications: async () => {
  try {
    const response = await api.get('/applications');
    console.log("Response from API:", response);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

getApplication: async (id) => {
  try {
    console.log("Fetching URL:", `/applications/${id}`); // Debugging
    const response = await api.get(`/applications/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

};

