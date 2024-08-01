/**
 * Validates an email address.
 *
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validates a password.
 *
 * @param {string} password
 * @returns {boolean} 
 */
export const validatePassword = (password) => password.length >= 6;

/**
 * Validates a mobile number.
 *
 * @param {string} mobile
 * @returns {boolean}
 */
export const validateMobile = (mobile) => /^[0-9]{10,15}$/.test(mobile);