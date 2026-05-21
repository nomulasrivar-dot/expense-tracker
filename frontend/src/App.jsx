import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const user = localStorage.getItem('userInfo');

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || '887909038921-mc8h7q798drc3irc95cc52hjv88c2no6.apps.googleusercontent.com'}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
