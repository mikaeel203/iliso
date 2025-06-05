// Import Nodemailer for sending emails
import nodemailer from "nodemailer";

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config(); // Must be called before accessing any process.env variables

// Create and export a Nodemailer transporter object
export const transporter = nodemailer.createTransport({
  service: "gmail", // Specifies Gmail as the email service provider
  auth: {
    user: process.env.EMAIL_USER, // Gmail address used to send emails
    pass: process.env.EMAIL_PASS, // App password or Gmail account password (use App Password for security)
  },
});
