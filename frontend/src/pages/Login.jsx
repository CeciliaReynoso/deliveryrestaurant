import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, setUser } = useContext(UserContext); // Acceder a `user`
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Redirigir al usuario si ya está logueado (token === true)
  useEffect(() => {
    if (user?.token) {
      alert('You are already logged in.');
      navigate('/'); // Redirigir al home si ya está logueado
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
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

    // Autenticación simulada
    const userAuth = {
      username: email,
      password: "******", // Enmascara la contraseña
      token: true
    };

    // Guarda el usuario en localStorage
    localStorage.setItem('user', JSON.stringify(userAuth));

    // Establece el usuario en el estado del contexto
    setUser(userAuth);
    setMessage('🍕 Successful login !!!');
    navigate("/profile"); // Redirige después del login
    console.log('User after login:', userAuth);
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
