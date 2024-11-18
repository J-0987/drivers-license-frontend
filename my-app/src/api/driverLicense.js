// src/api/driverLicense.js - API endpoints
import api from './axios';
const API_URL = 'http://localhost:8000'; 
export const driverLicenseApi = {
  // Create new license
  createLicense: async (licenseData) => {
    try {
      const response = await api.post('/driver-license/', licenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
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