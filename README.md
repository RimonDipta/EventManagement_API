# 🎟️ Event Management Backend API

A backend REST API built with **Node.js**, **Express**, and **MongoDB** for managing events.  
Currently supports **User Authentication** (Register, Login, Logout, Update Profile) and will be extended with event-related features.

---

## 🚀 Features

- User Authentication
  - Register new users
  - Login with JWT & cookies
  - Secure Logout
  - Update user profile
- JWT-based authentication
- Cookie-based session management
- Security middlewares (Helmet, HPP, Rate Limiting, Mongo Sanitize, CORS)

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/event-management.git
   cd event-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root and add the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/event_api
   JWT_SECRET=SuperSecretKey
   JWT_Expire_Time=30d
   Cookie_Expire_time=2592000000

   ```

4. Start the server:
   ```bash
    npx nodemon index
   ```

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint           | Description                | Protected |
| ------ | ------------------ | -------------------------- | --------- |
| POST   | `/api/v1/register` | Register a new user        | ❌        |
| POST   | `/api/v1/login`    | Login and get token        | ❌        |
| GET    | `/api/v1/logout`   | Logout and clear cookie    | ✅        |
| GET    | `/api/v1/user`     | Get Logged-in user profile | ✅        |
| PUT    | `/api/v1/update`   | Update user profile        | ✅        |

> ✅ = Requires authentication

---

## 🔒 Security

- Passwords are hashed using **bcrypt** before saving.
- JWT tokens stored in **HTTP-only cookies**.
- **Helmet, Rate Limiter, HPP, CORS, Mongo Sanitize** added for enhanced security.

---

## 📌 Roadmap

- [x] User Authentication
- [ ] Event CRUD (Create, Read, Update, Delete)
- [ ] Event Registration & Attendance
- [ ] Role-based access (Admin/User)
- [ ] Testing & Documentation

---

## 👨‍💻 Author

Built by **[Rimon Dipta]**
