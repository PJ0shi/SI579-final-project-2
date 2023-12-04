// In Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    // Pass both username and password to the parent component
    onLogin(username, password);
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      {/* Link to navigate to the Register component */}
      <p>
        Don't have an account? <Link to="/register">Create one here</Link>.
      </p>
    </div>
  );
};

export default Login;
