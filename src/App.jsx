import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './LoginPage';
import StudentsPage from './StudentsPage';
import Sidebar from './Sidebar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        <div style={{ display: 'flex' }}>
          <Sidebar onLogout={handleLogout} />
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/students" element={<StudentsPage />} />
              <Route path="*" element={<Navigate to="/students" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
