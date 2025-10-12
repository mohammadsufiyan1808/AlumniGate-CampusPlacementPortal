import api from './api.js';

export const companyService = {
  // Get all companies
  getAllCompanies: async () => {
    const response = await api.get('/companies');
    return response.data;
  },

  // Get company by code
  getCompanyByCode: async (code) => {
    const response = await api.get(`/companies/${code}`);
    return response.data;
  },

  // Get companies for student (filtered by eligibility)
  getCompaniesForStudent: async () => {
    const response = await api.get('/companies-for-you');
    return response.data;
  }
};
