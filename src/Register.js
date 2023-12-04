// In Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]); // Initialize the users array in Register.js
  const navigate = useNavigate(); // Hook for navigation


  const handleRegister = () => {
    // Validate input
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    // Check if the username already exists
    if (users.some((user) => user.username === username)) {
      alert('Username already exists. Please choose a different one.');
      return;
    }

    // Create a new user object
    const newUser = {
      username: username,
      password: password,
    };

    // Update the users array and pass it to the parent component
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    onAuthentication(updatedUsers);
     // Store the updated users array in local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log("users:"+ users)
    console.log("newUser:"+ newUser)

    // Navigate to FeedbackForm after successful registration
    navigate('/');

    // Reset the form
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
