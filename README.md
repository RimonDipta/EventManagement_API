# 🎟️ Event Management API (Node.js + Express + MongoDB)

A backend API for managing **users** and **events** with authentication & authorization.  
Built with **Express, MongoDB, JWT, and Cookies**.

---

## 🚀 Features

### 🔑 User Authentication

- User Registration (name, email, password, phone number)
- User Login (JWT + HTTP-only cookies)
- Get Logged-in User Profile
- Update User Profile (name, phone, password, etc.)
- Logout (clears auth cookie)

### 🎫 Event Management

- Create Event (only authenticated users)
- Get All Events
- Get Event by ID
- Update Event (only creator can edit)
- Delete Event (only creator can delete)

### 🔒 Security

- Passwords hashed with **bcrypt**
- JWT stored in **HTTP-only cookies**
- Security middlewares: `helmet`, `hpp`, `express-mongo-sanitize`
- Rate limiting to prevent abuse

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **cookie-parser** for cookie handling

---

## 📂 Project Structure

├── index.js\
├── app.js\
├── src\
│ ├── controllers\
│ │ ├── userController.js\
│ │ └── eventController.js\
│ ├── middleware\
│ │ └── authMiddleware.js\
│ ├── models\
│ │ ├── User.js\
│ │ └── Event.js\
│ ├── routes\
│ │ └── api.js\
│ └── utils\
│ └── tokenHelper.js\
└── package.json

---

## ⚡ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/RimonDipta/EventManagement_API.git
   cd event-management-api
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

3. Create .env file in the root:
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_Expire_Time=1d
   Cookie_Expire_time=86400000
   ```
4. Run serve
   ```bash
   npm start
   ```
   Server will run on 👉 http://localhost:5000

---

## 📡 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint         | Description             | Protected |
| ------ | ---------------- | ----------------------- | --------- |
| POST   | /api/v1/register | Register new user       | ❌        |
| POST   | /api/v1/login    | Login user + set cookie | ❌        |
| GET    | /api/v1/user     | Get user profile        | ✅        |
| PUT    | /api/v1/update   | Update profile          | ✅        |
| GET    | /api/v1/logout   | Logout (clear cookie)   | ✅        |

### 🎫 Event Routes

| Method | Endpoint             | Description                 | Protected |
| ------ | -------------------- | --------------------------- | --------- |
| POST   | /api/v1/create-event | Create new event            | ✅        |
| GET    | /api/v1/events       | Get all events              | ✅        |
| GET    | /api/v1/event/:id    | Get event by ID             | ✅        |
| PUT    | /api/v1/event/:id    | Update event (only creator) | ✅        |
| DELETE | /api/v1/event/:id    | Delete event (only creator) | ✅        |

✅ = Requires login (JWT cookie)

---

## 🧪 Testing with Postman

1. **Register** → `POST /api/v1/register`
2. **Login** → `POST /api/v1/login` (cookie will be set)
3. Use other routes → Postman will automatically send the cookie
4. Try creating, updating, and deleting events

---
