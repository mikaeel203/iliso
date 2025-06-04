<template>
  <!-- Login container wrapping the entire card -->
  <div class="login-container">
    <!-- Login form card -->
    <form id="login-form" class="login-card" @submit.prevent="handleLogin">
      <div class="top-logo">
        <img src="#" alt="Logo" class="logo" />
        <h2 class="title">Log in</h2>
      </div>

      <!-- Inspirational quote / subtitle -->
      <p class="subtitle">Youth is 37% of South Africa, but 100% of its future</p>

      <!-- Inputs for Admin ID and Password -->
      <div class="input-container">
        <!-- Admin ID Input Field -->
        <div class="input-group">
          <img class="icon" src="/union-1.png" />
          <input
            type="text"
            id="userId"
            placeholder="Admin ID"
            v-model="adminId"
            required
          />
        </div>

        <!-- Password Input Field -->
        <div class="input-group">
          <img class="icon" src="/Key.png" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
      </div>

      <!-- Remember Me checkbox -->
      <div class="remember-me">
        <label
          ><input
            type="checkbox"
            id="rememberMe"
            v-model="rememberMe"
          />Remember me</label
        >
      </div>

      <!-- Login button -->
      <button type="submit" class="login-button">Login</button>

      <!-- Error message (shows on login failure) -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Forgot password link -->
  <p class="forgot-password">
              <router-link to="/reset-password">Forgot Password?</router-link>
          </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      // Form data
      adminId: "",
      password: "",
      rememberMe: false,

      // Error message for failed login
      errorMessage: "",
    };
  },
  methods: {
    // Map Vuex actions to set token and staff details globally
    ...mapActions(["setToken", "setStaff"]),

    // Login handler for the form submission
    async handleLogin() {
      this.errorMessage = ''; // Reset error before trying

      try {
        // Send login credentials to backend
        const response = await axios.post("http://localhost:3000/staff", {
          adminId: this.adminId,
          password: this.password,
        });

        if (response.data.token) {
          // Save token to localStorage and Vuex
          localStorage.setItem('token', response.data.token);
          this.setToken(response.data.token);
          this.setStaff(response.data.staff);

          // Navigate to home page after short delay
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      } catch (error) {
        // Display appropriate error message
        this.errorMessage = error.response?.data?.message || "Invalid ID or password. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
/* ===================== Layout Styles ===================== */

/* Main container */
.login-container {
  font-family: 'Inter', 'Open Sans';
  display: flex;
  justify-content: center;
  margin: 70px auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #000000;
  background-color: #ffffff;
  height: 595px;
  width: 440px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* ===================== Text Styles ===================== */

.title {
  font-size: 30px;
  font-weight: 500;
}

.subtitle {
  margin-bottom: 2rem;
}

/* ===================== Logo ===================== */

.top-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

/* ===================== Input Styles ===================== */

.input-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group .icon {
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 12px;
  pointer-events: none;
}

.input-group input {
  width: 343px;
  height: 51px;
  padding-left: 40px;
  border-radius: 7px;
  border: 2px solid #ccc;
  font-size: 14px;
}

.input-group input::placeholder {
  font-weight: 400;
  font-family: Poppins;
  color: #000;
  font-size: 16px;
}

/* ===================== Remember Me ===================== */

.remember-me {
  text-align: left;
  font-size: 13px;
  margin-bottom: 1rem;
  padding-left: 5px;
}

.remember-me label {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  justify-content: start;
  width: 100%;
  padding-left: 20px;
}

/* ===================== Login Button ===================== */

.login-button {
  width: 200px;
  height: 46px;
  cursor: pointer;
  background-color: #0F4392;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 0;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Button hover effect: changes background and font color */
.login-button:hover {
  background-color: #7DC5F8;
  color: #000; 
}

/* ===================== Forgot Password Link ===================== */

.forgot-password {
  margin-top: 10px;
}

.forgot-password a {
  color: #0F4392;
  font-size: 12px;
  display: inline-block;
  margin-top: 8px;
  text-decoration: none;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.forgot-password a:hover {
  color: #7DC5F8; 
  text-decoration: underline;
}
</style>

