// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    ME: '/me'
  },
  COMPANIES: {
    ALL: '/companies',
    BY_CODE: '/companies/:code',
    FOR_STUDENT: '/companies-for-you'
  },
  APPLICATIONS: {
    APPLY: '/apply',
    APPLIED: '/applied-companies',
    STATUS: '/application/:applicationId'
  },
  PROFILE: {
    GET: '/me',
    UPDATE: '/profile',
    UPLOAD_RESUME: '/upload-resume',
    REGISTER: '/register',
    UPDATE_PREFERENCES: '/update-preferences'
  }
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// API response messages
export const API_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful',
    REGISTRATION: 'Registration completed successfully',
    APPLICATION: 'Application submitted successfully',
    UPDATE: 'Profile updated successfully'
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid Roll Number or Password',
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Server error',
    NETWORK_ERROR: 'Network error'
  }
};
