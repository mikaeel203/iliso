<template>
  <div class="login-container">
    <form id="login-form" class="login-card" @submit.prevent="handleLogin">


      <div class="top-logo">
        <img src="#" alt="Logo" class="logo" />
        <h2 class="title">Log in</h2>
      </div>

      <p class="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <!-- <p class="subtitle">Youth is 37% of South Africa, but 100% of its future</p> -->

      <div class="input-container">
        <!-- Admin ID Input -->
        <div class="input-group">
          <!-- <i class="fas fa-user"></i> -->
          <img class="icon" src="/union-1.png" />
          <input type="text" id="userId" placeholder="Admin ID" v-model="adminId" required />
        </div>

        <!-- Password Input -->
        <div class="input-group">
          <!-- <i class="fas fa-lock"></i> -->
          <img class="icon" src="/Key.png" />
          <input type="password" id="password" placeholder="Password" v-model="password" required />
        </div>
      </div>

      <!-- Remember Me Checkbox -->
      <div class="remember-me">
        <label><input type="checkbox" id="rememberMe" v-model="rememberMe" />Remember me</label>
      </div>

      <!-- Login Button -->
      <button type="submit" class="login-button">login-container</button>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
    </form>
  </div>
</template>


<!-- <script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: "LoginView",
  data() {
    return {
      adminId: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['setToken', 'setUser']),
    async handleLogin() {
      this.errorMessage = '';
      try {
        const response = await axios.post("#", {
          email: this.loginEmail,
          password: this.loginPassword,
        });

        if (response.data.token) {
          // If the login is successful, store the token in localStorage and Vuex
          localStorage.setItem('token', response.data.token);
          this.setToken(response.data.token);
          this.setUser(response.data.user);

          // Redirect after delay
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Invalid username or password. Please try again.";
      }
    },
  },
};
</script> -->

<style scoped>
/* keanan css */

.login-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  margin: 70px auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #2c3e50;
  height: 595px;
  width: 440px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

}

.title {
  font-size: 30px;
  font-weight: 500;
}

.icon {
  position: absolute;
  padding: 12px;
  min-width: 20px;
}

.remember-me {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.subtitle {
  margin-bottom: 2rem;
}

.login-button {
  /* background: #6EC966; */
  width: 200px;
  border-radius: 20px;
  height: 46px;
  cursor: pointer;
}

.top-logo {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 6rem;
}

.input-group input {
  width: 343px;
  height: 51px;
  /* border: 2px solid red; */
  border-radius: 7px;

}

.input-group input::placeholder {
  font-weight: 400;
  font-family: Poppins;
  color: #000;
  font-size: 16px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
</style>