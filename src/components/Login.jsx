import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('regular');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <div className="message">You are already logged in.</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      login(username, password, selectedRole);
      const destination = location.state?.from?.pathname || '/saved';
      navigate(destination, { replace: true });
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to NewsReader</h2>
        <p className="login-subtitle">Access your personalized news experience</p>
        {error && <div className="error-message" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" autoComplete="username"
              value={username} onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete="current-password"
              value={password} onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Demo account role</label>
            <select id="role" value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}>
              <option value="regular">Regular User</option>
              <option value="admin">Admin User</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary login-button">Login</button>
        </form>
        <div className="demo-accounts">
          <p className="demo-title">Demo authentication</p>
          <p>For this assignment prototype, any non-empty username and password work.</p>
          <p>Choose Regular or Admin to test the two roles. This is not production authentication.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
