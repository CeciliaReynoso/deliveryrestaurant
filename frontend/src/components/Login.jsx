import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

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

    // Si todas las validaciones pasan
    setMessage('🍕 Successful login !!!');
    setEmail(''); // Limpia el campo de email
    setPassword(''); // Limpia el campo de contraseña
  };

  return (
    <>
    <h1 style={{paddingTop:'100px',paddingBottom:0, marginBottom:0, color: '#000',textAlign:'center'}} >Login</h1>  
    <div className="login-container">
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {message ? <p className="mt-3">{message}</p> : null} 
      </form>
    </div>
   </> 
  );
};

export default Login;
