import { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register2, token } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  // Redirigir al usuario si ya está logueado
  useEffect(() => {
    if (token) {
      alert('You are already registered and logged in.');
      navigate('/');
    }
  }, [token, navigate]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordValidationError = validatePassword(password);
    setPasswordError(passwordValidationError);

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }

    if (!passwordValidationError && password === confirmPassword) {
      register2(email, password); // Realiza el registro
    }
  };

  return (
    <>
      <h1 style={{ paddingTop: '120px', color: '#000', textAlign: 'center' }}>Register</h1>
      <Form onSubmit={handleSubmit} className="register-container">
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter at least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete='off'
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete='off'
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-primary">
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
