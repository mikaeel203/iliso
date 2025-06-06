# iliso

## Project setup

```bash
git clone https://github.com/mikaeel203/iliso.git
cd iliso
cd frontend
npm install
npm run serve

npm i vuex       # For state management (e.g., authentication, user session)
npm i vue-router # For handling multiple frontend routes
npm i axios      # For making API requests to the backend
npm i core-js    # JS polyfills to support older browsers

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Iliso Backend - Team A (Admin Access and Authentication)
This backend system, developed by Team A, is responsible for managing **admin access and user authentication** for the Iliso platform. Built with **Node.js** and **Express.js**, it securely handles user data within a **MySQL database**, including seamless integration with the frontend for login and forgotten password functionalities.
---
## Table of Contents
- [Purpose & Scope](#purpose--scope)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Login Logic Overview](#login-logic-overview)
- [Team & Responsibilities](#team--responsibilities)
---
## Purpose & Scope
This module is designed to provide a robust and secure foundation for user management within the Iliso system. Specifically, it covers:
* **User Registration and Account Creation:** Enabling new administrators to sign up securely.
* **User Authentication (Login and Session Management):** Verifying user credentials and managing secure sessions.
* **User Authorization:** Defining and enforcing roles and permissions to control access.
* **Secure Dashboard Access:** Ensuring only authorized users can access the dashboard interface.
* **Frontend Integration:** Providing API endpoints for login and forgot password features to the frontend.
---
## Technologies Used
This backend leverages a modern and secure technology stack:
* **Backend Framework:** Node.js with Express.js
* **Authentication Library:** JWT (jsonwebtoken)
* **Database:** MySQL
* **Password Hashing:** bcrypt.js
* **Environment Variables:** dotenv
* **Email Sending:** Nodemailer
**Dependencies:**
* `jsonwebtoken`
* `bcryptjs`
* `express`
* `dotenv`
* `nodemailer`
* `cors`
* `crypto`
* `mysql2`
---
## Setup Instructions
Follow these steps to get the Iliso backend running locally:
1.  **Prerequisites:**
    * Node.js (LTS version recommended)
    * MySQL online database server
    * A code editor (e.g., VS Code)
2.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/mikaeel203/iliso.git](https://github.com/mikaeel203/iliso.git)
    cd iliso
    ```
3.  **Install Dependencies:**
    ```bash
    npm mysql2 bcryptjs cors crypto nodemailer express dotenv jsonwebtoken
    ```
4.  **Database Setup:**
    * Connect to the online MySQL database.
    * Team A (user access and authentication) deals with the `admin` table with columns like `username`, `email`, `phone_number`, `password_hash`, `reset_token`, `reset_token_expiry`).
    * Populate your `.env` file with your MySQL database credentials and a strong `JWT_SECRET`. Example `.env` file:
        ```
        (Request team A to forward you .env crucial information)
        DB_HOST=localhost
        DB_USER=your_mysql_user
        DB_PASSWORD=your_mysql_password
        DB_NAME=iliso_db
        JWT_SECRET=your_super_secret_jwt_key
        EMAIL_USER=your_email@example.com
        EMAIL_PASS=your_email_password
        ```
5.  **Run the Backend Server:**
    ```bash
    node --watch server.js
    ````
    The server will typically run on `http://localhost:3000` (or the port defined in your Express app).
---
## Signup Logic Overview
1.  **Admin wants to sign up:** An administrator (or a process on their behalf) sends a POST request to the `/user` API endpoint.
2.  **Data sent:** This request includes the admin's username, email, phone_number, and password.
3.  **Route receives request:** The `routes/userRoutes.js` file receives this request and directs it to the `signUpUser` function.
4.  **Email check:** The `signUpUser` function first verifies if the email ends with @lifechoices.co.za. If not, it stops the process and sends an "Unauthorized" message back.
5.  **Password secured:** If the email is valid, the provided password is converted into a `hashedPassword` using a strong encryption method.
6.  **Database entry:** The username, hashedPassword, email, and phone_number are then saved as a new record in the admin table of the database.
7.  **Confirmation:** The system sends a message back confirming “Admin signed up successfully”.
---
## Login Logic Overview
1.  **Request Initiation:** An admin sends a POST request to the `/login` API endpoint with their email and password.
2.  **Route Handling:** The `routes/userRouter.js` file receives this request and directs it to the loginAdmin function in `controller/userController.js`.
3.  **Admin Existence Check:** The `loginAdmin` function calls getAdminByEmail (from `model/userModel.js`) to check if an admin account exists with the provided email. If not found, it returns an "Invalid email or password" error.
4.  **Password Verification:** If an admin is found, the provided plain-text password is securely compared against the stored password_hash using bcrypt.compare(). If they don't match, an "Invalid email or password" error is returned.
5.  **JWT Generation:** Upon successful verification, a JSON Web Token (JWT) is generated using jsonwebtoken.sign(). This token contains the admin's ID and is signed with the JWT_SECRET from the .env file.
6.  **Success Response:** The system sends a 200 OK HTTP status and a JSON response confirming "Login successful". This response includes the generated JWT (for frontend storage and future requests) and basic admin details (excluding the password hash).
---
## Forget Password Logic Overview
1.  **User Requests Reset:** User enters email on "Forgot Password" page, sending a POST request to `/forgot-password`.
2.  **System Sends Link:** `forgotPassword` function verifies email, generates a unique, time-limited reset token, stores it in the database, and emails a reset link (containing the token) to the user.
3.  **User Accesses Reset Page:** User clicks the email link, arriving at a "Reset Password" page where the token is extracted, and they enter a new password.
4.  **User Submits New Password:** User submits the new password and the token via a POST request to `/reset-password`.
5.  **System Updates Password:** `resetPassword` function validates the token, hashes the new password, updates the user's password in the database, and clears the used token.
6.  **Confirmation:** System confirms password reset, allowing the user to log in with their new password.
---
## Team & Responsibilities
This project is a collaborative effort by Team A:
* **Armien Begg**
* **Azola Ndoda**
* **Chante Wyngaardt**
* **Ibrahim Karlie**
* **Indiphile Mcengwa**
* **Uzair Meyer**
* **Zainunesa Magmoed**
### Feature Subtasks:
* **Signup:** (Indiphile Mcengwa, Ibrahim Karlie) Responsible for new user registrations, including password hashing with bcrypt.
* **Login:** (Azola Ndoda, Uzair Meyer) Focused on secure credential verification using bcrypt and JWT issuance for sessions.
* **Forgot Password:** (Chante Wyngaardt, Armien Begg) Developing the email-based token generation via Nodemailer for secure password resets (Note: This was out-of-scope but implemented).
---
