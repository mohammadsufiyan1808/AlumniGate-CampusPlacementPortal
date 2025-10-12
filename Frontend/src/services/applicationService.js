import api from './api.js';

export const applicationService = {
  // Apply to company
  applyToCompany: async (companyId) => {
    const response = await api.post('/apply', { companyId });
    return response.data;
  },

  // Get student's applications
  getStudentApplications: async () => {
    const response = await api.get('/applied-companies');
    return response.data;
  },

  // Get application status
  getApplicationStatus: async (applicationId) => {
    const response = await api.get(`/application/${applicationId}`);
    return response.data;
  }
};
