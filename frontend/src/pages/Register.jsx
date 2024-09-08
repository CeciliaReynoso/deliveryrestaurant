import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordValidationError = validatePassword(password);

    if (!email || !password || !confirmPassword) {
      setMessage('All fields are required.');
    } else if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    } else if (password !== confirmPassword) {
      setMessage('🤔The passwords do not match.');
    } else {
      setMessage('🍕Successful registration, order your delicious pizza!');
      setPasswordError(''); // Limpia el mensaje de error del campo de contraseña
      setConfirmPasswordError(''); // Limpia el mensaje de error del campo de confirmar contraseña
    }
  };

  return (
    <>
    <h1 style={{paddingTop:'120px', color: '#000',textAlign:'center'}} >Register</h1>
    <Form onSubmit={handleSubmit} className="register-container">
      <Form.Group className="form-group">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter at less 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6} // Valida la longitud mínima
        />
        {passwordError && <p className="error-message">{passwordError}</p>} 
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            // Validar si la contraseña es correcta mientras se escribe en confirmar contraseña
            const passwordValidationError = validatePassword(password);
            setConfirmPasswordError(passwordValidationError);
          }}
          required
        />
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" className="btn-primary">
        Register
      </Button>
      {/* {message && <p className="mt-3">{message}</p>} Mensaje de éxito con condicional simple&& */}
      {message ? <p className="mt-3">{message}</p> : null} {/*{mensaje de éxito usando el operador ternario} */}
    </Form>
    </>
  );
};

export default Register;
