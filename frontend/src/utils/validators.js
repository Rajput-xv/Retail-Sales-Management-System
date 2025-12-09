export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

export const validateNumber = (value) => {
  return !isNaN(value) && value !== null && value !== '';
};

export const validateRange = (min, max) => {
  if (min === undefined || max === undefined) return true;
  return parseFloat(min) <= parseFloat(max);
};
