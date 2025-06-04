<template>
  <div class="reset-password">
    <h2>Reset Password</h2>
    <form @submit.prevent="handleSubmit">
      <label for="password">New Password:</label>
      <input type="password" v-model="newPassword" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Resetting...' : 'Reset Password' }}
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
      newPassword: '',
      message: '',
      error: '',
      loading: false
    };
  },
  computed: {
    token() {
      return this.$route.query.token || '';
    }
  },
  methods: {
    async handleSubmit() {
      this.message = '';
      this.error = '';
      this.loading = true;

      const trimmedPassword = this.newPassword.trim();
      const { message, error } = await AuthService.resetPassword(this.token, trimmedPassword);

      this.message = message || '';
      this.error = error || '';
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.reset-password {
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
