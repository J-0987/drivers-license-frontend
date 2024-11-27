
import api from './axios';

export const driverLicenseApi = {
  // Create new license
  createLicense: async (licenseData) => {
    try {
      const response = await api.post('/driver-license/', licenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
      console.log("The error here is:",error);
    }
  },

  // Get all licenses
  getLicenses: async () => {
    try {
      const response = await api.get('/driver-license/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single license
  getLicense: async (id) => {
    try {
      const response = await api.get(`/driver-license/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};