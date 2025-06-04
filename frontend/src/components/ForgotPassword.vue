<template>
  <div class="forgot-password">
    <h2>Forgot Password</h2>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      email: '',
      message: '',
      error: '',
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      console.log("Forgot Password submitted with email:", this.email);
      this.loading = true;
      this.message = '';
      this.error = '';

      const trimmedEmail = this.email.trim();
      const { message, error } = await AuthService.sendResetLink(trimmedEmail);

      this.message = message || '';
      this.error = error || '';
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.forgot-password {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
.message {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
