// Form validation rules
export const VALIDATION_RULES = {
  LOGIN: {
    rollno: {
      required: true,
      label: 'Roll Number',
      validator: (value) => /^[0-9]{2}[0-9]{3}[A-Z][0-9]{4}$/.test(value),
      message: 'Invalid roll number format'
    },
    password: {
      required: true,
      label: 'Password',
      validator: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters'
    }
  },
  REGISTRATION: {
    internship: {
      required: true,
      label: 'Number of Internships',
      validator: (value) => !isNaN(value) && value >= 0,
      message: 'Must be a valid number'
    },
    sector_of_interest: {
      required: true,
      label: 'Sector of Interest',
      validator: (value) => Array.isArray(value) && value.length > 0,
      message: 'Please select at least one sector'
    }
  },
  PROFILE: {
    name: {
      required: true,
      label: 'Name',
      validator: (value) => value.trim().length >= 2,
      message: 'Name must be at least 2 characters'
    },
    email: {
      required: true,
      label: 'Email',
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format'
    }
  }
};

// File upload constraints
export const FILE_CONSTRAINTS = {
  RESUME: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['application/pdf'],
    ALLOWED_EXTENSIONS: ['.pdf']
  }
};
