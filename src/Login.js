// In Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    // Pass both username and password to the parent component
    onLogin(username, password);
  };

  return (
    <Card className="login-card text-center">
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input className="form-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input className="form-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className="button SIbutton" type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      {/* Link to navigate to the Register component */}
      <p>
        Don't have an account? <Link to="/register">Register</Link>.
      </p>
    </div>
    </Card>
  );
};

export default Login;
