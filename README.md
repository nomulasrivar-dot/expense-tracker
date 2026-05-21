# Financial Expense Tracking & Analytics 💰

![Live Demo](https://img.shields.io/badge/Live_Demo-Available-success?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)

A full-stack web application designed to help users track their daily expenses, visualize their spending habits through interactive charts, and manage their finances efficiently. Built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a modern Glassmorphism UI.

**Live Demo:** [https://expense-tracker-1-rwmp.onrender.com](https://expense-tracker-1-rwmp.onrender.com)

---

## ✨ Features
*   **Secure Authentication:** User signup and login powered by JWT (JSON Web Tokens), bcrypt password hashing, and **Google OAuth** for 1-click sign in.
*   **Expense Management:** Add, view, and categorize your daily expenses seamlessly.
*   **Interactive Dashboard:** A sleek, dark-mode Glassmorphism UI that feels premium and responsive.
*   **Visual Analytics:** Dynamic pie charts built with Recharts to break down spending by category.
*   **Real-time Data:** Connected to a cloud MongoDB Atlas database for reliable data persistence.

---

## 🛠️ Technology Stack
### Frontend
*   **React (Vite):** Blazing fast frontend framework.
*   **React Router:** For seamless single-page application navigation.
*   **Google OAuth:** Secure 1-click social login via `@react-oauth/google`.
*   **Recharts:** For data visualization and analytics.
*   **Vanilla CSS:** Custom Glassmorphism styling without heavy UI libraries.
*   **Axios:** For API HTTP requests.

### Backend
*   **Node.js & Express.js:** Robust server architecture and RESTful API routes.
*   **MongoDB & Mongoose:** NoSQL database and object data modeling.
*   **JSON Web Tokens (JWT):** Secure stateless authentication.
*   **Bcryptjs:** Secure password encryption.

---

## 🚀 How to Run Locally

To run this project on your local machine, follow these steps:

### Prerequisites
*   Node.js installed
*   MongoDB installed locally OR a free MongoDB Atlas cluster

### 1. Clone the repository
```bash
git clone https://github.com/nomulasrivar-dot/expense-tracker.git
cd expense-tracker
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a second terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder and add the following variable:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```
Start the frontend development server:
```bash
npm run dev
```

### 4. View the App
Open your browser and navigate to `http://localhost:5173`.

---

## 👨‍💻 Developer
Developed by Srivar.
