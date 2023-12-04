// In App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./Header.js";
import Footer from "./Footer.js";
import FeedbackForm from "./FeedbackForm.js";
import Register from "./Register.js";
import Login from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (enteredUsername, enteredPassword) => {
    // Retrieve the users array from local storage
    const storedUsers = localStorage.getItem('users');

    // Parse the storedUsers string to convert it back to an array
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check for authentication using the entered username and password
    const authenticatedUser = users.some((user) => user.username === enteredUsername && user.password === enteredPassword);
    
    console.log("authenticatedUser = " + authenticatedUser)
    console.log("enteredUsername = " + enteredUsername)
    console.log("enteredPassword = " + enteredPassword)
    console.log("users array = " + users)


    if (authenticatedUser) {
      setIsAuthenticated(true);
      setLoggedInUser(enteredUsername);
      //insert navigation to feedback form
      navigate('/feedback');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser('');
    navigate('/');  
  };


  const [currentForm, setcurrentForm] = useState("login")
  return (
    <div>
      <Header onLogout={handleLogout}/>

      {/* Define routes */}
      <Routes>
  <Route path="/" element={<Login onLogin={handleLogin} />} />
  <Route path="/register" element={<Register onAuthentication={setUsers} />} />
  <Route path="/feedback" element={<FeedbackForm username={loggedInUser} onLogout={handleLogout} />} />
</Routes>

    <Footer />
    </div>
  );
}

export default App;
