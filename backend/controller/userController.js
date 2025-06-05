// Import necessary modules
import jwt from "jsonwebtoken";        // Used for creating and verifying JWT tokens
import bcrypt from "bcrypt";           // Used for hashing and comparing passwords securely
import { pool } from "../config/db.js";  // Database connection pool
import { config } from "dotenv";       // To load environment variables from .env
import { getAdminByEmail } from "../models/userModel.js"; // Function to retrieve admin data by email

config(); // Load environment variables

// Controller to handle admin sign-up
export const signUpAdmin = async (req, res) => {
  try {
    const { username, email, phone_number, password } = req.body;

    // Step 1: Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 2: Insert new admin details into the database
    const query = `
      INSERT INTO admin (username, password_hash, email, phone_number)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [username, hashedPassword, email, phone_number]);

    // Step 3: Respond with success and the new admin's info
    res.status(201).json({
      message: "Admin signed up successfully",
      admin: {
        admin_id: result.insertId,
        username,
        email,
        phone_number,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Error signing up admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const [admins] = await pool.query("SELECT id, username, email, phone_number FROM admin");
    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single admin by username
export const getAdminByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [admin] = await pool.query(
      "SELECT id, username, email, phone_number FROM admin WHERE username = ?",
      [username]
    );

    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({ admin: admin[0] });
  } catch (error) {
    console.error("Error fetching admin by username:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update admin information
export const updateAdminByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { new_username, email, phone_number } = req.body;

    // Get current admin details
    const [existing] = await pool.query("SELECT * FROM admin WHERE username = ?", [username]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const current = existing[0];

    // Use current values if fields are not provided in body
    const updatedUsername = new_username || current.username;
    const updatedEmail = email || current.email;
    const updatedPhone = phone_number || current.phone_number;

    // Update the admin with new or existing values
    const [result] = await pool.query(
      `UPDATE admin SET username = ?, email = ?, phone_number = ? WHERE username = ?`,
      [updatedUsername, updatedEmail, updatedPhone, username]
    );

    res.status(200).json({ message: "Admin updated successfully." });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an admin by username
export const deleteAdminByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [result] = await pool.query("DELETE FROM admin WHERE username = ?", [username]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({ message: "Admin deleted successfully." });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if the admin exists in the database
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Step 2: Verify the password
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Step 3: Generate a JWT token valid for 100 days
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '100d' });

    // Step 4: Respond with the token and admin data
    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        phone_number: admin.phone_number
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller to handle logout (client is expected to discard token)
export const logoutAdmin = (req, res) => {
  console.log("Logout endpoint hit. Client should now discard their token.");
  res.status(200).json({ message: "Logout successful. Please discard your token on the client-side." });
};

// Export loginAdmin separately for modular usage
export { loginAdmin };
