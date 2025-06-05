// Import required modules
import crypto from "crypto"; // Used to generate secure random tokens
import bcryptjs from "bcryptjs"; // Used for password hashing
import dotenv from "dotenv"; // To load environment variables from a .env file
import { transporter } from "../config/emailTransporter.js"; // Nodemailer configured transporter

// Import helper functions from model
import {
  findUserByEmail,    // Get user by email
  storeResetToken,    // Save reset token and expiry time
  findUserByToken,    // Find user by reset token
  updatePassword,     // Update user's password
  getusers_db,        // Get list of users
} from "../model/forgotModel.js";

import { API_URL } from "../config/config.js"; // Base URL for reset link

dotenv.config(); // Load env variables

// Get all users (likely for testing/admin purposes)
export const getusers = async (req, res) => {
  try {
    const users = await getusers_db(); // Fetch users from DB
    res.json(users); // Send user list as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }); // Handle errors
  }
};

// Handle forgot password request
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if a user with the given email exists
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a secure random token and set expiry to 15 minutes
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min from now

    // Store the reset token and expiry in the DB
    await storeResetToken(email, token, expiresAt);

    // Construct the reset URL the user will receive
    const resetURL = `${API_URL}/reset-password?token=${token}`;

    // Send reset email using Nodemailer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}" target="_blank">${resetURL}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Handle password reset with the provided token
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Check if token is valid and not expired
    const user = await findUserByToken(token);
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update user's password in the DB
    await updatePassword(user.email, hashedPassword);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ error: "Server error" });
  }
};
