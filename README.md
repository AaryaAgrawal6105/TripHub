# ✈️ TripHub – Collaborative Trip Planning Platform

TripHub is a full-stack web application that simplifies planning group trips. Instead of juggling spreadsheets, WhatsApp groups, and links, users can collaboratively organize every part of a trip — from itinerary and budgets to todos and comments — all in one place.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Zustand Store Overview](#zustand-store-overview)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## 🌟 Features

- ✅ Create and join collaborative trips
- 📝 Share and manage todos
- 🧾 Add budgets and track expenses
- 📅 Plan daily itineraries
- 💬 Comment on trip elements
- 📩 Send trip invite via email
- 🔐 JWT-based authentication
- 💾 Global trip state managed via Zustand and persisted in localStorage

---

## 🧰 Tech Stack

| Layer         | Technology                         |
|---------------|------------------------------------|
| Frontend      | React, Tailwind CSS, Zustand       |
| Backend       | Node.js, Express.js, Mongoose      |
| Database      | MongoDB (Atlas)                    |
| Auth          | JWT (JSON Web Token)               |
| Email         | Nodemailer + Gmail App Password    |
| Deployment    | Fly.io (backend), Vercel (frontend) |

---

## 📁 Project Structure

```
TripHub/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   │   └── useTripStore.js
│   │   └── App.jsx
│   └── package.json
```

---

## 🛠️ Setup Instructions

### 🚀 Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🌐 Backend

```bash
cd backend
npm install
node src/server.js
```

Make sure MongoDB is connected and environment variables are configured.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

EMAIL_ID=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

To get an **App Password** for Gmail:
1. Enable 2-Step Verification on your account.
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a password for "Mail"
4. Paste it as `EMAIL_PASS`

---

## 🔗 API Overview

| Route                          | Method | Protected | Description                          |
|--------------------------------|--------|-----------|--------------------------------------|
| `/api/auth/register`          | POST   | ❌        | Register a new user                  |
| `/api/auth/login`             | POST   | ❌        | Login and receive JWT                |
| `/api/trips/`                 | GET    | ✅        | Get all trips for the user           |
| `/api/trips/`                 | POST   | ✅        | Create a new trip                    |
| `/api/trips/:id/join`         | POST   | ✅        | Join a trip via invite               |
| `/api/trips/:id/todos`        | POST   | ✅        | Add a new todo                       |
| `/api/trips/:id/todos/:todoId`| PATCH  | ✅        | Toggle todo status                   |
| `/api/trips/:id/todos/:todoId`| DELETE | ✅        | Delete a todo                        |
| `/api/invite/send`            | POST   | ✅        | Send trip invite via email          |

---

## 💾 Zustand Store Overview (`useTripStore.js`)

This global store manages:
- Current selected trip
- LocalStorage sync
- Trip-level todos (add / toggle / delete)

### Example Usage

```jsx
const trip = useTripStore((state) => state.trip);
const addTodo = useTripStore((state) => state.addTodo);
```

### Core Actions

| Action         | Description                            |
|----------------|----------------------------------------|
| `setTrip()`    | Set trip to state + localStorage       |
| `fetchTripById(tripId)` | Fetch trip data from API      |
| `addTodo(tripId, task)` | Add a new todo                |
| `toggleTodo(tripId, todoId)` | Toggle completion        |
| `deleteTodo(tripId, todoId)` | Remove a todo            |

---

## 🚧 Future Enhancements

- 📄 Export itinerary to PDF
- 🤖 AI-powered trip suggestions
- 📆 Google Calendar sync
- 📍 Map markers for places to visit
- 📱 Mobile-first responsive design
- 🔔 Real-time group chat via Socket.IO
- 🔒 Role-based permissions for trip admin

---

## 🤝 Contributing

Contributions are welcome! 🚀

1. Fork the project
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

---


## 🌍 Live Demo (Coming Soon)

- Frontend: [https://triphub.vercel.app](https://triphub-frontend.onrender.com)
- Backend API: [https://triphub.fly.dev/api](https://triphub-backend-3x8e.onrender.com)
