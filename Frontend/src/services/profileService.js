import api from './api.js';

export const profileService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  // Upload resume
  uploadResume: async (formData) => {
    const response = await api.post('/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Complete registration
  completeRegistration: async (registrationData) => {
    const response = await api.post('/register', registrationData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update preferences
  updatePreferences: async (preferencesData) => {
    const response = await api.put('/update-preferences', preferencesData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
