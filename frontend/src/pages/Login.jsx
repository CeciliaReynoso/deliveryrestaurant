import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, login } = useContext(UserContext); // Acceder a `user` y `login`
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Redirigir al usuario si ya está logueado
  useEffect(() => {
    if (user) {
      alert('You are already logged in.');
      navigate('/'); // Redirigir al home si ya está logueado
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Llama a la función login del contexto
    const response = await login(email, password);
    
    if (response) {
      setMessage('🍕 Successful login !!!');
      navigate("/profile"); // Redirige después del login
    } else {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <h1 style={{ color: '#000', textAlign: 'center' }}>Login</h1>
      <div className="login-container p-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email address."
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary">
              Login
            </button>

            {/* Mostrar mensaje si existe */}
            {message && <p className="mt-3">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
