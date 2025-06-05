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
