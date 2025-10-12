// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRollNo = (rollno) => {
  const rollNoRegex = /^[0-9]{2}[0-9]{3}[A-Z][0-9]{4}$/;
  return rollNoRegex.test(rollno);
};

export const validateCGPA = (cgpa) => {
  const num = parseFloat(cgpa);
  return !isNaN(num) && num >= 0 && num <= 10;
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label} is required`;
    } else if (value && rule.validator && !rule.validator(value)) {
      errors[field] = rule.message || `${rule.label} is invalid`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
