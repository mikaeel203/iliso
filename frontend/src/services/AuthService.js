// src/services/AuthService.js

export default {
  sendResetLink(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.includes('@')) {
          resolve({ message: 'Reset link sent to your email.' });
        } else {
          resolve({ error: 'Invalid email address.' });
        }
      }, 1000);
    });
  },

  resetPassword(token, newPassword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (newPassword.length >= 6) {
          resolve({ message: 'Password reset successful!' });
        } else {
          resolve({ error: 'Password must be at least 6 characters.' });
        }
      }, 1000);
    });
  }
};
